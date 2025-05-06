import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Edit, Plus } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { Menu } from 'lucide-react';

// Sample data for demonstration

const samplePodcasts = [
  {
    id: 1,
    title: "Understanding React Hooks",
    type: "audio",
    thumbnailUrl: "/api/placeholder/100/100",
    datePosted: "2025-05-01",
    views: 1245,
    duration: "32:15",
    podcaster: "Jane Smith"
  },
  {
    id: 2,
    title: "Deep Dive into Tailwind CSS",
    type: "video",
    thumbnailUrl: "/api/placeholder/100/100",
    datePosted: "2025-04-28",
    views: 3678,
    duration: "45:30",
    podcaster: "John Doe"
  },
  {
    id: 3,
    title: "State Management in 2025",
    type: "audio",
    thumbnailUrl: "/api/placeholder/100/100",
    datePosted: "2025-04-22",
    views: 987,
    duration: "28:45",
    podcaster: "Alex Johnson"
  }
];

const PodcastList = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
  const [podcasts, setPodcasts] = useState(samplePodcasts);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this podcast?')) {
      setPodcasts(podcasts.filter(podcast => podcast.id !== id));
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-podcast/${id}`);
  };

  const handleAddPodcast = () => {
    navigate('/add-podcast');
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
          >
            <Plus size={18} className="mr-2" />
            Add Podcast
          </button>
        </div>

        {/* Podcasts Table */}
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
                      src={podcast.thumbnailUrl} 
                      alt={podcast.title} 
                      className="h-12 w-12 rounded-md object-cover"
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
                    {podcast.datePosted}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {podcast.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(podcast.id)}
                        className="text-primary hover:text-secondary"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(podcast.id)}
                        className="text-secondary hover:text-primary"
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
      </div>
    </div>
  );
};

export default PodcastList;