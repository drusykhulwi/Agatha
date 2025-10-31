import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/Config';
import Sidebar from '../components/Sidebar';
import { Menu, Trash2, Edit } from 'lucide-react';

function ArticleList() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const articlesData = [];
      querySnapshot.forEach((doc) => {
        articlesData.push({ id: doc.id, ...doc.data() });
      });
      
      setArticles(articlesData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError('Failed to fetch articles');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await deleteDoc(doc(db, 'articles', id));
        setArticles(articles.filter(article => article.id !== id));
        alert('Article deleted successfully!');
      } catch (err) {
        console.error('Error deleting article:', err);
        alert('Failed to delete article. Please try again.');
      }
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  if (loading) {
    return (
      <div className="w-full flex h-screen bg-gray-50">
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
          <p className="text-gray-600">Loading articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex h-screen bg-gray-50">
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
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex h-screen bg-gray-50">
      <div className="lg:hidden fixed top-4 left-4 z-20">
        <button 
          onClick={toggleMobileMenu}
          className="p-2 rounded-md bg-primary text-white hover:bg-primary/90"
        >
          <Menu size={24} />
        </button>
      </div>

      <Sidebar isMobileMenuOpen={isMobileMenuOpen} closeMobileMenu={() => setIsMobileMenuOpen(false)} />
      
      <div className="flex-1 overflow-auto p-8 lg:ml-30">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Articles</h1>
          <Link 
            to="/add-article" 
            className="bg-secondary hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors duration-300"
          >
            Add Blog
          </Link>
        </div>

        {articles.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500">No articles yet. Add your first article!</p>
          </div>
        ) : (
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
                {articles.map((article) => (
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{formatDate(article.createdAt)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{(article.views || 0).toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link 
                          to={`/edit-article/${article.id}`} 
                          className="text-primary hover:text-secondary transition-colors duration-300"
                        >
                          <Edit size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="text-secondary hover:text-background transition-colors duration-300"
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
}

export default ArticleList;