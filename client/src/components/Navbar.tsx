import React, {useState} from 'react';
import '../assets/styles/componentStyles/navbar.scss';
import {Backpack, List, MagnifyingGlass} from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import NavMenu from './NavMenu';
import axios, {AxiosError} from 'axios';


const Navbar:React.FC = () => {
  const [navIsOpen, setNavIsOpen] = useState(false);

  const toggleNavbar = () => setNavIsOpen((navIsOpen) => !navIsOpen);

  const searchItems = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    try {
      const response = await axios.post('http://localhost:8000/api/search-items', { query });
      console.log(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError;
        if (error.response?.status === 400) {
          console.log('No items found');
        } else {
          console.log('Unexpected error', error);
        }
      } else {
        console.log('Unexpected error', err);
      }
    }
  }

  return (
    <div className='nav_main'>
        <div className="side_keys">
          <Link to = '/'>
            <h1>Artie's Artefacts</h1>
          </Link>
          <div className="search_bar">
            <MagnifyingGlass size={20} />
            <input type="text" placeholder='Search items, collectors & categories...' onChange={searchItems} />
          </div>
        </div>
        <div className="nav">
            {navIsOpen ? <NavMenu isOpen={navIsOpen} toggleOpen={toggleNavbar}  /> : <List size={27} onClick={toggleNavbar} />}
            <Backpack size={27} />
        </div>
    </div>
  )
}

export default Navbar