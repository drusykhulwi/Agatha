import React from 'react'
import './Navbar.css'
import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
    const navRef = useRef();
    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }

  return (
    <header className='Navbar'>
        <div className='NavBar-contatiner'>
            <div className='logo'></div>
            <nav className='navigation' ref={navRef}>
                <NavLink to="/" exact activeClassName="active">Home</NavLink>
                <NavLink to ="/Blog" activeClassName="active">Blogs</NavLink>
                <NavLink to="/Podcast" activeClassName="active">Podcasts</NavLink>
                <button className='nav-btn nav-close-btn' onClick={showNavbar}>
                    <FaTimes />
                </button>
            </nav>
            <button className='nav-btn' onClick={showNavbar}>
                <FaBars/>
            </button>
        </div>
    </header>
  )
}

export default Navbar