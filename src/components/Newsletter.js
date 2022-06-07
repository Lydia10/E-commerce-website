import React, { useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import './Newsletter.css';
import { useNavigate } from 'react-router-dom';

function Newsletter() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleClick = (email) => {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.match(mailformat)){
      navigate("/subscribe");
    }
    else{
      alert("You have entered an invalid email address!");
    }
  }
  
  return (
    <div className='newsletter__container'>
        <h1 className='newsletter__title'>Newsletter</h1>
        <p className='newsletter__description'>Member perk: Get 15% off when you subscribe to Fashion News!</p>
        <p className='newsletter__details'>Use the email to your loyalty account to get rewards and deals delivered to your inbox.</p>
        <form className='newsletter__input__container'>
            <label className="enter__email__label">Enter your email:</label>
            <input className="enter__email__input" type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} />
            <button className='enter__email__button' onClick={() => handleClick(email)}><SendIcon /></button>
        </form>
    </div>
  )
}

export default Newsletter