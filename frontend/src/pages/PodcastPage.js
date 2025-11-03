import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/Config';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PodcastsPage = () => {
  const [audioPodcasts, setAudioPodcasts] = useState([]);
  const [videoPodcasts, setVideoPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [audioCurrentPage, setAudioCurrentPage] = useState(1);
  const [videoCurrentPage, setVideoCurrentPage] = useState(1);
  const itemsPerPage = 9;

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

  // Audio Pagination
  const audioTotalPages = Math.ceil(audioPodcasts.length / itemsPerPage);
  const audioStartIndex = (audioCurrentPage - 1) * itemsPerPage;
  const audioEndIndex = audioStartIndex + itemsPerPage;
  const currentAudioPodcasts = audioPodcasts.slice(audioStartIndex, audioEndIndex);

  const goToAudioPage = (page) => {
    setAudioCurrentPage(page);
    document.getElementById('audio-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const goToAudioPrevious = () => {
    if (audioCurrentPage > 1) goToAudioPage(audioCurrentPage - 1);
  };

  const goToAudioNext = () => {
    if (audioCurrentPage < audioTotalPages) goToAudioPage(audioCurrentPage + 1);
  };

  // Video Pagination
  const videoTotalPages = Math.ceil(videoPodcasts.length / itemsPerPage);
  const videoStartIndex = (videoCurrentPage - 1) * itemsPerPage;
  const videoEndIndex = videoStartIndex + itemsPerPage;
  const currentVideoPodcasts = videoPodcasts.slice(videoStartIndex, videoEndIndex);

  const goToVideoPage = (page) => {
    setVideoCurrentPage(page);
    document.getElementById('video-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const goToVideoPrevious = () => {
    if (videoCurrentPage > 1) goToVideoPage(videoCurrentPage - 1);
  };

  const goToVideoNext = () => {
    if (videoCurrentPage < videoTotalPages) goToVideoPage(videoCurrentPage + 1);
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
        <div id="audio-section" className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">AUDIO</h2>
          </div>
          
          {audioPodcasts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No audio podcasts available yet.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {currentAudioPodcasts.map(podcast => (
                  <div key={podcast.id} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                    <div className="relative flex-shrink-0">
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

              {/* Audio Pagination */}
              {audioTotalPages > 1 && (
                <div className="flex justify-center items-center space-x-2">
                  <button
                    onClick={goToAudioPrevious}
                    disabled={audioCurrentPage === 1}
                    className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  
                  {[...Array(audioTotalPages)].map((_, index) => {
                    const page = index + 1;
                    if (
                      page === 1 ||
                      page === audioTotalPages ||
                      (page >= audioCurrentPage - 1 && page <= audioCurrentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => goToAudioPage(page)}
                          className={`px-4 py-2 rounded-md ${
                            audioCurrentPage === page
                              ? 'bg-primary text-white'
                              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (page === audioCurrentPage - 2 || page === audioCurrentPage + 2) {
                      return <span key={page} className="px-2">...</span>;
                    }
                    return null;
                  })}
                  
                  <button
                    onClick={goToAudioNext}
                    disabled={audioCurrentPage === audioTotalPages}
                    className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Video Section */}
        <div id="video-section" className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">VIDEO</h2>
          </div>
          
          {videoPodcasts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No video podcasts available yet.</p>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {currentVideoPodcasts.map(podcast => (
                  <div key={podcast.id} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                    <div className="relative flex-shrink-0">
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

              {/* Video Pagination */}
              {videoTotalPages > 1 && (
                <div className="flex justify-center items-center space-x-2">
                  <button
                    onClick={goToVideoPrevious}
                    disabled={videoCurrentPage === 1}
                    className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  
                  {[...Array(videoTotalPages)].map((_, index) => {
                    const page = index + 1;
                    if (
                      page === 1 ||
                      page === videoTotalPages ||
                      (page >= videoCurrentPage - 1 && page <= videoCurrentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => goToVideoPage(page)}
                          className={`px-4 py-2 rounded-md ${
                            videoCurrentPage === page
                              ? 'bg-primary text-white'
                              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (page === videoCurrentPage - 2 || page === videoCurrentPage + 2) {
                      return <span key={page} className="px-2">...</span>;
                    }
                    return null;
                  })}
                  
                  <button
                    onClick={goToVideoNext}
                    disabled={videoCurrentPage === videoTotalPages}
                    className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default PodcastsPage;