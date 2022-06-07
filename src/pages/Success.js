import React from 'react';
import './Success.css';
import { Link } from 'react-router-dom';

function Success() { 
  return (
    <div className='success__container'>
      <h1>Thanks for Shopping With Us! 😊</h1>
      <h3>We will work on your order right away and send you an email once your order has been shipped!</h3>
      <Link to='/'>
        <button className='success__button'>Continue Shopping</button>
      </Link>
    </div>
  )
}

export default Success