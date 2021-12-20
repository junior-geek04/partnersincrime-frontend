import styles from "./signup.module.css";
import Pages from "./Pages";

const Signup = () => {
    return (
        <>
            <div className = {styles.log}>&lt;partnersInCrime&gt;</div>
            <div className = {styles.container}>
                <div className = {styles.heading}>
                    _SignUp_
                </div>
                <div className = {styles.userInfo}>
                    <Pages />
                </div>
            </div>
        </>
        
    )
}

export default Signup