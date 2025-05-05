import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Home';
import Blogs from './pages/Blog';
import Podcasts from './pages/PodcastPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/podcasts" element={<Podcasts />} />
      </Routes>
    </Router>
  );
}

export default App;