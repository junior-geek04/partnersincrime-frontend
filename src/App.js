import "./App.css";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";

import PrivateRoute from "./utils/PrivateRoute";
import { BrowserRouter as Router, Route} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <PrivateRoute component={Home} path="/home" />
          <Route component={Login} path="/" exact />
          <Route component={Signup} path="/signup" />
          
        </AuthProvider>
        
      </Router>
    </div>
  );
}

export default App;
