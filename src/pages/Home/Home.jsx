import React,{ useContext } from 'react'
import styles from "./Home.module.css";
import AuthContext from '../../context/AuthContext';
const Home = () => {
    let {user,logout} = useContext(AuthContext)
    return (
        <div className = {styles.wrapper}>
            <h1>Welcome {user.username}</h1>
            <p onClick={logout}>Logout</p>
        </div>
    )
}

export default Home