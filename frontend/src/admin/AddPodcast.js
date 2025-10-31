import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, X, Upload, Clock, Menu } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { db, storage } from '../firebase/Config'; // Import storage directly from Config
import { collection, doc, getDoc, addDoc, updateDoc, serverTimestamp, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const AddPodcast = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    // If in edit mode, fetch the podcast data from Firestore
    const fetchPodcast = async () => {
      if (isEditMode) {
        try {
          const docRef = doc(db, 'podcasts', id);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const podcastData = docSnap.data();
            setFormData({
              title: podcastData.title,
              type: podcastData.type,
              podcaster: podcastData.podcaster,
              thumbnailPreview: podcastData.thumbnailUrl,
              duration: podcastData.duration,
              // Store existing file URLs for reference
              audioFile: podcastData.type === 'audio' ? podcastData.fileUrl : null,
              videoFile: podcastData.type === 'video' ? podcastData.fileUrl : null
            });
          } else {
            console.error("No such podcast!");
            navigate('/podcastlist');
          }
        } catch (error) {
          console.error("Error fetching podcast:", error);
        }
      }
    };

    fetchPodcast();
  }, [isEditMode, id, navigate]);

  // Get the next index for a new podcast
  const getNextIndex = async () => {
    try {
      const q = query(collection(db, 'podcasts'), orderBy('index', 'desc'), limit(1));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return 1; // Start with 1 if no documents exist
      }
      
      return querySnapshot.docs[0].data().index + 1;
    } catch (error) {
      console.error("Error getting next index:", error);
      return Date.now(); // Fallback to timestamp as index
    }
  };

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

  // Upload file to Firebase Storage with better error handling
  const uploadFile = async (file, path) => {
    if (!file || typeof file === 'string') return file; // Return the URL if it's already a string
    
    try {
      setUploadStatus(`Uploading ${path}...`);
      
      // Create a storage reference with a unique name
      const storageRef = ref(storage, `${path}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`);
      
      // Upload the file
      const uploadTask = await uploadBytes(storageRef, file);
      
      // Get the download URL
      const downloadURL = await getDownloadURL(uploadTask.ref);
      
      setUploadStatus(`${path} uploaded successfully!`);
      setUploadProgress(100);
      
      return downloadURL;
    } catch (error) {
      console.error(`Error uploading ${path}:`, error);
      setUploadStatus(`Error uploading ${path}: ${error.message}`);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validate()) {
      try {
        setIsSubmitting(true);
        setUploadProgress(0);
        
        // Upload thumbnail if it's a file
        let thumbnailUrl = formData.thumbnailPreview;
        if (formData.thumbnailImage && !(typeof formData.thumbnailImage === 'string')) {
          setUploadStatus('Uploading thumbnail...');
          thumbnailUrl = await uploadFile(formData.thumbnailImage, 'thumbnails');
          setUploadProgress(50);
        }
        
        // Upload audio/video file if it's a file
        let fileUrl;
        if (formData.type === 'audio') {
          fileUrl = typeof formData.audioFile === 'string' 
            ? formData.audioFile 
            : await uploadFile(formData.audioFile, 'audio');
        } else {
          fileUrl = typeof formData.videoFile === 'string' 
            ? formData.videoFile 
            : await uploadFile(formData.videoFile, 'video');
        }
        
        setUploadProgress(75);
        setUploadStatus('Saving podcast data...');
        
        // Prepare data for Firestore
        const podcastData = {
          title: formData.title,
          type: formData.type,
          podcaster: formData.podcaster,
          duration: formData.duration,
          thumbnailUrl,
          fileUrl,
          views: isEditMode ? undefined : 0, // Only set views for new podcasts
          datePosted: isEditMode ? undefined : serverTimestamp() // Only set date for new podcasts
        };
        
        if (!isEditMode) {
          // Add new podcast with incremental index
          const nextIndex = await getNextIndex();
          podcastData.index = nextIndex;
          
          await addDoc(collection(db, 'podcasts'), podcastData);
          setUploadStatus('Podcast added successfully!');
          alert('Podcast added successfully!');
        } else {
          // Update existing podcast
          const podcastRef = doc(db, 'podcasts', id);
          await updateDoc(podcastRef, podcastData);
          setUploadStatus('Podcast updated successfully!');
          alert('Podcast updated successfully!');
        }
        
        setUploadProgress(100);
        navigate('/podcastlist');
      } catch (error) {
        console.error('Error saving podcast:', error);
        setUploadStatus(`Error: ${error.message}`);
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

        {/* Upload Status */}
        {isSubmitting && (
          <div className="mb-6 bg-white p-4 rounded-md shadow">
            <div className="mb-2 flex justify-between">
              <span className="text-sm font-medium">{uploadStatus}</span>
              <span className="text-sm font-medium">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-primary h-2.5 rounded-full" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

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
                    disabled={isSubmitting}
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
                  <label className={`flex flex-col items-center px-4 py-2 bg-white text-primary rounded-md tracking-wide border border-primary cursor-pointer hover:bg-primary hover:text-white transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <Upload size={18} />
                    <span className="mt-2 text-sm">
                      {formData.thumbnailImage && typeof formData.thumbnailImage !== 'string' ? formData.thumbnailImage.name : 'Select Image'}
                    </span>
                    <input
                      type="file"
                      id="thumbnailImage"
                      name="thumbnailImage"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      disabled={isSubmitting}
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
                  <label className={`flex flex-col items-center px-4 py-2 bg-white text-secondary rounded-md tracking-wide border border-secondary cursor-pointer hover:bg-secondary hover:text-white transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <Upload size={18} />
                    <span className="mt-2 text-sm">
                      {formData.audioFile ? (typeof formData.audioFile === 'string' ? 'Current audio file' : formData.audioFile.name) : 'Select Audio'}
                    </span>
                    <input
                      type="file"
                      id="audioFile"
                      name="audioFile"
                      accept="audio/*"
                      onChange={handleFileChange}
                      className="hidden"
                      disabled={isSubmitting}
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
                  <label className={`flex flex-col items-center px-4 py-2 bg-white text-secondary rounded-md tracking-wide border border-secondary cursor-pointer hover:bg-secondary hover:text-white transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <Upload size={18} />
                    <span className="mt-2 text-sm">
                      {formData.videoFile ? (typeof formData.videoFile === 'string' ? 'Current video file' : formData.videoFile.name) : 'Select Video'}
                    </span>
                    <input
                      type="file"
                      id="videoFile"
                      name="videoFile"
                      accept="video/*"
                      onChange={handleFileChange}
                      className="hidden"
                      disabled={isSubmitting}
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