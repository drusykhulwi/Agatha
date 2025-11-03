import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, addDoc, updateDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/Config';
import Sidebar from '../components/Sidebar';
import { Menu } from 'lucide-react';

function AddEditArticle() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  
  const [formData, setFormData] = useState({
    title: '',
    thumbnail: '',
    description: '',
    content: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);
  const [descriptionLength, setDescriptionLength] = useState(0);
  const MAX_DESCRIPTION_LENGTH = 200;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (isEditMode) {
      fetchArticle();
    }
  }, [isEditMode, id]);

  const fetchArticle = async () => {
    try {
      setFetchingData(true);
      const docRef = doc(db, 'articles', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setFormData({
          title: data.title || '',
          thumbnail: data.thumbnail || '',
          description: data.description || '',
          content: data.content || ''
        });
        setDescriptionLength(data.description?.length || 0);
      } else {
        alert('Article not found!');
        navigate('/articles');
      }
      setFetchingData(false);
    } catch (err) {
      console.error('Error fetching article:', err);
      alert('Failed to fetch article data');
      setFetchingData(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'description') {
      if (value.length <= MAX_DESCRIPTION_LENGTH) {
        setFormData(prev => ({ ...prev, [name]: value }));
        setDescriptionLength(value.length);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditMode) {
        const docRef = doc(db, 'articles', id);
        await updateDoc(docRef, {
          ...formData,
          updatedAt: serverTimestamp()
        });
        alert('Article updated successfully!');
      } else {
        await addDoc(collection(db, 'articles'), {
          ...formData,
          views: 0,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        alert('Article added successfully!');
      }
      navigate('/articles');
    } catch (err) {
      console.error('Error saving article:', err);
      alert('Failed to save article. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetchingData) {
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
          <p className="text-gray-600">Loading article data...</p>
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
                Article Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                placeholder="Enter article title"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="thumbnail">
                Thumbnail Image URL *
              </label>
              <input
                type="url"
                id="thumbnail"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="https://example.com/image.jpg"
                required
              />
              {formData.thumbnail && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500">Preview:</p>
                  <div className="mt-1 h-32 w-32 bg-gray-100 rounded-md overflow-hidden">
                    <img 
                      src={formData.thumbnail} 
                      alt="Thumbnail preview" 
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/100?text=Invalid+URL';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Brief Description * (Max {MAX_DESCRIPTION_LENGTH} characters)
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                placeholder="Enter a brief description that will appear on the blog listing page"
              ></textarea>
              <div className="flex justify-between mt-1">
                <p className="text-xs text-gray-500">
                  This description will appear on the blog listing page
                </p>
                <p className={`text-xs ${descriptionLength >= MAX_DESCRIPTION_LENGTH ? 'text-red-500' : 'text-gray-500'}`}>
                  {descriptionLength}/{MAX_DESCRIPTION_LENGTH}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                Full Article Content *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows="15"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-mono text-sm"
                required
                placeholder="Write your full article content here. You can use line breaks for paragraphs."
              ></textarea>
              <p className="text-xs text-gray-500 mt-1">
                Tip: Use double line breaks to create paragraphs. The content will be formatted when displayed.
              </p>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-secondary hover:bg-blue-600 text-white py-2 px-6 rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : (isEditMode ? 'Update Article' : 'Save Article')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddEditArticle;