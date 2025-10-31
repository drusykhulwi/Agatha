import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/Config';
import Sidebar from '../components/Sidebar';
import { Menu, Edit, Trash2, Loader2 } from 'lucide-react';

const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPodcasts: 0,
    totalArticles: 0,
    totalViews: 0,
    totalLikes: 0
  });
  const [recentPodcasts, setRecentPodcasts] = useState([]);
  const [recentArticles, setRecentArticles] = useState([]);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch all podcasts
      const podcastsQuery = query(collection(db, 'podcasts'), orderBy('createdAt', 'desc'));
      const podcastsSnapshot = await getDocs(podcastsQuery);
      const allPodcasts = [];
      let podcastViews = 0;
      
      podcastsSnapshot.forEach((doc) => {
        const data = { id: doc.id, ...doc.data() };
        allPodcasts.push(data);
        podcastViews += data.views || 0;
      });

      // Fetch all articles
      const articlesQuery = query(collection(db, 'articles'), orderBy('createdAt', 'desc'));
      const articlesSnapshot = await getDocs(articlesQuery);
      const allArticles = [];
      let articleViews = 0;
      
      articlesSnapshot.forEach((doc) => {
        const data = { id: doc.id, ...doc.data() };
        allArticles.push(data);
        articleViews += data.views || 0;
      });

      // Set stats
      setStats({
        totalPodcasts: allPodcasts.length,
        totalArticles: allArticles.length,
        totalViews: podcastViews + articleViews,
        totalLikes: 0 // You can implement likes later
      });

      // Set recent items (top 3)
      setRecentPodcasts(allPodcasts.slice(0, 3));
      setRecentArticles(allArticles.slice(0, 3));

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const handleDeletePodcast = async (id) => {
    if (window.confirm('Are you sure you want to delete this podcast?')) {
      try {
        await deleteDoc(doc(db, 'podcasts', id));
        fetchDashboardData(); // Refresh data
        alert('Podcast deleted successfully!');
      } catch (error) {
        console.error('Error deleting podcast:', error);
        alert('Failed to delete podcast');
      }
    }
  };

  const handleDeleteArticle = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await deleteDoc(doc(db, 'articles', id));
        fetchDashboardData(); // Refresh data
        alert('Article deleted successfully!');
      } catch (error) {
        console.error('Error deleting article:', error);
        alert('Failed to delete article');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="lg:hidden fixed top-4 left-4 z-20">
          <button 
            onClick={toggleMobileMenu}
            className="p-2 rounded-md bg-primary text-white hover:bg-primary/90"
          >
            <Menu size={24} />
          </button>
        </div>
        <Sidebar isMobileMenuOpen={isMobileMenuOpen} closeMobileMenu={() => setIsMobileMenuOpen(false)} />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 size={40} className="animate-spin text-primary" />
          <span className="ml-2 text-lg">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
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
      <div className="flex-1 overflow-auto p-8 lg:ml-30">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 mt-6 text-primary">Dashboard</h1>
          <p className="text-gray-600 mb-4">Welcome to your dashboard! Here you can manage your podcasts and articles.</p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Total Podcasts</h3>
              <p className="text-3xl font-bold text-primary">{stats.totalPodcasts}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Total Articles</h3>
              <p className="text-3xl font-bold text-primary">{stats.totalArticles}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Total Views</h3>
              <p className="text-3xl font-bold text-primary">{stats.totalViews.toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Total Likes</h3>
              <p className="text-3xl font-bold text-primary">{stats.totalLikes}</p>
            </div>
          </div>

          {/* Recent Podcasts */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">RECENT PODCASTS</h2>
              <Link 
                to="/podcastlist" 
                className="text-sm text-primary hover:text-secondary"
              >
                View All
              </Link>
            </div>
            
            {recentPodcasts.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <p className="text-gray-500">No podcasts yet. Add your first podcast!</p>
                <Link 
                  to="/add-podcast"
                  className="inline-block mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors"
                >
                  Add Podcast
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thumbnail</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentPodcasts.map((podcast) => (
                      <tr key={podcast.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img 
                            src={podcast.thumbnailUrl || 'https://via.placeholder.com/100'} 
                            alt={podcast.title} 
                            className="h-12 w-12 rounded-md object-cover"
                            onError={(e) => e.target.src = 'https://via.placeholder.com/100'}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{podcast.title}</div>
                          <div className="text-sm text-gray-500">{podcast.podcaster}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            podcast.type === 'audio' ? 'bg-secondary text-white' : 'bg-primary text-white'
                          }`}>
                            {podcast.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(podcast.createdAt)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(podcast.views || 0).toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => navigate(`/edit-podcast/${podcast.id}`)}
                            className="text-primary hover:text-secondary mr-3"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDeletePodcast(podcast.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Recent Articles */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">RECENT ARTICLES</h2>
              <Link 
                to="/articles" 
                className="text-sm text-primary hover:text-secondary"
              >
                View All
              </Link>
            </div>
            
            {recentArticles.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <p className="text-gray-500">No articles yet. Add your first article!</p>
                <Link 
                  to="/add-article"
                  className="inline-block mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors"
                >
                  Add Article
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thumbnail</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentArticles.map((article) => (
                      <tr key={article.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img 
                            src={article.thumbnail || 'https://via.placeholder.com/100'} 
                            alt={article.title} 
                            className="h-12 w-12 rounded-md object-cover"
                            onError={(e) => e.target.src = 'https://via.placeholder.com/100'}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{article.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(article.createdAt)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(article.views || 0).toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => navigate(`/edit-article/${article.id}`)}
                            className="text-primary hover:text-secondary mr-3"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDeleteArticle(article.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;