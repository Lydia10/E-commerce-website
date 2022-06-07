import React from 'react';
import './CategoryItem.css';
import { Link } from "react-router-dom";

function CategoryItem({item}) {
  return (
    <Link to={`/products/${item.category}`}> 
      <div className='category__items'>
        <img src={item.image} alt=''/>
        <div className='category__item__info'>
            <h1 className='category__item__title'>{item.title}</h1>
            <button className='category__item__button'>SHOP NOW</button>
          </div>
      </div>
    </Link> 
  )
}

export default CategoryItem