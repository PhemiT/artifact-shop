 import React from 'react';
import '../assets/styles/componentStyles/nav.scss';
import { Link } from 'react-router-dom';
import {ShoppingBag } from '@phosphor-icons/react';

const Nav:React.FC = () => {
  return (
    <div className='nav_main'>
        {/* <Link to='/'>Home</Link> */}
        <Link to='/products'>Shop</Link>
        <Link to='/register'>Signup</Link>
        <Link to='/login'>Login</Link>
        <Link to='/cart'><ShoppingBag size={27} /></Link>
    </div>
  )
}

export default Nav