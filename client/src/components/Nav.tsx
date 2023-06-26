 import React from 'react';
import '../assets/styles/componentStyles/nav.scss';
import { Link } from 'react-router-dom';
import { Backpack } from '@phosphor-icons/react';

const Nav:React.FC = () => {
  return (
    <div className='nav_main'>
        <Link to='/'>Home</Link>
        <Link to='/products'>Shop</Link>
        <Link to='/register'>Sign up</Link>
        <Link to='/cart'><Backpack size={27} /></Link>
    </div>
  )
}

export default Nav