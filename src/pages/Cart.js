import React, { useEffect, useState } from 'react';
import './Cart.css';
import Navbar from '../components/Navbar';
import Announcement from '../components/Annoucement';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useSelector, useDispatch } from 'react-redux';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';
import { removeFromCart, decreaseFromCart, increaseFromCart, resetCartState } from '../redux/cartRedux';
import StripeCheckout from 'react-stripe-checkout';
import { publicRequest } from '../requestMethods';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const orderTotal = cart.total >= 50? (cart.total * 1.0775).toFixed(2) : cart.total > 0 ? (cart.total * 1.0775 + 7.99).toFixed(2) : 0;

  const [stripeToken, setStripeToken] = useState(null);
  const onToken = (token) => {
    setStripeToken(token);
  }; 


  useEffect(() => {
    const makeRequest = async () => {
        try{
            const res = await publicRequest.post("/checkout/payment",{
                tokenId: stripeToken.id,
                amount: orderTotal * 100,
            });
            navigate("/success", { data: res.data });
            dispatch(resetCartState());
        }catch{}
    };
    stripeToken && cart.total > 0 && makeRequest();
  }, [stripeToken, cart.total, navigate]);

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));  
    }

    const handleDecreaseFromCart = (product) => {
        dispatch(decreaseFromCart(product));
    }

    const handleIncreaseFromCart = (product) =>{
        dispatch(increaseFromCart(product));
    }

  return (
    <div>
        <Announcement />
        <Navbar />
        <div className='cart__container'>
            <h1 className='cart__title'>Your Shopping Cart ({cart.quantity} items)</h1>
            <div className='cart__wrapper'>
                <div className='cart__info'>
                    {cart.products.map((product) => (
                    <div className='cart__product' key={product._id}>
                        <div className='cart__product__details'>
                            <Link to={`/product/${product._id}`}>
                                <img src={product.image} alt='' className='cart__product__image'/>
                            </Link>
                            <div className='info__details'>
                                <span><strong>Product: </strong>{product.title}</span>
                                <span className='info__id'><strong>ID: </strong>{product._id}</span>
                                <span><strong>Price: </strong>{product.price}</span>
                                <span><strong>Color: </strong>{product.color}</span>
                                <span><strong>Size: </strong>{product.size}</span>
                            </div>
                        </div>
                        <div className='change__quantity__container'>
                            <div className='change__quantity'>
                                <RemoveIcon onClick={() => handleDecreaseFromCart(product)}/>
                                <span className='product__quantity'>{product.quantity}</span>
                                <AddIcon onClick={() => handleIncreaseFromCart(product)}/>
                            </div>
                            <span>$ {(product.price * product.quantity).toFixed(2)}</span>
                            <button className='remove__product__button' onClick={() => handleRemoveFromCart(product)}>Remove</button>
                        </div>
                    </div>  
                    ))}  
                </div>
                
                <div className='cart__summary'>
                    <h2>Order Summary</h2>
                    <div className='summary__item'>
                        <span>Subtotal:</span>
                        <span><CurrencyFormat displayType={'text'} value={cart.total} decimalScale={2} thousandSeparator={true} prefix={'$'}/></span>
                    </div>
                    {cart.quantity == 0 ? <div></div> : <div className='summary__item'><span>Estimated Shipping:</span><span>$7.99</span></div> }
                    
                    {cart.total >= 50 ? <div className='summary__item'><span>Shipping discount:</span><span>$-7.99</span></div> : <div></div>}
                    
                    {cart.quantity == 0 ? <div></div> : <div className='summary__item'><span>Estimated tax (7.75%):</span>
                       <span><CurrencyFormat displayType={'text'} value={cart.total * 0.0775} decimalScale = {2} thousandSeparator={true} prefix={'$'}/></span></div>}
                    <div className='summary__item'>
                        <h3>Total:</h3>
                        <h4><CurrencyFormat displayType={'text'} value={orderTotal} decimalScale = {2} thousandSeparator={true} prefix={'$'}/></h4>
                    </div>
                    <StripeCheckout 
                        name="L & M Shop"
                        billingAddress
                        shippingAddress
                        description={`Your total is $${orderTotal}`}
                        amount={cart.total*100}
                        token={onToken}
                        stripeKey={ process.env.REACT_APP_STRIPE_PUBLIC_KEY } >
                        <button disabled={cart.total == 0} className='checkout__button'>Proceed to checkout</button> 
                    </StripeCheckout>
                </div>
            </div>
        </div>
        <Newsletter />
        <Footer />
    </div>
  )
}

export default Cart