import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase/Config';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Calendar, Eye, ArrowLeft } from 'lucide-react';

const ArticleView = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, 'articles', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setArticle({ id: docSnap.id, ...docSnap.data() });
        
        // Increment view count
        await updateDoc(docRef, {
          views: increment(1)
        });
      } else {
        setError('Article not found');
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching article:', err);
      setError('Failed to load article');
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown date';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const formatContent = (content) => {
    // Split by double line breaks to create paragraphs
    return content.split(/\n\n+/).map((paragraph, index) => (
      <p key={index} className="mb-4 text-gray-700 leading-relaxed">
        {paragraph.trim()}
      </p>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <header className="container mx-auto px-4">
          <Navigation />
        </header>
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <p className="text-gray-600">Loading article...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <header className="container mx-auto px-4">
          <Navigation />
        </header>
        <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
          <p className="text-red-600 mb-4">{error || 'Article not found'}</p>
          <Link 
            to="/blog" 
            className="text-primary hover:text-secondary flex items-center"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Blog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="container mx-auto px-4">
        <Navigation />
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            to="/blogs" 
            className="text-primary hover:text-secondary flex items-center text-sm"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Blog
          </Link>
        </div>

        {/* Article Container */}
        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Featured Image */}
          <div className="w-full h-64 md:h-96 overflow-hidden">
            <img 
              src={article.thumbnail || 'https://images.pexels.com/photos/129112/pexels-photo-129112.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} 
              alt={article.title}
              className="w-full h-full object-cover"
              onError={(e) => e.target.src = 'https://images.pexels.com/photos/129112/pexels-photo-129112.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
            />
          </div>

          {/* Article Content */}
          <div className="p-6 md:p-12">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>{formatDate(article.createdAt)}</span>
              </div>
              <div className="flex items-center">
                <Eye size={16} className="mr-2" />
                <span>{(article.views || 0).toLocaleString()} views</span>
              </div>
              <div>
                <span>{getReadingTime(article.content)}</span>
              </div>
            </div>

            {/* Article Description */}
            <div className="mb-8">
              <p className="text-lg text-gray-600 italic">
                {article.description}
              </p>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              {formatContent(article.content)}
            </div>

            {/* Share Section (Optional - you can enhance this later) */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                Thank you for reading!
              </p>
            </div>
          </div>
        </article>

        {/* Related Articles Section (Optional - you can add this later) */}
        <div className="max-w-4xl mx-auto mt-12">
          <Link 
            to="/blogs"
            className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-secondary transition-colors"
          >
            Read More Articles
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticleView;