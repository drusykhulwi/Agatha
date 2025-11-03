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
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import ArticleView from './pages/ArticleView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/article/:id" element={<ArticleView />} />
        <Route path="/podcasts" element={<Podcasts />} />
        <Route path="/podcast-audio/:id" element={<PodcastAudioPage />} />
        <Route path="/podcast-video/:id" element={<PodcastVideoPage />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/articles" element={
          <ProtectedRoute>
            <ArticleList />
          </ProtectedRoute>
        } />
        <Route path="/add-article" element={
          <ProtectedRoute>
            <AddEditArticle />
          </ProtectedRoute>
        } />
        <Route path="/edit-article/:id" element={
          <ProtectedRoute>
            <AddEditArticle />
          </ProtectedRoute>
        } />
        <Route path="/podcastlist" element={
          <ProtectedRoute>
            <PodcastList />
          </ProtectedRoute>
        } />
        <Route path="/add-podcast" element={
          <ProtectedRoute>
            <AddPodcast />
          </ProtectedRoute>
        } />
        <Route path="/edit-podcast/:id" element={
          <ProtectedRoute>
            <AddPodcast />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;