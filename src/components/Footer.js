import React from 'react';
import './Footer.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PinterestIcon from '@mui/icons-material/Pinterest';
import PinDropIcon from '@mui/icons-material/PinDrop';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from 'react-router-dom';


function Footer() {
  const categoryWomen = "Women";
  const categoryMen = "Men";

  return (
    <div className='footer__container'>
        <div className='footer__left'>
            <div className='footer__title'>L & M</div>
            <div className='footer__description'>
                <p>The content of this site is copyright-protected and is the property of L & M. 
                 If you are using a screen reader, magnifier, or other assistive technologies and are experiencing difficulties using this website, 
                 please call our TOLL-FREE support line (123-456-7890) for assistance. 
                 L & M's business concept is to offer fashion and quality at the best price.
                 L & M has since it was founded in 1947 grown into one of the world's leading fashion companies.
                 </p>
            </div>
            <div className='social__media__icons'>
                <FacebookIcon className='facebook__icons'/>
                <InstagramIcon className='instagram__icons'/>
                <TwitterIcon className='twitter__icons'/>
                <PinterestIcon className='pinterest__icons'/>
            </div>
        </div>
        <div className='footer__center'>
            <div className='footer__title'>Useful Links</div>
            <ul className='footer__list'>
                <Link to="/" className='footer__list__items'><li>Home</li></Link>
                <Link to={`/products/${categoryWomen}`} className='footer__list__items'><li>Shop Women's</li></Link>
                <Link to={`/products/${categoryMen}`} className='footer__list__items'><li>Shop Men's</li></Link>
                <Link to="/cart" className='footer__list__items'><li>Shopping Cart</li></Link>
                <Link to="/login" className='footer__list__items'><li>Login</li></Link>
                <Link to="/register" className='footer__list__items'><li>Register</li></Link> 
            </ul>
        </div>
        <div className='footer__right'>
            <div className='footer__title'>Contact</div>
            <div className='footer__contact__items'>
                <div>
                    <PinDropIcon />  
                    <p>1655 Street Name, San Diego US</p>
                </div>  
                <div>
                    <LocalPhoneIcon />  
                    <p>+1 619-456-7891</p>
                </div>
                <div>
                    <EmailIcon />  
                    <p>contact_LLMM@gmail.com</p>
                </div>
            </div>
            
        </div>
    </div>
  )}

export default Footer
