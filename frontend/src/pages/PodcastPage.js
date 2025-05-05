import React from 'react';
import { Play, SkipBack, SkipForward } from 'lucide-react';

// Main Podcast Page Component
export default function PodcastPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Two column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Podcast Listings */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Section 1</h2>
            
            <div className="flex items-center justify-between mb-8">
              <div className="max-w-xs">
                <h3 className="text-xl font-bold uppercase">
                  GET TO LISTEN TO SOME OF MY PODCASTS. FROM HERE
                </h3>
              </div>
              <div className="w-40">
                <img 
                  src="/api/placeholder/200/150" 
                  alt="Podcast microphone" 
                  className="rounded"
                />
              </div>
            </div>
            
            {/* AUDIO Section */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">AUDIO</h3>
                <button className="bg-pink-200 text-gray-700 px-3 py-1 rounded text-sm">
                  Find More
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Audio Podcast Items */}
                {[1, 2, 3].map((item) => (
                  <div key={`audio-${item}`} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                        <img src="/api/placeholder/50/50" alt="Podcast" />
                      </div>
                      <div>
                        <p className="font-bold">Podcast Title</p>
                        <p className="text-sm">Podcaster</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">45:34</span>
                      <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs">•</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* VIDEO Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">VIDEO</h3>
                <button className="bg-pink-200 text-gray-700 px-3 py-1 rounded text-sm">
                  Find More
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Video Podcast Items */}
                {[1, 2, 3].map((item) => (
                  <div key={`video-${item}`} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-300 rounded overflow-hidden">
                        <img src="/api/placeholder/50/50" alt="Video thumbnail" />
                      </div>
                      <div>
                        <p className="font-bold">Podcast Title</p>
                        <p className="text-sm">Podcaster</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">45:34</span>
                      <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs">•</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="mb-4 md:mb-0">
                <div className="w-16 h-16 bg-pink-200 flex items-center justify-center mb-2">
                  <span className="text-2xl">AN</span>
                </div>
                <p className="text-sm text-gray-500">"Your bio"</p>
              </div>
              
              <div className="space-y-6 md:flex md:space-y-0 md:space-x-12">
                <div>
                  <h4 className="text-pink-300 mb-2">QUICK LINKS</h4>
                  <ul className="space-y-1">
                    <li>Home</li>
                    <li>Blogs</li>
                    <li>Podcasts</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-pink-300 mb-2">Contacts</h4>
                  <ul className="space-y-1">
                    <li>email@gmail.com</li>
                    <li>+254712345678</li>
                    <li className="flex space-x-2">
                      <span className="w-5 h-5 bg-blue-500"></span>
                      <span className="w-5 h-5 bg-blue-400"></span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
              COPYRIGHT © 2024, Agatha Nafula
            </div>
          </div>
        </div>
        
        {/* Right Column - Audio Player */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <button className="w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center">
                <span className="text-sm">×</span>
              </button>
              <div className="flex space-x-4">
                <button className="bg-pink-200 px-3 py-1 rounded text-sm">HOME</button>
                <button className="px-3 py-1 rounded text-sm">BLOG</button>
                <button className="px-3 py-1 rounded text-sm">PODCASTS</button>
              </div>
            </div>
            
            <div className="text-center my-4">
              <p className="text-sm">NOW PLAYING</p>
            </div>
            
            <div className="flex justify-center mb-6">
              <div className="w-48 h-48 bg-gray-200 rounded overflow-hidden">
                <img 
                  src="/api/placeholder/300/300" 
                  alt="Podcast cover - Fight today for a better tomorrow"
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
            
            <div className="text-center mb-8">
              <h3 className="font-bold">PODCAST TITLE</h3>
              <p className="text-sm">PODCASTER'S NAME</p>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>7:23</span>
                <span>42:03</span>
              </div>
              <div className="relative h-1 bg-gray-200 rounded">
                <div className="absolute left-0 top-0 h-full w-1/6 bg-blue-500 rounded"></div>
                <div className="absolute left-1/6 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full"></div>
              </div>
            </div>
            
            <div className="flex justify-center items-center space-x-8">
              <button className="text-blue-500">
                <SkipBack size={24} />
              </button>
              <button className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-blue-500">
                <Play size={24} />
              </button>
              <button className="text-blue-500">
                <SkipForward size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}