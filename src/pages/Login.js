import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Login.css';
import { login } from "../redux/userRedux";
import { publicRequest } from '../requestMethods';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try{
      const res = await publicRequest.post('/auth/login', {username, password});
      navigate("/");
      dispatch(login({username, password}));
    }catch(error){
      setError(error.response.data.message);
    }
  }

  return (
    <div className='sign__in__container'>
      <div className='sign__in__wrapper'>
          <h1 className='sign__in__title'>SIGN IN</h1>
          <form className='sign__in__form'>
              <input placeholder='username' onChange={(e) => setUsername(e.target.value)}/>
              <input type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)}/>
              <button className='sign__in__button' onClick={handleClick}>Sign In</button>
          </form>
          <p className='error'>{error}</p>
          <div className='sign__in__links'>
              <Link to="/register">
                <p className='register__link'>Create a new account?</p>
              </Link> 
          </div>
      </div>
    </div>
  )
}

export default Login