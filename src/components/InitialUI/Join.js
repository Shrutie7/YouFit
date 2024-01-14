import React, { useRef } from 'react'
import jo from "./Join.module.css"
import emailjs from "@emailjs/browser"
const Join = () => {
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_eh5q0tp', 'template_ivvpmvv', form.current, 'huDWz2Q21NhjYi_R_')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
      };
  return (
    <div className={jo.Join} id="join-us">
    <div className={jo.leftj}>
    <hr/>

    <div>
        <span className='stroke-text'>READY TO</span>
        <span>LEVEL UP</span>
    </div>
    <div>
        <span>YOUR BODY</span>
        <span className='stroke-text'>WITH US?</span>
    </div>

    </div>
<div className={jo.rightj}>
<form ref={form} className={jo.emailcontainer} onSubmit={sendEmail}>
<input type='email' name='user_email' placeholder='Enter your email address'/>
<button className={`${"btn"} ${jo.btnj}`}>Join Now</button>
</form>
</div>


    </div>
  )
}

export default Join