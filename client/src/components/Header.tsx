import React, {useState} from 'react';
import '../assets/styles/componentStyles/header.scss';
import {List, MagnifyingGlass} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import MobileNav from './MobileNav';
import searchItems from '../utils/searchItem';
import Nav from './Nav';

const Navbar:React.FC = () => {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const toggleNavbar = () => setNavIsOpen((navIsOpen) => !navIsOpen);
  const [items, setItems] = useState([]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = await searchItems(e);
    setItems(data);
    console.log(items)
  }

  return (
    <div className='header_main'>
        <div className="side_keys">
          <Link to = '/'>
            <h1>Artie's</h1>
            <h1>Artefacts.</h1>
          </Link>
          <div className="search_bar">
            <MagnifyingGlass size={20} />
            <input type="text" placeholder='Search items, collectors & categories...' onChange={handleSearch} />
          </div>
        </div>
        <div className="nav">
            <Nav />
            <div className='mobile_nav'>
              {navIsOpen ? <MobileNav isOpen={navIsOpen} toggleOpen={toggleNavbar}  /> : <List size={27} onClick={toggleNavbar} />}
            </div>
        </div>
    </div>
  )
}

export default Navbar