import React from 'react';
import '../assets/styles/componentStyles/navbar.scss';
import {MapTrifold, Vault} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';


const Navbar:React.FC = () => {
  return (
    <div className='nav_main'>
        <div className="nav">
            <MapTrifold size={50} />
        </div>
        <Link to = '/'>
          <h1>The Artefact Shop</h1>
        </Link>
        <div className="cart">
            <Vault size={50} />
        </div>
    </div>
  )
}

export default Navbar