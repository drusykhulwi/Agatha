import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Menu } from 'lucide-react';

const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
              <p className="text-3xl font-bold text-primary">13</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Total Articles</h3>
              <p className="text-3xl font-bold text-primary">13</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Total Views</h3>
              <p className="text-3xl font-bold text-primary">1,245</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
              <p className="text-3xl font-bold text-primary">42</p>
            </div>
          </div>

          {/* Recent Podcasts */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">RECENT PODCASTS</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[1, 2, 3].map((podcast) => (
                    <tr key={podcast}>
                      <td className="px-6 py-4 whitespace-nowrap">Podcast Episode {podcast}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date().toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{Math.floor(Math.random() * 100)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-secondary hover:text-secondary/80 mr-2">Edit</button>
                        <button className="text-red-600 hover:text-red-800">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Articles */}
          <div>
            <h2 className="text-xl font-bold mb-4">RECENT ARTICLES</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[1, 2, 3].map((article) => (
                    <tr key={article}>
                      <td className="px-6 py-4 whitespace-nowrap">Article {article}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date().toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{Math.floor(Math.random() * 100)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-secondary hover:text-secondary/80 mr-2">Edit</button>
                        <button className="text-red-600 hover:text-red-800">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;