import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase/Config';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(3);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'articles'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const articlesData = [];
      querySnapshot.forEach((doc) => {
        articlesData.push({ id: doc.id, ...doc.data() });
      });
      
      // Set the first article as featured
      if (articlesData.length > 0) {
        setFeaturedArticle(articlesData[0]);
        setArticles(articlesData.slice(1)); // Rest of the articles
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching articles:', err);
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 3);
  };

  const getReadingTime = (description) => {
    // Estimate reading time based on description length
    const wordsPerMinute = 200;
    const words = description.split(' ').length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="container mx-auto px-4">
          <Navigation />
        </header>
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <p className="text-gray-600">Loading articles...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="container mx-auto px-4">
        <Navigation />
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Featured Blog */}
        {featuredArticle && (
          <div className="relative w-full h-80 md:h-96 mb-8">
            <img 
              src={featuredArticle.thumbnail || 'https://images.pexels.com/photos/129112/pexels-photo-129112.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} 
              alt={featuredArticle.title} 
              className="w-full h-full object-cover"
              onError={(e) => e.target.src = 'https://images.pexels.com/photos/129112/pexels-photo-129112.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
              <h2 className="text-xl md:text-2xl font-medium">{featuredArticle.title}</h2>
              <p className="text-sm opacity-80">{getReadingTime(featuredArticle.description)}</p>
              <a 
                href={featuredArticle.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-2 inline-block bg-primary text-white px-4 py-1 rounded-sm text-sm hover:bg-primary/90 transition-colors"
              >
                Read More
              </a>
            </div>
          </div>
        )}
        
        <h2 className="text-gray-400 text-center uppercase mb-4">BLOGS</h2>
        <p className="text-gray-700 text-center mb-8">Here are some of the articles I've written</p>
        
        {/* Blog Grid */}
        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No articles available yet.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {articles.slice(0, displayCount).map((article) => (
                <div key={article.id} className="flex flex-col">
                  <img 
                    src={article.thumbnail || 'https://images.pexels.com/photos/7583367/pexels-photo-7583367.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} 
                    alt={article.title} 
                    className="w-full h-48 object-cover mb-4"
                    onError={(e) => e.target.src = 'https://images.pexels.com/photos/7583367/pexels-photo-7583367.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
                  />
                  <h3 className="text-gray-400 mb-2">{article.title}</h3>
                  <p className="text-gray-700 text-sm mb-4">
                    {article.description.length > 150 
                      ? `${article.description.substring(0, 150)}...` 
                      : article.description}
                  </p>
                  <a 
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto bg-primary text-white px-4 py-1 rounded-sm self-start text-sm hover:bg-primary/90 transition-colors"
                  >
                    Read More
                  </a>
                </div>
              ))}
            </div>
            
            {displayCount < articles.length && (
              <div className="flex justify-center mb-8">
                <button 
                  onClick={handleLoadMore}
                  className="bg-primary text-white px-6 py-2 rounded-sm hover:bg-primary/90 transition-colors"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;