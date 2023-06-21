import React from 'react'
import '../assets/styles/componentStyles/navbar.scss'
import {MapTrifold, Vault} from '@phosphor-icons/react'


const Navbar:React.FC = () => {
  return (
    <div className='nav_main'>
        <div className="nav">
            <MapTrifold size={50} />
        </div>
        <h1>The Artefact Shop</h1>
        <div className="cart">
            <Vault size={50} />
        </div>
    </div>
  )
}

export default Navbar