import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

// Podcast listing page component
const PodcastsPage = () => {
  // Sample podcast data
  const audioPodcasts = [
    { id: 1, title: 'Podcast Title', podcaster: 'Podcaster', duration: '45:34' },
    { id: 2, title: 'Podcast Title', podcaster: 'Podcaster', duration: '45:34' },
    { id: 3, title: 'Podcast Title', podcaster: 'Podcaster', duration: '45:34' }
  ];

  const videoPodcasts = [
    { id: 4, title: 'Podcast Title', podcaster: 'Podcaster', duration: '45:34' },
    { id: 5, title: 'Podcast Title', podcaster: 'Podcaster', duration: '45:34' },
    { id: 6, title: 'Podcast Title', podcaster: 'Podcaster', duration: '45:34' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
        <header className="container mx-auto px-4">
            <Navigation />
        </header>
      {/* Section 1 */}
      <div className="bg-white rounded-md shadow-sm p-8 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="max-w-md mb-6 md:mb-0">
            <h1 className="text-2xl font-bold mb-2">
              GET TO LISTEN TO SOME OF MY PODCASTS.
              <br />
              FROM HERE
            </h1>
          </div>
          <div className="w-full md:w-1/2">
            <img 
              src="https://images.pexels.com/photos/7586662/pexels-photo-7586662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Podcast mic and equipment" 
              className="w-full rounded-md" 
            />
          </div>
        </div>
      </div>

      {/* Audio Section */}
      <div className="mb-8 p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">AUDIO</h2>
          <button className="bg-pink-200 hover:bg-pink-300 text-gray-800 px-4 py-1 rounded-md">
            Find More
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {audioPodcasts.map(podcast => (
            <div key={podcast.id} className="flex items-center space-x-4">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Podcast cover" 
                  className="w-16 h-16 rounded-full object-cover" 
                />
              </div>
              <div>
                <Link to={`/podcast-audio/${podcast.id}`} className="font-semibold hover:text-pink-500">
                  {podcast.title}
                </Link>
                <p className="text-sm text-gray-600">{podcast.podcaster}</p>
                <div className="flex items-center mt-1">
                  <span className="text-sm text-gray-500">{podcast.duration}</span>
                  <div className="w-1 h-1 bg-gray-400 rounded-full mx-2"></div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8-6a6 6 0 100 12 6 6 0 000-12z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Section */}
      <div className="mb-8 p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">VIDEO</h2>
          <button className="bg-pink-200 hover:bg-pink-300 text-gray-800 px-4 py-1 rounded-md">
            Find More
          </button>
        </div>
        
        <div className="space-y-4">
          {videoPodcasts.map(podcast => (
            <div key={podcast.id} className="flex items-center space-x-4">
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/6883809/pexels-photo-6883809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Video thumbnail" 
                  className="w-24 h-16 object-cover rounded-md" 
                />
              </div>
              <div className="flex-1">
                <Link to={`/podcast-video/${podcast.id}`} className="font-semibold hover:text-pink-500">
                  {podcast.title}
                </Link>
                <p className="text-sm text-gray-600">{podcast.podcaster}</p>
                <div className="flex items-center mt-1">
                  <span className="text-sm text-gray-500">{podcast.duration}</span>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8-6a6 6 0 100 12 6 6 0 000-12z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default PodcastsPage;