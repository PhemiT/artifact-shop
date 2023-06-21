import React from 'react'
import Navbar from "./Navbar"

type LayoutProps = {
    children: React.ReactNode;
};


const Layout:React.FC<LayoutProps> = (props) => {
  return (
    <>
        <Navbar />
        {props.children}
    </>
  )
}

export default Layout