import React from 'react';
import { categories } from '../data';
import CategoryItem from './CategoryItem';
import './Categories.css';

function Categories() {
  return (
    <div className='category'>
        {categories.map((item) => (
            <CategoryItem item={item} key={item.id}/>
        ))}
    </div>
  )
}

export default Categories