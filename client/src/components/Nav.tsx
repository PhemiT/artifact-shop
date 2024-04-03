 import React, { useState } from 'react';
import '../assets/styles/componentStyles/nav.scss';
import { Link } from 'react-router-dom';
import {ShoppingBag } from '@phosphor-icons/react';
import Profile from './Profile';

const Nav:React.FC = () => {
  const [user,setUser] = useState(null);

  return (
    <div className='nav_main'>
        <Link to='/'>Home</Link>
        <Link to='/products'>Shop</Link>
        {
          !user ?
          <>
            <Link to='/register'>Signup</Link>
            <Link to='/login'>Login</Link>
          </>
          :
          <Profile />
        }
        <Link to='/cart'><ShoppingBag size={27} /></Link>
    </div>
  )
}

export default Nav