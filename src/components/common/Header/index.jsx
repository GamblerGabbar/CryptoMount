import React from 'react'
import "./style.css";
import AnchorTemporaryDrawer from './drawer';
import Button from '../Button';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className='navbar'>
      <h2>
        CryptoMount<span style={{ color: "var(--blue)" }}></span>
      </h2>
      <div className='links'>
        <Link to='/'>
          <p className='link'>Home</p>
        </Link>
        <Link to='/watchlist'>
          <p className='link'>Watchlist</p>
        </Link>
        <Link to='/dashboard'>
          <Button 
          text={"Dashboard"} 
          onClick={() => console.log('button')} />
        </Link>
        
      </div>
      <div className='mobile-drawer'>
        <AnchorTemporaryDrawer />
      </div>

    </div>
  )
}

export default Header

