import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/Config';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

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
      
      if (articlesData.length > 0) {
        setFeaturedArticle(articlesData[0]);
        setArticles(articlesData.slice(1));
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching articles:', err);
      setLoading(false);
    }
  };

  const getReadingTime = (content) => {
    if (!content) return '1 min read';
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  // Pagination logic
  const totalPages = Math.ceil(articles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArticles = articles.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
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
        {featuredArticle && (
          <div className="relative w-full h-80 md:h-96 mb-8 rounded-lg overflow-hidden">
            <img 
              src={featuredArticle.thumbnail || 'https://images.pexels.com/photos/129112/pexels-photo-129112.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} 
              alt={featuredArticle.title} 
              className="w-full h-full object-cover"
              onError={(e) => e.target.src = 'https://images.pexels.com/photos/129112/pexels-photo-129112.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
              <h2 className="text-xl md:text-2xl font-medium">{featuredArticle.title}</h2>
              <p className="text-sm opacity-80">{getReadingTime(featuredArticle.content)}</p>
              <Link 
                to={`/article/${featuredArticle.id}`}
                className="mt-2 inline-block bg-primary text-white px-4 py-1 rounded-sm text-sm hover:bg-primary/90 transition-colors"
              >
                Read More
              </Link>
            </div>
          </div>
        )}
        
        <h2 className="text-gray-400 text-center uppercase mb-4">BLOGS</h2>
        <p className="text-gray-700 text-center mb-8">Here are some of the articles I've written</p>
        
        {articles.length === 0 && !featuredArticle ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No articles available yet.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {currentArticles.map((article) => (
                <div key={article.id} className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src={article.thumbnail || 'https://images.pexels.com/photos/7583367/pexels-photo-7583367.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} 
                    alt={article.title} 
                    className="w-full h-48 object-cover"
                    onError={(e) => e.target.src = 'https://images.pexels.com/photos/7583367/pexels-photo-7583367.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
                  />
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-gray-800 font-semibold mb-2">{article.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 flex-grow">
                      {article.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">{getReadingTime(article.content)}</span>
                      <Link 
                        to={`/article/${article.id}`}
                        className="bg-primary text-white px-4 py-1 rounded-sm text-sm hover:bg-primary/90 transition-colors"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mb-8">
                <button
                  onClick={goToPrevious}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={18} />
                </button>
                
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-4 py-2 rounded-md ${
                          currentPage === page
                            ? 'bg-primary text-white'
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return <span key={page} className="px-2">...</span>;
                  }
                  return null;
                })}
                
                <button
                  onClick={goToNext}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={18} />
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