import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Announcement from '../components/Annoucement';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './Product.css';
import { publicRequest } from '../requestMethods';
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/cartRedux';
   

function Product() {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async ()=> {
        try{
            const res = await publicRequest.get('/products/find/' + id);
            setProduct(res.data);
            setColor(res.data.color[0]); 
            setSize(res.data.size[0]);   
        }catch{}
    }
    getProduct();
  }, [id]);

  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity, color, size }));
    let x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

  return (
    <div>
       <Announcement /> 
       <Navbar />
       <div className='product__details'>
            <img className='product__image' src={product.image} alt=""/>
            <div className='product__info'>
                <h1 className='product__title'>{product.title}</h1>
                <p className='product__description'>{product.description}</p>
                <p className='product__price'>$ {product.price}</p>
                <div className='filter__product__container'>
                    <div className='filter__options'>
                        <span className='filter__title'>Color:</span>
                        <select className='options' onChange={(e) => setColor(e.target.value)} >
                         {(product.color || []).map((c) => <option key={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className='filter__options'>
                        <span className='filter__title'>Size:</span>
                        <select className='options' onChange={(e)=> setSize(e.target.value)}>
                            {(product.size || []).map((s) => <option key={s}>{s}</option>)}
                        </select>
                    </div>
                </div>
                <div className='quantity__container'>
                    <div className='amount__container'>
                        <RemoveIcon onClick={()=> quantity > 1 ? setQuantity(quantity - 1) : quantity}/>
                        <span className='quantity'>{quantity}</span>
                        <AddIcon onClick={()=>setQuantity(quantity + 1)}/>
                    </div>
                    <button onClick={handleClick} className='add'>ADD TO CART</button>
                </div>    
            </div>
            <div id="snackbar">Item Added to Cart</div>
       </div>
       <Newsletter />
       <Footer />
    </div>
  )
}


export default Product