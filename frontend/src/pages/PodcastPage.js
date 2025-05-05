import React from 'react';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

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
    <div className="max-w-6xl mx-auto p-4">
       <Navigation/>
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
      <div className="mb-8">
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
                <Link to={`/podcast/${podcast.id}`} className="font-semibold hover:text-pink-500">
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
      <div className="mb-8">
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
                <Link to={`/podcast/${podcast.id}`} className="font-semibold hover:text-pink-500">
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

      {/* Footer */}
      <div className="mt-12 py-6 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="w-16 h-16 bg-pink-200 flex items-center justify-center rounded-md mb-4">
              <span className="text-2xl font-serif">AN</span>
            </div>
            <p className="text-sm text-gray-500">"Your bio"</p>
          </div>
          
          <div>
            <h3 className="text-pink-200 mb-4">QUICK LINKS</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-pink-500">Home</a></li>
              <li><a href="#" className="hover:text-pink-500">Blogs</a></li>
              <li><a href="#" className="hover:text-pink-500">Podcasts</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-pink-200 mb-4">Contacts</h3>
            <ul className="space-y-2">
              <li>email@gmail.com</li>
              <li>+254712345678</li>
              <li className="flex space-x-3">
                <a href="#" className="text-blue-600 hover:text-blue-800">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 3.47v17.06A1.47 1.47 0 0120.53 22H3.47A1.47 1.47 0 012 20.53V3.47A1.47 1.47 0 013.47 2h17.06A1.47 1.47 0 0122 3.47zM7.882 19.262h-2.64v-8.47h2.64v8.47zM6.562 9.754a1.524 1.524 0 110-3.048 1.524 1.524 0 010 3.048zM19.259 19.262h-2.632v-4.12c0-.984-.018-2.249-1.369-2.249-1.371 0-1.581 1.07-1.581 2.176v4.193h-2.632v-8.47h2.525v1.155h.036a2.77 2.77 0 012.495-1.37c2.67 0 3.161 1.759 3.161 4.04v4.645z" />
                  </svg>
                </a>
                <a href="#" className="text-blue-400 hover:text-blue-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          COPYRIGHT © 2024, Agatha Nafula
        </div>
      </div>
    </div>
  );
};

export default PodcastsPage;