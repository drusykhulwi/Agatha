import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png'

const Logo = () => {
  return (
    <Link to="/" className="block w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-thin">
      <img src={logo} alt='Logo' className='rounded-full'/>
    </Link>
  );
};

export default Logo;