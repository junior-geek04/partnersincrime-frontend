import React,{ useContext } from 'react'
import styles from "./Home.module.css";
import AuthContext from '../../context/AuthContext';
import Navbar from '../../components/Navbar/Navbar';

const Home = () => {
    let {user,logout} = useContext(AuthContext)
    return (
        <div className = {styles.wrapper}>
            <Navbar logout={logout}/>
        </div>
    )
}

export default Home
