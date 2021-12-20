import React from 'react'
import styles from './Login.module.css'
import Header from '../../components/Login/Header'
import LoginBox from '../../components/Login/LoginBox'
const Login = () => {
    return (
        <div className='container'>
            <div className={styles.landing_wrapper}>
                <Header />
                <LoginBox />
            </div>
            
        </div>

    )
}

export default Login
