import React, { useState } from 'react';
import './Register.css';
import { publicRequest } from '../requestMethods';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await publicRequest.post('/auth/register', {username, password, email});
      navigate("/login");
    }catch(error){
      setError(error.response.data.message);
    }
  }

  return (
    <div className='register__container'>
       <div className='register__wrapper'>
           <h1 className='register__title'>CREATE AN ACCOUNT</h1>
           <form className='register__form'>
               <input placeholder='username' onChange={(e) => setUsername(e.target.value)}/>
               <input placeholder='password' type='password' onChange={(e) => setPassword(e.target.value)}/>
               <input placeholder='email'  onChange={(e) => setEmail(e.target.value)}/>
               <h6 className='register__agreement'>By creating an account, you agree to <strong>L & M's Conditions of Use </strong>and <strong>Privacy Notice</strong>.</h6>
               <button className='register__button' onClick={handleSubmit}>CREATE</button>
               <p>{error}</p>
           </form>
       </div>
    </div>
  )
}

export default Register