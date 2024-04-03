 import React, { useState } from 'react';
import '../assets/styles/componentStyles/nav.scss';
import { Link } from 'react-router-dom';
import {ShoppingBag } from '@phosphor-icons/react';
import Profile from './Profile';
import { useNavigate } from 'react-router-dom'

const Nav:React.FC = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    navigate('/login');
  }

  return (
    <div className='nav_main'>
        <Link to='/'>Home</Link>
        <Link to='/products'>Shop</Link>
        {
          !user ?
          <>
            <Link to='/register'>Signup</Link>
          </>
          :
          <>
          <Profile />
          <button onClick={logout}>Logout</button>
          </>
        }
        <Link to='/cart'><ShoppingBag size={27} /></Link>
    </div>
  )
}

export default Nav