import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, X, Upload, Clock,  Menu } from 'lucide-react';
import Sidebar from '../components/Sidebar';

// Sample data for edit mode demonstration
const samplePodcasts = [
  {
    id: 1,
    title: "Understanding React Hooks",
    type: "audio",
    thumbnailUrl: "/api/placeholder/100/100",
    datePosted: "2025-05-01",
    views: 1245,
    duration: "32:15",
    podcaster: "Jane Smith",
    audioFile: "react-hooks.mp3"
  },
  {
    id: 2,
    title: "Deep Dive into Tailwind CSS",
    type: "video",
    thumbnailUrl: "/api/placeholder/100/100",
    datePosted: "2025-04-28",
    views: 3678,
    duration: "45:30",
    podcaster: "John Doe",
    videoFile: "tailwind-deep-dive.mp4"
  }
];

const AddPodcast = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    };
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  
  const initialFormState = {
    title: '',
    type: 'audio', // Default to audio
    podcaster: '',
    thumbnailImage: null,
    thumbnailPreview: null,
    duration: '',
    audioFile: null,
    videoFile: null
  };
  
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // If in edit mode, fetch the podcast data
    if (isEditMode) {
      const podcastToEdit = samplePodcasts.find(p => p.id === Number(id));
      
      if (podcastToEdit) {
        setFormData({
          title: podcastToEdit.title,
          type: podcastToEdit.type,
          podcaster: podcastToEdit.podcaster,
          thumbnailPreview: podcastToEdit.thumbnailUrl,
          duration: podcastToEdit.duration,
          audioFile: podcastToEdit.audioFile || null,
          videoFile: podcastToEdit.videoFile || null
        });
      }
    }
  }, [isEditMode, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear the error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    
    if (files.length > 0) {
      if (name === 'thumbnailImage') {
        // Create a preview URL for the thumbnail
        const previewUrl = URL.createObjectURL(files[0]);
        setFormData({ 
          ...formData, 
          [name]: files[0],
          thumbnailPreview: previewUrl
        });
      } else {
        setFormData({ ...formData, [name]: files[0] });
      }
      
      // Clear the error when field is edited
      if (errors[name]) {
        setErrors({ ...errors, [name]: '' });
      }
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
      newErrors.duration = 'Duration is required';
    }
    
    if (!isEditMode && !formData.thumbnailImage) {
      newErrors.thumbnailImage = 'Thumbnail image is required';
    }
    
    if (formData.type === 'audio' && !isEditMode && !formData.audioFile) {
      newErrors.audioFile = 'Audio file is required';
    }
    
    if (formData.type === 'video' && !isEditMode && !formData.videoFile) {
      newErrors.videoFile = 'Video file is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      
      // Show success message
      alert(`Podcast ${isEditMode ? 'updated' : 'added'} successfully!`);
      
      // Navigate back to podcast list
      navigate('/podcastlist');
    }
  };

  const handleCancel = () => {
    navigate('/podcastlist');
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
          <h1 className="text-3xl font-bold text-primary">
            {isEditMode ? 'Edit Podcast' : 'Add New Podcast'}
          </h1>
          <div className="flex space-x-4">
            <button 
              onClick={handleCancel}
              className="flex items-center px-4 py-2 border bg-secondary border-gray-300 text-white rounded-md hover:bg-primary transition-all"
            >
              <X size={18} className="mr-2" />
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary transition-all"
            >
              <Save size={18} className="mr-2" />
              {isEditMode ? 'Update' : 'Save'} Podcast
            </button>
          </div>
        </div>

        {/* Form */}
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
                />
                {errors.podcaster && <p className="mt-1 text-sm text-red-500">{errors.podcaster}</p>}
              </div>

              {/* Duration */}
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                  Duration*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Clock size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className={`w-full pl-10 px-4 py-2 border rounded-md focus:ring focus:ring-primary focus:ring-opacity-50 ${errors.duration ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="HH:MM:SS"
                  />
                </div>
                {errors.duration && <p className="mt-1 text-sm text-red-500">{errors.duration}</p>}
              </div>

              {/* Thumbnail Image */}
              <div>
                <label htmlFor="thumbnailImage" className="block text-sm font-medium text-gray-700 mb-1">
                  Thumbnail Image*
                </label>
                <div className="flex items-center space-x-4">
                  {formData.thumbnailPreview && (
                    <img 
                      src={formData.thumbnailPreview} 
                      alt="Thumbnail preview" 
                      className="h-16 w-16 object-cover rounded-md"
                    />
                  )}
                  <label className="flex flex-col items-center px-4 py-2 bg-white text-primary rounded-md tracking-wide border border-primary cursor-pointer hover:bg-primary hover:text-white transition-all">
                    <Upload size={18} />
                    <span className="mt-2 text-sm">
                      {formData.thumbnailImage ? formData.thumbnailImage.name : 'Select Image'}
                    </span>
                    <input
                      type="file"
                      id="thumbnailImage"
                      name="thumbnailImage"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
                {errors.thumbnailImage && <p className="mt-1 text-sm text-red-500">{errors.thumbnailImage}</p>}
              </div>

              {/* Audio File - only visible when type is audio */}
              {formData.type === 'audio' && (
                <div>
                  <label htmlFor="audioFile" className="block text-sm font-medium text-gray-700 mb-1">
                    Audio File*
                  </label>
                  <label className="flex flex-col items-center px-4 py-2 bg-white text-secondary rounded-md tracking-wide border border-secondary cursor-pointer hover:bg-secondary hover:text-white transition-all">
                    <Upload size={18} />
                    <span className="mt-2 text-sm">
                      {formData.audioFile ? (typeof formData.audioFile === 'string' ? formData.audioFile : formData.audioFile.name) : 'Select Audio'}
                    </span>
                    <input
                      type="file"
                      id="audioFile"
                      name="audioFile"
                      accept="audio/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  {errors.audioFile && <p className="mt-1 text-sm text-red-500">{errors.audioFile}</p>}
                </div>
              )}

              {/* Video File - only visible when type is video */}
              {formData.type === 'video' && (
                <div>
                  <label htmlFor="videoFile" className="block text-sm font-medium text-gray-700 mb-1">
                    Video File*
                  </label>
                  <label className="flex flex-col items-center px-4 py-2 bg-white text-secondary rounded-md tracking-wide border border-secondary cursor-pointer hover:bg-secondary hover:text-white transition-all">
                    <Upload size={18} />
                    <span className="mt-2 text-sm">
                      {formData.videoFile ? (typeof formData.videoFile === 'string' ? formData.videoFile : formData.videoFile.name) : 'Select Video'}
                    </span>
                    <input
                      type="file"
                      id="videoFile"
                      name="videoFile"
                      accept="video/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  {errors.videoFile && <p className="mt-1 text-sm text-red-500">{errors.videoFile}</p>}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPodcast;