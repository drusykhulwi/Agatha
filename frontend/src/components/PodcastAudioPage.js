import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase/Config';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const PodcastAudioPage = () => {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

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
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [podcast]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (audio) {
      const seekTime = (e.target.value / 100) * duration;
      audio.currentTime = seekTime;
      setCurrentTime(seekTime);
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
      <div className="min-h-screen flex flex-col">
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
      <div className="min-h-screen flex flex-col">
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="container mx-auto px-4">
        <Navigation />
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="mb-4">
              <p className="text-center text-sm text-gray-500">NOW PLAYING</p>
            </div>
            
            <div className="mb-6">
              <img 
                src={podcast.thumbnailUrl || 'https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} 
                alt={podcast.title}
                className="w-full h-64 object-cover rounded-lg"
                onError={(e) => e.target.src = 'https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
              />
            </div>
            
            <div className="text-center mb-6">
              <h1 className="text-xl font-bold uppercase mb-1">{podcast.title}</h1>
              <p className="text-gray-600">{podcast.podcaster}</p>
            </div>
            
            {/* Audio Element */}
            <audio ref={audioRef} src={podcast.fileUrl} preload="metadata" />
            
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={duration ? (currentTime / duration) * 100 : 0}
                onChange={handleSeek}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #6B7280 0%, #6B7280 ${duration ? (currentTime / duration) * 100 : 0}%, #E5E7EB ${duration ? (currentTime / duration) * 100 : 0}%, #E5E7EB 100%)`
                }}
              />
            </div>
            
            {/* Controls */}
            <div className="flex justify-center items-center">
              <button 
                onClick={togglePlayPause}
                className="bg-gray-500 text-white rounded-full w-16 h-16 flex justify-center items-center hover:bg-gray-600 focus:outline-none transition-colors"
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PodcastAudioPage;