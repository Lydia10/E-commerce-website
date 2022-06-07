import React, { useEffect, useState } from 'react';
import './Products.css';
import SingleProduct from './SingleProduct';
import axios from 'axios';


function Products({category, filters, sort}) {
  const [currentProducts, setCurrentProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async() => {
      try{
        const res = await axios.get(
        category ? `http://localhost:3002/api/products?category=${category}` : "http://localhost:3002/api/products");
        setCurrentProducts(res.data);
      }
      catch(err){
      }
    }
    getProducts();
  }, [category]);


  useEffect(() => {
    category && setFilteredProducts(
      currentProducts.filter((item) => Object.entries(filters).every(([key, value]) => 
        item[key].includes(value)
        )
      )
    );
  }, [currentProducts, category, filters]);

  useEffect(() => {
    if(sort === "Price(Low to High)"){
      setFilteredProducts((prev) => 
        [...prev].sort((a, b) => a.price - b.price)
      );
    }
    else if(sort === "Price(High to Low)"){
      setFilteredProducts((prev) => 
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort])

  return (
    <div className='products'>
        {category? filteredProducts.map(item => <SingleProduct item={item} key={item._id}/>)
        : currentProducts.slice(0, 10).map(item => <SingleProduct item={item} key={item._id}/>)
        }
    </div>
  )
}

export default Products