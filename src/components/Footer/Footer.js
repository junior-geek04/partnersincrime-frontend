import React from "react";
import "./Footer.css";
import SocialFollow from "./Social";

function Footer() {
  return (
    //     <div className="footer">
    //     <p>This is some content in sticky footer</p>
    //   </div>
    <div className="container">
      	<div className="sec1"> 
    	  	<div className="log">&lt;partnersInCrime&gt;</div>
    	  	<SocialFollow/>
      	</div>   
      	<div className="sec2">
    		<p className="made">Made with ❤️ by </p>
  	  	</div>
    </div> 
  );
}

export default Footer;
