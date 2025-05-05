import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PodcastAudioPage = () => {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [currentTime, setCurrentTime] = useState('7:23');
  const [totalDuration, setTotalDuration] = useState('42:03');
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Simulating fetching podcast data based on ID
  useEffect(() => {
    // This would typically be an API call
    const fetchPodcastData = () => {
      // Mock data - in real app, you'd fetch based on the id
      setPodcast({
        id: id,
        title: 'PODCAST TITLE',
        podcasterName: 'PODCASTER\'S NAME',
        image: 'https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        audioSrc: '/path/to/audio-file.mp3'
      });
    };
    
    fetchPodcastData();
  }, [id]);
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    // This would actually control the audio playback in a real implementation
  };
  
  const handlePrevious = () => {
    // Logic to play previous episode
    console.log('Play previous episode');
  };
  
  const handleNext = () => {
    // Logic to play next episode
    console.log('Play next episode');
  };
  
  if (!podcast) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="mb-4">
            <p className="text-center text-sm text-gray-500">NOW PLAYING</p>
          </div>
          
          <div className="mb-6">
            <img 
              src={podcast.image} 
              alt={podcast.title}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold uppercase mb-1">{podcast.title}</h1>
            <p className="text-gray-600">{podcast.podcasterName}</p>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>{currentTime}</span>
              <span>{totalDuration}</span>
            </div>
            <div className="relative h-1 bg-gray-200 rounded-full">
              <div 
                className="absolute h-full bg-gray-500 rounded-full"
                style={{ width: '15%' }}
              ></div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <button 
              onClick={handlePrevious}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={togglePlayPause}
              className="bg-gray-500 text-white rounded-full w-12 h-12 flex justify-center items-center hover:bg-gray-600 focus:outline-none"
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </button>
            
            <button 
              onClick={handleNext}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodcastAudioPage;