import React, { useEffect, useState } from 'react';
import * as Realm from 'realm-web';
import SingleProduct from '../components/SingleProduct';
import './Search.css';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Annoucement from '../components/Annoucement';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

function Search() {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const searchTerm = location.pathname.split('/')[2];

  useEffect(() => {
    async function searchProducts(){
      const app = new Realm.App({ id: process.env.REACT_APP_REALM_APP_ID });
      const credentials = Realm.Credentials.anonymous();
      try {
        const user = await app.logIn(credentials);
        const searchProducts = await user.functions.searchProducts(searchTerm);
        setProducts(searchProducts);
      } catch(err) {
        console.error(err);
      }
    }
    searchProducts();
  }, [searchTerm]);

  return (
    <div>
      <Annoucement />
      <Navbar />
      <h3 className='search__found__title1'>Products Found:</h3>
      <p className='search__found__title2'>{ products.length + " product(s)" }</p>
      <div className='search__found'>
        {products && products.map(product =>
          <SingleProduct item={product} key={product._id} />
        )}
      </div>
      <Newsletter />
      <Footer />
    </div>
  )

}

export default Search