import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from './Navigation';

const PodcastVideoPage = () => {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [currentTime, setCurrentTime] = useState('7:23');
  const [totalDuration, setTotalDuration] = useState('9:53');
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Simulating fetching podcast data based on ID
  useEffect(() => {
    // This would typically be an API call
    const fetchPodcastData = () => {
      // Mock data - in real app, you'd fetch based on the id
      setPodcast({
        id: id,
        title: 'PODCAST TITLE',
        podcasterName: 'PODCASTERS NAME',
        videoSrc: 'https://videos.pexels.com/video-files/6948549/6948549-uhd_2560_1440_24fps.mp4',
        thumbnailSrc: 'https://images.pexels.com/photos/6883807/pexels-photo-6883807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      });
    };
    
    fetchPodcastData();
  }, [id]);
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    // This would actually control the video playback in a real implementation
  };
  
  const handlePrevious = () => {
    // Logic to play previous video
    console.log('Play previous video');
  };
  
  const handleNext = () => {
    // Logic to play next video
    console.log('Play next video');
  };
  
  if (!podcast) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <Navigation/>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-4">
        <div className="mb-6 text-center">
          <p className="text-gray-600">NOW PLAYING</p>
        </div>
        
        {/* Video Player */}
        <div className="relative mb-4">
          <div className="aspect-w-16 aspect-h-9 relative">
            <img 
              src={podcast.thumbnailSrc || "https://images.pexels.com/photos/6883809/pexels-photo-6883809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} 
              alt={podcast.title}
              className="w-full h-auto object-cover"
            />
            
            {/* Video Overlay Elements */}
            <div className="absolute inset-0 flex flex-col justify-between p-4 text-white">
              {/* Top Overlay */}
              <div className="flex justify-between">
                <h2 className="font-bold text-lg drop-shadow-md">PODCAST TITLE</h2>
                <p className="font-bold text-lg drop-shadow-md">PODCASTERS NAME</p>
              </div>
              
              {/* Bottom Overlay with Controls */}
              <div>
                {/* Progress Bar */}
                <div className="relative h-1 bg-gray-400 bg-opacity-50 rounded-full mb-2">
                  <div 
                    className="absolute h-full bg-white rounded-full"
                    style={{ width: '75%' }}
                  ></div>
                </div>
                
                {/* Time and Controls */}
                <div className="flex justify-between items-center">
                  <span className="text-sm drop-shadow-md">{currentTime}</span>
                  
                  <div className="flex space-x-4 items-center">
                    <button 
                      className="focus:outline-none"
                      onClick={handlePrevious}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
                      </svg>
                    </button>
                    
                    <button 
                      className="w-10 h-10 bg-gray-200 bg-opacity-30 rounded-full flex items-center justify-center focus:outline-none"
                      onClick={togglePlayPause}
                    >
                      {isPlaying ? (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                    
                    <button 
                      className="focus:outline-none"
                      onClick={handleNext}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798L4.555 5.168z" />
                      </svg>
                    </button>
                  </div>
                  
                  <span className="text-sm drop-shadow-md">{totalDuration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PodcastVideoPage;