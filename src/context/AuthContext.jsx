import { createContext, useState } from "react";
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
  const [LoginError, setLoginError] = useState(null);
  const [RegisterError, setRegisterError] = useState(null);
  const history = useHistory();

  let registerUser = async (formData) => {
    let username = formData.get("username");
    let name = formData.get("name");
    let password = formData.get("pass");
    let email = formData.get("emailAddress");
    const array = name.split(" ");
    const first = array[0];
    let last = "";
    for (let index = 1; index < array.length; index++) {
      last += array[index] + " ";
    }
    
    let response = await fetch("/authapi/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        first_name:first,
        last_name:last,
        email:email,
      }),
    });
    let data = await response.json();
    if (response.status === 201){
      setRegisterError(null)
      let response = await fetch("/authapi/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      let data = await response.json();
      setAuth(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    }
    else if(response.status === 400){
      if(data["username"] ){
          setRegisterError(data["username"][0])
      }
      else if(data["email"]){
        console.log(data["email"][0])
        setRegisterError("Email Already Taken")
      }
    }
   
    else{
      setRegisterError("Something Went Wrong! Please Try Again Later")
    }
  };
  let loginUser = async (e) => {
    e.preventDefault();
    let response = await fetch("/authapi/token/", {
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
      setLoginError(null);
      setAuth(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      history.push("/home");
    } else if (response.status === 401) {
      setLoginError("Invalid Credentials");
    } else {
      setLoginError("Something went Wrong");
    }
  };
  let logout = (e) => {
    setAuth(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    history.push("/");
  };
  // let updateToken = async () => {
  //   if (Auth) {
  //     let response = await fetch("/authapi/token/refresh/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         refresh: Auth?.refresh,
  //       }),
  //     });
  //     let data = await response.json();

  //     if (response.status === 200) {
  //       setAuth(data);
  //       setUser(jwt_decode(data.access));
  //       localStorage.setItem("authTokens", JSON.stringify(data));
  //       history.push("/home");
  //     } else {
  //       logout();
  //     }
  //   }
  //   if (Loading) {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (Loading) {
  //     updateToken();
  //   }

  //   let fourMinutes = 1000 * 60 * 4;

  //   let interval = setInterval(() => {
  //     if (Auth) {
  //       updateToken();
  //     }
  //   }, fourMinutes);
  //   return () => clearInterval(interval);
  // });
  let contextData = {
    user: User,
    auth:Auth,
    loginUser: loginUser,
    logout: logout,
    register: registerUser,
    loginError: LoginError,
    registerError: RegisterError
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};
