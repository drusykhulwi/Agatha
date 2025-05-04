import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <div className="flex flex-col w-full py-4">
      <div className="flex items-center justify-between w-full">
        <Logo />
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4">
          <Link 
            to="/" 
            className={`px-4 py-1 ${location.pathname === '/' ? 'bg-primary text-white' : 'text-gray-700'}`}
          >
            HOME
          </Link>
          <Link 
            to="/blogs" 
            className={`px-4 py-1 ${location.pathname === '/blogs' ? 'bg-primary text-white' : 'text-gray-700'}`}
          >
            BLOG
          </Link>
          <Link 
            to="/podcasts" 
            className="px-4 py-1 text-gray-700"
          >
            PODCASTS
          </Link>
        </div>
        
        {/* Hamburger Menu Button */}
        <button 
          className="md:hidden flex items-center p-2 rounded text-gray-700" 
          onClick={toggleMobileMenu}
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden flex flex-col mt-2 bg-white shadow-md rounded-md p-2">
          <Link 
            to="/" 
            className={`px-4 py-2 ${location.pathname === '/' ? 'bg-primary text-white' : 'text-gray-700'} rounded mb-1`}
            onClick={() => setMobileMenuOpen(false)}
          >
            HOME
          </Link>
          <Link 
            to="/blogs" 
            className={`px-4 py-2 ${location.pathname === '/blogs' ? 'bg-primary text-white' : 'text-gray-700'} rounded mb-1`}
            onClick={() => setMobileMenuOpen(false)}
          >
            BLOG
          </Link>
          <Link 
            to="/podcasts" 
            className="px-4 py-2 text-gray-700 rounded"
            onClick={() => setMobileMenuOpen(false)}
          >
            PODCASTS
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navigation;