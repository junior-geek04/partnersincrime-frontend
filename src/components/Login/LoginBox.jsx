import React from "react";
import { Link } from "react-router-dom";
import styles from "./LoginBox.module.css";
const LoginBox = () => {
  return (
    <div className={styles.loginBox}>
      <h1>Login</h1>
      <form>
        <p>Username</p>
        <input
          type="text"
          id="userId"
          name="user"
          placeholder="Enter Username"
        />
        <p>Password</p>
        <input
          type="password"
          id="pwdId"
          name="pwd"
          placeholder="Enter Password"
        />
        <input type="submit" value="Login" name="submit" />
      </form>
      <Link to="/signup">Create an Account</Link>
    </div>
  );
};

export default LoginBox;
