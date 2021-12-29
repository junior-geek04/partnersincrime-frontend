import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [Auth, setAuth] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [User, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
    const [Loading, setLoading] = useState(true)

  const history = useHistory();

  let loginUser = async (e) => {
    e.preventDefault();
    let response = await fetch("http://127.0.0.1:8000/authapi/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();

    if (response.status === 200) {
      setAuth(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      history.push("/home");
    } else if (response.status === 401) {
      alert("Invalid Credentials");
    } else {
      alert("Something went Wrong");
    }
  };
  let logout = (e) => {
    setAuth(null);
    setUser(null);
    localStorage.removeItem('authTokens')
    history.push('/')
  };
  let updateToken = async () => {
    let response = await fetch("http://127.0.0.1:8000/authapi/token/refresh/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
         'refresh':Auth?.refresh
        }),
      });
      let data = await response.json();

      if (response.status === 200){
        setAuth(data);
        setUser(jwt_decode(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
        history.push("/home");
      }
      else{
          logout()
      }
      if(Loading){
        setLoading(false)
    }
  
  }

  useEffect(() => {
    
    if(Loading){
        updateToken()
    }

    let fourMinutes = 1000 * 60 * 4

    let interval =  setInterval(()=> {
        if(Auth){
            updateToken()
        }
    }, fourMinutes)
      return () => clearInterval(interval)
  })

  let contextData = {
    user: User,
    loginUser: loginUser,
    logout: logout,
  };
  return (
    <AuthContext.Provider value={contextData}>{Loading ? null :children}</AuthContext.Provider>
  );
};
