import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Announcement from '../components/Annoucement';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import './ProductList.css';


function ProductList() {
  const location = useLocation();
  const category = location.pathname.split('/')[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("");

  const handleFilters = (e) => {
      const value = e.target.value;
      setFilters({
          ...filters, [e.target.name] : value
      })
  }
//[e.target.name] syntax is to dynamically update object property (when the name of the property is unknown upfront but runtime).
//This way you could have multiple React inputs having a different name property and using the same onChange handler to update part of the state.

  return (
    <div>
        <Announcement />
        <Navbar />
        <h1 className='filter__category'>{category}</h1>
        <div className='filter__container'>
            <div className='filter__wrapper'>
                <span className='filter__label'>Filter Products:</span>
                <select name="color" defaultValue="DEFAULT" onChange={handleFilters} className='select'>
                    <option value="DEFAULT" disabled>Color</option>
                    <option value="black">Black</option>
                    <option value="white">White</option>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="yellow">Yellow</option>
                </select>             
                <select name="size" defaultValue="DEFAULT" onChange={handleFilters} className='select'>
                    <option value="DEFAULT" disabled>Size</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                </select>
            </div>
            <div className='filter'>
                <span className='filter__label'>Sort Products:</span>
                <select defaultValue="DEFAULT" onChange={(e) => setSort(e.target.value)} className='select'>
                    <option value="DEFAULT" disabled>Default</option>
                    <option value="Price(Low to High)">Price (Low to High)</option>
                    <option value="Price(High to Low)">Price (High to Low)</option>
                </select>
            </div>
        </div>
        <Products category={category} filters={filters} sort={sort}/>     
        <Newsletter />
        <Footer />
    </div>
  )
}

export default ProductList