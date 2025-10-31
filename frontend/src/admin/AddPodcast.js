import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, X, Menu } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { db } from '../firebase/Config';
import { collection, doc, getDoc, addDoc, updateDoc, serverTimestamp, getDocs, query, orderBy, limit } from 'firebase/firestore';

const AddPodcast = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const initialFormState = {
    title: '',
    type: 'audio',
    podcaster: '',
    thumbnailUrl: '',
    duration: '',
    fileUrl: ''
  };
  
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (isEditMode) {
      fetchPodcast();
    }
  }, [isEditMode, id]);

  const fetchPodcast = async () => {
    try {
      const docRef = doc(db, 'podcasts', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const podcastData = docSnap.data();
        setFormData({
          title: podcastData.title,
          type: podcastData.type,
          podcaster: podcastData.podcaster,
          thumbnailUrl: podcastData.thumbnailUrl,
          duration: podcastData.duration,
          fileUrl: podcastData.fileUrl
        });
      } else {
        alert('Podcast not found!');
        navigate('/podcastlist');
      }
    } catch (error) {
      console.error("Error fetching podcast:", error);
      alert('Failed to fetch podcast data');
    }
  };

  const getNextIndex = async () => {
    try {
      const q = query(collection(db, 'podcasts'), orderBy('index', 'desc'), limit(1));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return 1;
      }
      
      return querySnapshot.docs[0].data().index + 1;
    } catch (error) {
      console.error("Error getting next index:", error);
      return Date.now();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.podcaster.trim()) {
      newErrors.podcaster = 'Podcaster name is required';
    }
    
    if (!formData.duration.trim()) {
      newErrors.duration = 'Duration is required (format: HH:MM:SS or MM:SS)';
    }
    
    if (!formData.thumbnailUrl.trim()) {
      newErrors.thumbnailUrl = 'Thumbnail URL is required';
    } else {
      try {
        new URL(formData.thumbnailUrl);
      } catch {
        newErrors.thumbnailUrl = 'Please enter a valid URL';
      }
    }
    
    if (!formData.fileUrl.trim()) {
      newErrors.fileUrl = `${formData.type === 'audio' ? 'Audio' : 'Video'} file URL is required`;
    } else {
      try {
        new URL(formData.fileUrl);
      } catch {
        newErrors.fileUrl = 'Please enter a valid URL';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validate()) {
      try {
        setIsSubmitting(true);
        
        const podcastData = {
          title: formData.title,
          type: formData.type,
          podcaster: formData.podcaster,
          duration: formData.duration,
          thumbnailUrl: formData.thumbnailUrl,
          fileUrl: formData.fileUrl,
          updatedAt: serverTimestamp()
        };
        
        if (!isEditMode) {
          const nextIndex = await getNextIndex();
          podcastData.index = nextIndex;
          podcastData.views = 0;
          podcastData.createdAt = serverTimestamp();
          
          await addDoc(collection(db, 'podcasts'), podcastData);
          alert('Podcast added successfully!');
        } else {
          const podcastRef = doc(db, 'podcasts', id);
          await updateDoc(podcastRef, podcastData);
          alert('Podcast updated successfully!');
        }
        
        navigate('/podcastlist');
      } catch (error) {
        console.error('Error saving podcast:', error);
        alert(`Error: ${error.message}`);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleCancel = () => {
    navigate('/podcastlist');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="lg:hidden fixed top-4 left-4 z-20">
        <button 
          onClick={toggleMobileMenu}
          className="p-2 rounded-md bg-primary text-white hover:bg-primary/90"
        >
          <Menu size={24} />
        </button>
      </div>

      <Sidebar isMobileMenuOpen={isMobileMenuOpen} closeMobileMenu={() => setIsMobileMenuOpen(false)} />

      <div className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">
            {isEditMode ? 'Edit Podcast' : 'Add New Podcast'}
          </h1>
          <div className="flex space-x-4">
            <button 
              onClick={handleCancel}
              className="flex items-center px-4 py-2 border bg-secondary border-gray-300 text-white rounded-md hover:bg-primary transition-all"
              disabled={isSubmitting}
            >
              <X size={18} className="mr-2" />
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary transition-all"
              disabled={isSubmitting}
            >
              <Save size={18} className="mr-2" />
              {isSubmitting ? 'Saving...' : isEditMode ? 'Update' : 'Save'} Podcast
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Podcast Title*
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary focus:ring-opacity-50 ${errors.title ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter podcast title"
                  disabled={isSubmitting}
                />
                {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
              </div>

              {/* Type */}
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Type*
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-primary focus:ring-opacity-50"
                  disabled={isSubmitting}
                >
                  <option value="audio">Audio</option>
                  <option value="video">Video</option>
                </select>
              </div>

              {/* Podcaster Name */}
              <div>
                <label htmlFor="podcaster" className="block text-sm font-medium text-gray-700 mb-1">
                  Podcaster Name*
                </label>
                <input
                  type="text"
                  id="podcaster"
                  name="podcaster"
                  value={formData.podcaster}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary focus:ring-opacity-50 ${errors.podcaster ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter podcaster name"
                  disabled={isSubmitting}
                />
                {errors.podcaster && <p className="mt-1 text-sm text-red-500">{errors.podcaster}</p>}
              </div>

              {/* Duration */}
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                  Duration*
                </label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary focus:ring-opacity-50 ${errors.duration ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="45:34 or 1:23:45"
                  disabled={isSubmitting}
                />
                {errors.duration && <p className="mt-1 text-sm text-red-500">{errors.duration}</p>}
              </div>

              {/* Thumbnail URL */}
              <div>
                <label htmlFor="thumbnailUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Thumbnail Image URL*
                </label>
                <input
                  type="url"
                  id="thumbnailUrl"
                  name="thumbnailUrl"
                  value={formData.thumbnailUrl}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary focus:ring-opacity-50 ${errors.thumbnailUrl ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="https://example.com/thumbnail.jpg"
                  disabled={isSubmitting}
                />
                {errors.thumbnailUrl && <p className="mt-1 text-sm text-red-500">{errors.thumbnailUrl}</p>}
                {formData.thumbnailUrl && !errors.thumbnailUrl && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Preview:</p>
                    <img 
                      src={formData.thumbnailUrl} 
                      alt="Thumbnail preview" 
                      className="mt-1 h-16 w-16 object-cover rounded-md"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/100?text=Invalid';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Audio/Video File URL */}
              <div className="col-span-2">
                <label htmlFor="fileUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  {formData.type === 'audio' ? 'Audio' : 'Video'} File URL*
                </label>
                <input
                  type="url"
                  id="fileUrl"
                  name="fileUrl"
                  value={formData.fileUrl}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary focus:ring-opacity-50 ${errors.fileUrl ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder={`https://example.com/${formData.type === 'audio' ? 'audio.mp3' : 'video.mp4'}`}
                  disabled={isSubmitting}
                />
                {errors.fileUrl && <p className="mt-1 text-sm text-red-500">{errors.fileUrl}</p>}
                <p className="mt-1 text-xs text-gray-500">
                  Tip: You can use free hosting services like Dropbox, Google Drive (public links), or SoundCloud for audio files.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPodcast;