import React, { useState } from 'react';
import { Badge } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import './Navbar.css';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../redux/userRedux';

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const quantity = useSelector(state => state.cart.quantity);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
      if(user){
        dispatch(logOut());
      }   
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    navigate(`/search/${searchTerm}`);
    setSearchTerm("");     
  }

  return (
    <div className='navbar__container'>
        <div className='navbar__left'>
            <Link to="/" className='navbar__logo'>
                <span>L & M</span>
            </Link>
            <form onSubmit={handleSubmit}>
                 <div className="navbar__search">
                    <input className="navbar__searchInput" type="text" onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm}/>
                    <SearchIcon className="navbar__searchIcon" onClick = {handleSubmit} />
                </div>
            </form>  
        </div>
        <div className='navbar__right'>
            <Link to="/register" className='navbar__options'>
                <span>REGISTER</span>
            </Link>
            <Link to={!user.name && "/login"} className='navbar__options'>
                <span onClick={handleClick}>{user.name ? "SIGN OUT" : "SIGN IN"}</span>
            </Link>
            <Link to="/cart" className='navbar__options'>
                <span >
                    <Badge badgeContent={quantity} color="primary">
                        <ShoppingCartOutlinedIcon />
                    </Badge> 
                </span>
            </Link>
        </div>
    </div>
  )
}

export default Navbar