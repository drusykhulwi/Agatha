import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase/Config';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const PodcastVideoPage = () => {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    fetchPodcast();
  }, [id]);

  const fetchPodcast = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, 'podcasts', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setPodcast({ id: docSnap.id, ...docSnap.data() });
        
        // Increment view count
        await updateDoc(docRef, {
          views: increment(1)
        });
      } else {
        alert('Podcast not found!');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching podcast:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const handleEnded = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [podcast]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
    }
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    if (video) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      video.currentTime = pos * duration;
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <header className="container mx-auto px-4">
          <Navigation />
        </header>
        <main className="flex-grow flex justify-center items-center">
          <p className="text-gray-600">Loading podcast...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!podcast) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <header className="container mx-auto px-4">
          <Navigation />
        </header>
        <main className="flex-grow flex justify-center items-center">
          <p className="text-red-600">Podcast not found</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <header className="container mx-auto px-4">
        <Navigation />
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-4">
        <div className="mb-6 text-center">
          <p className="text-gray-600">NOW PLAYING</p>
        </div>
        
        {/* Video Player */}
        <div className="relative mb-4 max-w-4xl mx-auto">
          <div className="relative bg-black">
            <video 
              ref={videoRef}
              src={podcast.fileUrl}
              poster={podcast.thumbnailUrl}
              className="w-full"
              onClick={togglePlayPause}
            />
            
            {/* Video Overlay Controls */}
            <div className="absolute inset-0 flex flex-col justify-between p-4 text-white pointer-events-none">
              {/* Top Overlay */}
              <div className="flex justify-between">
                <h2 className="font-bold text-lg drop-shadow-md">{podcast.title}</h2>
                <p className="font-bold text-lg drop-shadow-md">{podcast.podcaster}</p>
              </div>
              
              {/* Bottom Overlay with Controls */}
              <div className="pointer-events-auto">
                {/* Progress Bar */}
                <div 
                  className="relative h-1 bg-gray-400 bg-opacity-50 rounded-full mb-2 cursor-pointer"
                  onClick={handleSeek}
                >
                  <div 
                    className="absolute h-full bg-white rounded-full transition-all"
                    style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  ></div>
                </div>
                
                {/* Time and Controls */}
                <div className="flex justify-between items-center">
                  <span className="text-sm drop-shadow-md">{formatTime(currentTime)}</span>
                  
                  <div className="flex space-x-4 items-center">
                    <button 
                      className="w-10 h-10 bg-gray-200 bg-opacity-30 rounded-full flex items-center justify-center focus:outline-none hover:bg-opacity-50 transition-all"
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
                  </div>
                  
                  <span className="text-sm drop-shadow-md">{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Podcast Info */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-2">{podcast.title}</h1>
          <p className="text-gray-600 mb-4">By {podcast.podcaster}</p>
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-4">Duration: {podcast.duration}</span>
            <span>Views: {(podcast.views || 0).toLocaleString()}</span>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PodcastVideoPage;