import styles from "./signup.module.css";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Pages = () => {

    const [page, setPage] = useState(1);
    const [inputs, setInputs] = useState({});
    const [visible, setVisible] = useState(false);

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;

      setInputs(values => ({...values, [name]: value}))
    }

    const handlePageChange = (val) => {
        setPage(val);
    }

    const validityCheck = () => {
        var formData = new FormData(document.querySelector('#signForm'));

        for (const value of formData.values()) {
            if(value === ""){
                return false;
            }
        }

        return true;
    }   

    const passReveal = () => {
        setVisible(!visible);
        var el = document.getElementById("pass");

        visible ? el.type = "password" : el.type = "text";
    }

    const itemHandle = (index) => {
        var item = Array.from(document.getElementsByTagName("li"));

        if(!inputs.skills || inputs.skills.search(item[index].innerHTML) === -1){
            setInputs(values => ({...values, "skills": (inputs.skills || "") + (inputs.skills ? ", " : "") + item[index].innerHTML}));
        }
        
    }



    return (
        <>
            <form className = {styles.signForm} id = "signForm" onSubmit={(e) => e.preventDefault}>
                {page === 1 ?
                <>
                    <label htmlFor = "username">Enter your name</label>
                    <input type="text" placeholder = "We'll call you by this" name = "username" id = "username" required = {true} value = {inputs.username || ""} onChange = {handleChange}/>

                    <label htmlFor = "batch">Your Batch</label>
                    <input type="number" placeholder = "For your batchmates" name = "batch" id = "batch" required = {true} value = {inputs.batch || ""} onChange = {handleChange}/>
                    
                    <label htmlFor = "pass">Password</label>
                    <div className = {styles.pass}>
                        <input type="password" placeholder = "To secure your account" name = "pass" id = "pass" required = {true}/>
                        <i onClick = {passReveal}>{visible ? <AiOutlineEye color = "rgb(0, 182, 182)" size = "1.5rem"/> : <AiOutlineEyeInvisible color = "rgb(0, 182, 182)" size = "1.5rem"/>}</i>
                    </div>
                    

                    <label htmlFor = "re-pass">Confirm Password</label>
                    <input type="password" placeholder = "Just to make sure we're good to go" name = "re-pass" id = "re-pass" required = {true}/>

                    <label htmlFor = "emailAddress">Email</label>
                    <input type="email" placeholder = "Use your college mail" name = "emailAddress" id = "emailAddress" required = {true} value = {inputs.emailAddress || ""} onChange = {handleChange}/>
                    
                    <div className = {styles.pagination}>  
                        <button className = {styles.btn} onClick = {() => {if(validityCheck()){handlePageChange(2)}}}>Next Page</button><br></br>
                        <span>Already have an account? Login</span>
                    </div>
                </>    
                :
                <>
                    <label htmlFor = "skills">Your Skills</label>
                    <textarea type="text" placeholder = "Comma separated" name = "skills" id = "skills" required = {true} value = {inputs.skills || ""} onChange = {handleChange}/>
   
                    <div className = {styles.pagination}>  
                        <button type = "submit" className = {styles.btn} onClick = {() => {console.log(inputs)}}>Get Started</button><br></br>

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
                        <div><span onClick = {() => handlePageChange(1)}>Go Back</span>&emsp;&emsp;&emsp;<span>Go Home</span></div>
                    </div>
                </>
                }    
            </form>
        </>
        
    )
}

export default Pages