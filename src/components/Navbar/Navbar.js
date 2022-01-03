import React from 'react'
import { Link } from 'react-router-dom'
import styles from './navbas.css'

function Navbar(props) {
    return (
        <div id="container">

            <div id="container-1">
            &lt;partnersInCrime&gt;
           </div>

            <div id="container-2">

                <div id="welcome">
                    <p>cout&lt; &lt;" Hello {props.username}";</p>
                </div>

                <div id="left-controls">
                   <Link to="/home">Home</Link>
                   <Link to="/profile">Profile</Link>
                   <Link onClick={props.logout}>Logout</Link>
                </div>

            </div>
            
        </div>
    )
}

export default Navbar
