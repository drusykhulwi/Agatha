import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="container mx-auto px-4">
        <h1 className="text-2xl text-gray-400 font-light py-6">Blogs</h1>
        <Navigation />
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Featured Blog */}
        <div className="relative w-full h-80 md:h-96 mb-8">
          <img src="/api/placeholder/1200/500" alt="White House" className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
            <h2 className="text-xl md:text-2xl font-medium">Blog Title</h2>
            <p className="text-sm opacity-80">Minutes read</p>
            <button className="mt-2 bg-primary text-white px-4 py-1 rounded-sm text-sm">Read More</button>
          </div>
        </div>
        
        <h2 className="text-gray-400 text-center uppercase mb-4">BLOGS</h2>
        <p className="text-gray-700 text-center mb-8">Here are some of the articles I've written</p>
        
        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {[1, 2, 3].map((blog) => (
            <div key={blog} className="flex flex-col">
              <img src="/api/placeholder/400/250" alt="Medical professionals" className="w-full h-48 object-cover mb-4" />
              <h3 className="text-gray-400 mb-2">Blog Title</h3>
              <p className="text-gray-700 text-sm mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut lacus a justo vehicula hendrerit et in est
              </p>
              <button className="mt-auto bg-primary text-white px-4 py-1 rounded-sm self-start text-sm">Read More</button>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mb-8">
          <button className="bg-primary text-white px-6 py-2 rounded-sm">Load More</button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;