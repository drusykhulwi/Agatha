import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from '../firebase/Config';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const PodcastsPage = () => {
  const [audioPodcasts, setAudioPodcasts] = useState([]);
  const [videoPodcasts, setVideoPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [audioDisplayCount, setAudioDisplayCount] = useState(3);
  const [videoDisplayCount, setVideoDisplayCount] = useState(3);

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const fetchPodcasts = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'podcasts'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const audio = [];
      const video = [];
      
      querySnapshot.forEach((doc) => {
        const data = { id: doc.id, ...doc.data() };
        if (data.type === 'audio') {
          audio.push(data);
        } else {
          video.push(data);
        }
      });
      
      setAudioPodcasts(audio);
      setVideoPodcasts(video);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching podcasts:', err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="container mx-auto px-4">
          <Navigation />
        </header>
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <p className="text-gray-600">Loading podcasts...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="container mx-auto px-4">
        <Navigation />
      </header>
      
      {/* Section 1 */}
      <div className="container mx-auto px-4 py-8">
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
                className="w-full h-full rounded-full" 
              />
            </div>
          </div>
        </div>

        {/* Audio Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">AUDIO</h2>
            {audioPodcasts.length > audioDisplayCount && (
              <button 
                onClick={() => setAudioDisplayCount(prev => prev + 3)}
                className="bg-pink-200 hover:bg-pink-300 text-gray-800 px-4 py-1 rounded-md"
              >
                Find More
              </button>
            )}
          </div>
          
          {audioPodcasts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No audio podcasts available yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {audioPodcasts.slice(0, audioDisplayCount).map(podcast => (
                <div key={podcast.id} className="flex items-center space-x-4">
                  <div className="relative">
                    <img 
                      src={podcast.thumbnailUrl || "https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} 
                      alt={podcast.title}
                      className="w-16 h-16 rounded-full object-cover" 
                      onError={(e) => e.target.src = "https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                    />
                  </div>
                  <div>
                    <Link to={`/podcast-audio/${podcast.id}`} className="font-semibold hover:text-pink-500">
                      {podcast.title}
                    </Link>
                    <p className="text-sm text-gray-600">{podcast.podcaster}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-sm text-gray-500">{podcast.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Video Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">VIDEO</h2>
            {videoPodcasts.length > videoDisplayCount && (
              <button 
                onClick={() => setVideoDisplayCount(prev => prev + 3)}
                className="bg-pink-200 hover:bg-pink-300 text-gray-800 px-4 py-1 rounded-md"
              >
                Find More
              </button>
            )}
          </div>
          
          {videoPodcasts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No video podcasts available yet.</p>
          ) : (
            <div className="space-y-4">
              {videoPodcasts.slice(0, videoDisplayCount).map(podcast => (
                <div key={podcast.id} className="flex items-center space-x-4">
                  <div className="relative">
                    <img 
                      src={podcast.thumbnailUrl || "https://images.pexels.com/photos/6883809/pexels-photo-6883809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} 
                      alt={podcast.title}
                      className="w-24 h-16 object-cover rounded-md" 
                      onError={(e) => e.target.src = "https://images.pexels.com/photos/6883809/pexels-photo-6883809.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
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
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default PodcastsPage;