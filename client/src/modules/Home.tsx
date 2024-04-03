import React from 'react';
import '../assets/styles/home.scss'
import Items from '../components/Items';

const Home:React.FC = () => {
  return (
    <div className='home_main uniform-margin'>
        <section className="explore_main">
            <h1>Explore Rare Treasures, Trade your Artifacts</h1>
            <Items />
        </section>
    </div>
  )
}

export default Home