import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Menu } from 'lucide-react';

function AddEditArticle() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  
  const [formData, setFormData] = useState({
    title: '',
    thumbnail: '',
    description: '',
    link: ''
  });

  useEffect(() => {
    if (isEditMode) {
      // In a real app, you would fetch the article data from an API
      // This is just mock data for demonstration
      if (id === '1') {
        setFormData({
          title: 'Getting Started with React',
          thumbnail: 'https://placeholder.com/react-thumbnail.jpg',
          description: 'A beginner-friendly guide to React development.',
          link: 'https://example.com/react-guide'
        });
      } else if (id === '2') {
        setFormData({
          title: 'Tailwind CSS Tips and Tricks',
          thumbnail: 'https://placeholder.com/tailwind-thumbnail.jpg',
          description: 'Learn advanced techniques in Tailwind CSS.',
          link: 'https://example.com/tailwind-tips'
        });
      } else if (id === '3') {
        setFormData({
          title: 'Building Responsive Layouts',
          thumbnail: 'https://placeholder.com/layouts-thumbnail.jpg',
          description: 'Create stunning responsive layouts for modern web applications.',
          link: 'https://example.com/responsive-layouts'
        });
      }
    }
  }, [isEditMode, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would submit the form data to an API
    console.log('Form submitted:', formData);
    alert(`Article ${isEditMode ? 'updated' : 'added'} successfully!`);
    navigate('/articles');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would handle file uploads properly
      // This is just a simple demonstration
      setFormData(prev => ({
        ...prev,
        thumbnail: URL.createObjectURL(file)
      }));
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

      {/* Main content */}
      <div className="flex-1 overflow-auto p-8 lg:ml-30">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-primary">
            {isEditMode ? 'Edit Article' : 'Add New Article'}
            </h1>
            <Link 
            to="/articles" 
            className="bg-primary hover:bg-gray-400 text-white py-2 px-4 rounded-md transition-colors duration-300"
            >
            Cancel
            </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit}>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Article Title
                </label>
                <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                />
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="thumbnail">
                Thumbnail Image
                </label>
                <input
                type="file"
                id="thumbnail"
                name="thumbnail"
                accept="image/*"
                onChange={handleFileChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {formData.thumbnail && (
                <div className="mt-2">
                    <p className="text-sm text-gray-500">Current thumbnail:</p>
                    <div className="mt-1 h-32 w-32 bg-gray-100 rounded-md overflow-hidden">
                    <img 
                        src={formData.thumbnail} 
                        alt="Thumbnail preview" 
                        className="h-full w-full object-cover"
                        onError={(e) => e.target.src = '/api/placeholder/100/100'}
                    />
                    </div>
                </div>
                )}
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Brief Description
                </label>
                <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                ></textarea>
            </div>

            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="link">
                Blog Link
                </label>
                <input
                type="url"
                id="link"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                />
            </div>

            <div className="flex justify-end">
                <button
                type="submit"
                className="bg-secondary hover:bg-blue-600 text-white py-2 px-6 rounded-md transition-colors duration-300"
                >
                {isEditMode ? 'Update Article' : 'Save Article'}
                </button>
            </div>
            </form>
        </div>
      </div>
    </div>
  );
}

export default AddEditArticle;

