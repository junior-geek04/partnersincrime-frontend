import React,{useContext} from "react";
import { Link } from "react-router-dom";
import styles from "./LoginBox.module.css";
import AuthContext from "../../context/AuthContext";
const LoginBox = () => {
  let {loginUser,loginError} = useContext(AuthContext)
  return (
    <div className={styles.loginBox}>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <p>Username</p>
        <input
          type="text"
          id="userId"
          name="username"
          placeholder="Enter Username"
        />
        <p>Password</p>
        <input
          type="password"
          id="pwdId"
          name="password"
          placeholder="Enter Password"
        />
        <input type="submit" value="Login" />
      </form>
      <div className = {styles.msg}>{loginError}</div>
      <Link to="/signup">Create an Account</Link>
    </div>
  );
};

export default LoginBox;
