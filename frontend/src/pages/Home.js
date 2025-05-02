import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="container mx-auto px-4">
        <Navigation />
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-12">
          <div className="col-span-1 row-span-2">
            <img src="/api/placeholder/200/300" alt="Medical professionals" className="w-full h-full object-cover rounded" />
          </div>
          <div className="col-span-1">
            <img src="/api/placeholder/200/150" alt="Interior architecture" className="w-full h-full object-cover rounded" />
          </div>
          <div className="col-span-1">
            <img src="/api/placeholder/200/150" alt="Landscape view" className="w-full h-full object-cover rounded" />
          </div>
          <div className="col-span-1">
            <img src="/api/placeholder/200/150" alt="Architectural structure" className="w-full h-full object-cover rounded" />
          </div>
          <div className="col-span-1">
            <img src="/api/placeholder/200/150" alt="Fight for tomorrow sign" className="w-full h-full object-cover rounded" />
          </div>
          <div className="col-span-1">
            <img src="/api/placeholder/200/150" alt="Food plate" className="w-full h-full object-cover rounded" />
          </div>
          <div className="col-span-1">
            <img src="/api/placeholder/200/150" alt="Person reading" className="w-full h-full object-cover rounded" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
          <div className="md:col-span-1">
            <img src="/api/placeholder/300/300" alt="Portrait" className="w-full max-w-xs mx-auto md:mx-0" />
          </div>
          <div className="md:col-span-2">
            <h2 className="text-xl text-primary uppercase mb-4">ABOUT ME</h2>
            <p className="text-gray-700 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut lacus a justo vehicula hendrerit et in est felis. 
            </p>
            <p className="text-gray-700 mb-4">
              Vivamus dignissim urna, nec mattis lorem scelerisque laoreet. Nulla consequat varius cursus.
            </p>
            <p className="text-gray-700">
              Suspendisse congue ex lacus, quis placerauscipit malesuada.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;