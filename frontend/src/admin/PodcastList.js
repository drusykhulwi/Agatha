import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Edit, Plus, Menu, Loader2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useFirestore } from '../hooks/UseFirestore';
import { db } from '../firebase/Config';
import { doc, deleteDoc } from 'firebase/firestore';

const PodcastList = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { docs: podcasts, loading, error } = useFirestore('podcasts');
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this podcast?')) {
      try {
        setIsDeleting(true);
        await deleteDoc(doc(db, 'podcasts', id));
        // Note: The useFirestore hook will automatically update the list
      } catch (error) {
        console.error("Error deleting podcast:", error);
        alert(`Error: ${error.message}`);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-podcast/${id}`);
  };

  const handleAddPodcast = () => {
    navigate('/add-podcast');
  };

  // Format the timestamp
  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    
    // Handle Firestore Timestamp objects
    if (timestamp.toDate) {
      return timestamp.toDate().toISOString().split('T')[0];
    }
    
    // Handle regular dates
    return new Date(timestamp).toISOString().split('T')[0];
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-20">
        <button 
          onClick={toggleMobileMenu}
          className="p-2 rounded-md bg-primary text-white hover:bg-primary/90"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <Sidebar isMobileMenuOpen={isMobileMenuOpen} closeMobileMenu={() => setIsMobileMenuOpen(false)} />

      {/* Main content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-secondary">Podcasts</h1>
          <button 
            onClick={handleAddPodcast} 
            className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-all"
            disabled={isDeleting}
          >
            <Plus size={18} className="mr-2" />
            Add Podcast
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>Error: {error}</p>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-10">
            <Loader2 size={40} className="animate-spin text-primary" />
            <span className="ml-2 text-lg">Loading podcasts...</span>
          </div>
        )}

        {/* Empty state */}
        {!loading && podcasts.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-10 text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No podcasts found</h2>
            <p className="text-gray-500 mb-4">Get started by adding your first podcast!</p>
            <button 
              onClick={handleAddPodcast} 
              className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-all"
            >
              <Plus size={18} className="mr-2" />
              Add Podcast
            </button>
          </div>
        )}

        {/* Podcasts Table */}
        {!loading && podcasts.length > 0 && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thumbnail
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Posted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {podcasts.map((podcast) => (
                  <tr key={podcast.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img 
                        src={podcast.thumbnailUrl || "/api/placeholder/100/100"} 
                        alt={podcast.title} 
                        className="h-12 w-12 rounded-md object-cover"
                        onError={(e) => {e.target.src = "/api/placeholder/100/100"}}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{podcast.title}</div>
                      <div className="text-sm text-gray-500">{podcast.podcaster}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        podcast.type === 'audio' 
                          ? 'bg-secondary text-white' 
                          : 'bg-primary text-white'
                      }`}>
                        {podcast.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(podcast.datePosted)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {(podcast.views || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEdit(podcast.id)}
                          className="text-primary hover:text-secondary"
                          disabled={isDeleting}
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(podcast.id)}
                          className="text-secondary hover:text-primary"
                          disabled={isDeleting}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PodcastList;