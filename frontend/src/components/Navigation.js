import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const Navigation = () => {
  const location = useLocation();
  
  return (
    <div className="flex items-center justify-between w-full py-4">
      <Logo />
      <div className="flex space-x-4">
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
    </div>
  );
};

export default Navigation;