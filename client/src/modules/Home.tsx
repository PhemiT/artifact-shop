import React from 'react';
import '../assets/styles/home.scss'
import Items from '../components/Items';

const Home:React.FC = () => {
  return (
    <div className='home_main uniform-margin'>
        <section className="explore_main">
            <h2>Explore Rarest Items</h2>
            <Items />
        </section>
    </div>
  )
}

export default Home