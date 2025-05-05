import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import pink from '../images/pink.jpg'

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="container mx-auto px-4">
        <Navigation />
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-12">
          <div className="col-span-1 row-span-2">
            <img src="https://images.pexels.com/photos/7583367/pexels-photo-7583367.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Medical professionals" className="w-full h-full object-cover rounded" />
          </div>
          <div className="col-span-1">
            <img src="https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Interior architecture" className="w-full h-full object-cover rounded" />
          </div>
          <div className="col-span-1">
            <img src="https://images.pexels.com/photos/31854484/pexels-photo-31854484/free-photo-of-scenic-view-of-istanbul-s-haydarpasa-terminal.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Landscape view" className="w-full h-full object-cover rounded" />
          </div>
          <div className="col-span-1">
            <img src="https://images.pexels.com/photos/1424239/pexels-photo-1424239.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Architectural structure" className="w-full h-full object-cover rounded" />
          </div>
          <div className="col-span-1">
            <img src="https://images.pexels.com/photos/2990644/pexels-photo-2990644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Fight for tomorrow sign" className="w-full h-full object-cover rounded" />
          </div>
          <div className="col-span-1">
            <img src="https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Food plate" className="w-full h-full object-cover rounded" />
          </div>
          <div className="col-span-1">
            <img src="https://images.pexels.com/photos/4974361/pexels-photo-4974361.jpeg" alt="Person reading" className="w-full h-full object-cover rounded" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
          <div className="md:col-span-1">
            <img src={pink} alt="Portrait" className="w-full max-w-xs mx-auto md:mx-0 rounded-3xl" />
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