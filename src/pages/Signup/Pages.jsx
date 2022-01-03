import styles from "./signup.module.css";
import { useContext, useState} from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
const Pages = () => {
    const  history = useHistory();
    const [page, setPage] = useState(1);
    const [inputs, setInputs] = useState({});
    const [visible, setVisible] = useState(false);
    const [msg, setMsg] = useState('');

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;

      setInputs(values => ({...values, [name]: value}))
    }

    const handlePageChange = (val) => {
        setPage(val);
    }
    let {register,registerError,user} = useContext(AuthContext)

    const validityCheck = (e) => {
        e.preventDefault();
        var formData = new FormData(document.querySelector('#signForm'));

        for (const value of formData.values()) {
            if(value === ""){
                setMsg("Fields are empty");
                return false;
            }
        }

        /* password check */
        if(formData.get("pass") !== formData.get("re-pass")){
            setMsg("Passwords don't match");
            return false;
        }

        /* email check */
        if(!(/@iiitkottayam.ac.in/.test(formData.get("emailAddress")))){
            setMsg("Invalid Email Id");
            return false;
        }
       
        register(formData);
        if(registerError){
            setMsg(registerError)
            return false;
        }
        setMsg('');
        return true;
    }   

    const passReveal = () => {
        setVisible(!visible);
        var el = document.getElementById("pass");

        visible ? el.type = "password" : el.type = "text";
    }
    const itemHandle = (index) => {
        var item = Array.from(document.getElementsByTagName("li"));

        if(!inputs.skills || inputs.skills.toLowerCase().search((item[index].innerHTML).toLowerCase()) === -1){
            setInputs(values => ({...values, "skills": (inputs.skills || "") + (inputs.skills ? ", " : "") + item[index].innerHTML}));
        }
    }
    const addSkills = async (e) =>{
        e.preventDefault()
        var skillData = document.getElementById("skills").value
        if(user){
            let username = user.username
            let response = await fetch("/main/addSkills/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  username: username,
                  skills:skillData
                }),
              });
              if (response.status === 400){
                alert("Something Went Wrong Please Try Again Later")
              }
              else if (response.status === 201){
                history.push("/home");
              }
        }
    }
    
    return (
        <>
            <form className = {styles.signForm} id = "signForm">
                {page === 1 ?
                <>
                    <label htmlFor = "username">Enter Username</label>
                    <input type="text" placeholder = "Your unique identity" name = "username" id = "username" autoComplete="on" required = {true} value = {inputs.username || ""} onChange = {handleChange}/>
                    <label htmlFor = "name">Enter your name</label>
                    <input type="text" placeholder = "We'll call you by this" name = "name" id = "name" autoComplete="on" required = {true} value = {inputs.name || ""} onChange = {handleChange}/>
                    <label htmlFor = "pass">Password</label>
                    <div className = {styles.pass}>
                        <input type="password" placeholder = "To secure your account" name = "pass" id = "pass" required = {true}/>
                        <i onClick = {passReveal}>{visible ? <AiOutlineEye color = "rgb(0, 182, 182)" size = "1.5rem"/> : <AiOutlineEyeInvisible color = "rgb(0, 182, 182)" size = "1.5rem"/>}</i>
                    </div> 
                    <label htmlFor = "re-pass">Confirm Password</label>
                    <input type="password" placeholder = "Just to make sure we're good to go" name = "re-pass" id = "re-pass" required = {true}/>

                    <label htmlFor = "emailAddress">Email</label>
                    <input type="email" placeholder = "Use your college mail" name = "emailAddress" id = "emailAddress" autoComplete="on" required = {true} value = {inputs.emailAddress || ""} onChange = {handleChange}/>
                    
                    <div className = {styles.pagination}>  
                        <div className = {styles.msg}>{msg}</div>
                        <button className = {styles.btn} onClick = {(e) => {if(validityCheck(e)){handlePageChange(2)}}}>Next Page</button><br></br>
                        <span><Link to ="/">Already have an account? Login</Link></span>
                        {/* add link after setting up router */}
                    </div>
                </>    
                :
                <>
                    <label htmlFor = "skills">Your Skills</label>
                    <textarea type="text" placeholder = "Comma separated" name = "skills" id = "skills" required = {true} value = {inputs.skills || ""} onChange = {handleChange}/>
   
                    <div className = {styles.pagination}>  
                        <div className = {styles.msg}>{msg}</div>
                        <button type = "submit" className = {styles.btn} onClick = {addSkills}>Get Started</button><br></br>
                        {/* log the inputs state variable to see the format in which the data is captured */}
                        <div className = {styles.options}>
                            <ul className = {styles.ListCover}>
                                <li onClick={() => itemHandle(0)}>Frontend Developer</li>
                                <li onClick={() => itemHandle(1)}>Backend Developer</li>
                                <li onClick={() => itemHandle(2)}>Game Developer</li>
                                <li onClick={() => itemHandle(3)}>Data Science</li>
                                <li onClick={() => itemHandle(4)}>Python</li>
                                <li onClick={() => itemHandle(5)}>Django</li>
                                <li onClick={() => itemHandle(6)}>React.js</li>
                                <li onClick={() => itemHandle(7)}>node.js</li>
                                <li onClick={() => itemHandle(8)}>mongoDB</li>
                                <li onClick={() => itemHandle(9)}>SQL</li>
                                <li onClick={() => itemHandle(10)}>Asp.net</li>
                                <li onClick={() => itemHandle(11)}>C</li>
                                <li onClick={() => itemHandle(12)}>Cpp</li>
                                <li onClick={() => itemHandle(13)}>C#</li>
                                <li onClick={() => itemHandle(14)}>Java</li>
                            </ul>
                        </div>
                        <div><span onClick = {() => handlePageChange(1)}>Go Back</span>&emsp;&emsp;&emsp;<span><Link to = "/"> Go Home</Link></span></div>
                        {/* add link after setting up router */}
                    </div>
                </>
                }    
            </form>
        </>
        
    )
}

export default Pages