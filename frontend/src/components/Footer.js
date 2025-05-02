import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  return (
    <div className="bg-white py-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-gray-600 text-sm">"Your bio"</p>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-gray-400 font-light mb-4">QUICK LINKS</h3>
            <Link to="/" className="text-gray-700 mb-2">Home</Link>
            <Link to="/blogs" className="text-gray-700 mb-2">Blogs</Link>
            <Link to="/podcasts" className="text-gray-700">Podcasts</Link>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-gray-400 font-light mb-4">Contacts</h3>
            <p className="text-gray-700 mb-2">email@gmail.com</p>
            <p className="text-gray-700 mb-4">+254712345678</p>
            <div className="flex space-x-2">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8 text-gray-600 text-sm">
          COPYRIGHT © 2024, Agatha Nafula
        </div>
      </div>
    </div>
  );
};

export default Footer;