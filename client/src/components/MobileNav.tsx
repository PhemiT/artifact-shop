import React from 'react';
import '../assets/styles/componentStyles/mobilenav.scss';
import { EyeClosed } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

interface NavbarProps {
    isOpen: boolean;
    toggleOpen: () => void;
  }

const NavMenu:React.FC<NavbarProps> = ({isOpen, toggleOpen}) => {

  return (
    <div id='slidingNav' className={`side_nav ${isOpen ? "open" : "close"}`}>
        <div className='nav_items'>
            <ul>
                <li><Link to={'/'} onClick = {toggleOpen}>home</Link></li>
                <li><Link to={'/products'} onClick={toggleOpen}>products</Link></li>
                <li><Link to={'/login'} onClick={toggleOpen}>Login</Link></li>
            </ul>
        </div>
        <EyeClosed size={32} onClick={toggleOpen}/>
    </div>
  )
}

export default NavMenu