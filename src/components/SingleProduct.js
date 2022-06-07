import React from 'react';
import { Link } from 'react-router-dom';
import './SingleProduct.css';

function SingleProduct({item}) {
  return (
    <div className='single__product__container'>
        <Link to={`/product/${item._id}`}>
          <img src={item.image} className="single__product__image" alt=''/>
        </Link>
    </div>
  )
}

export default SingleProduct