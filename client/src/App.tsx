import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import { Home, Cart, Products, Register } from './modules'
import Layout from './components/Layout';


function App() {
  return (
    <div className='App'>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Register />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
