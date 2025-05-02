import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="block w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white font-thin">
      <span className="text-3xl font-light">AN</span>
    </Link>
  );
};

export default Logo;