import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Home';
import Blogs from './pages/Blog';
import Podcasts from './pages/PodcastPage';
import PodcastAudioPage from './components/PodcastAudioPage';
import PodcastVideoPage from './components/PodcastVideoPage';
import Dashboard from './admin/Dashboard';
import ArticleList from './admin/ArticleList';
import AddEditArticle from './admin/AddEditArticle';
import PodcastList from './admin/PodcastList';
import AddPodcast from './admin/AddPodcast';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/podcasts" element={<Podcasts />} />
        <Route path="/podcast-audio/:id" element={<PodcastAudioPage />} />
        <Route path="/podcast-video/:id" element={<PodcastVideoPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/add-article" element={<AddEditArticle />} />
        <Route path="/edit-article/:id" element={<AddEditArticle />} />
        <Route path="/podcastlist" element={<PodcastList />} />
        <Route path="/add-podcast" element={<AddPodcast />} />
        <Route path="/edit-podcast/:id" element={<AddPodcast />} />
      </Routes>
    </Router>
  );
}

export default App;