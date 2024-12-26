// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Your Home component
import Blog from './pages/Blog'; // Your Blog component
import Podcast from './pages/Podcasts'; // Your Podcast component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} className="route-name"/>
                <Route path="/Blog" element={<Blog />} className="route-name"/>
                <Route path="/Podcast" element={<Podcast className="route-name"/>} />
            </Routes>
        </Router>
    );
}

export default App;
