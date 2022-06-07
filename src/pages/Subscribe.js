import React from 'react';
import { Link } from 'react-router-dom';
import "./Subscribe.css";

function Subscribe() {
    return (
        <div className='subscribe__container'>
          <h1>Thanks for Subscribing to Our Fashion News! 😊</h1>
          <h3>A 15% off coupon off your next order will be sent to your email address within 48 hours! Stay tuned!</h3>
          <Link to='/'>
            <button className='subscribe__button'>Continue Shopping</button>
          </Link>
        </div>
      )
}

export default Subscribe