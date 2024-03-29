import React from 'react';
import '../assets/styles/products.scss';
import {Suspense} from 'react';
import {Canvas} from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import Scene from '../Model'

const Products:React.FC = () => {
  return (
    <div className='products_main uniform-margin'>
      <h1>Shop our Collection</h1>
      <div className='tdcomp'>
        <Canvas>
          <ambientLight />
          <OrbitControls />
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}

export default Products