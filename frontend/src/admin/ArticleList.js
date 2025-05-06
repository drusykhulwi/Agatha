import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Menu } from 'lucide-react';

function ArticleList() {
 const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  // Sample article data - in a real app, this would come from an API
  const [articles, setArticles] = useState([
    { 
      id: 1, 
      title: 'Getting Started with React', 
      datePosted: '2025-05-01', 
      views: 1250 
    },
    { 
      id: 2, 
      title: 'Tailwind CSS Tips and Tricks', 
      datePosted: '2025-04-28', 
      views: 986 
    },
    { 
      id: 3, 
      title: 'Building Responsive Layouts', 
      datePosted: '2025-04-15', 
      views: 2430 
    },
  ]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      setArticles(articles.filter(article => article.id !== id));
    }
  };

  return (
    <div className="w-full flex h-screen bg-gray-50">
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

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
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
                    <div className="text-sm font-medium text-gray-900">{article.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{article.datePosted}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{article.views.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                        <Link 
                        to={`/edit-article/${article.id}`} 
                        className="text-primary hover:text-red-700 transition-colors duration-300"
                        >
                        Edit
                        </Link>
                        <button
                        onClick={() => handleDelete(article.id)}
                        className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
                        >
                        Delete
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
}

export default ArticleList;