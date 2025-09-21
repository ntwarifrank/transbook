"use client"
import React, { useState, useEffect } from 'react';
import { Search, Calendar, Clock, User, ArrowRight, Filter, ChevronDown, Heart, Share2, Bookmark } from 'lucide-react';
import Navigation from '../../components/navigation';
import Footer from '../../components/footer';


const AdvancedBlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set());

  const categories = ['All', 'AI & Technology', 'Translation', 'Business', 'Industry News', 'Tutorials'];
  
  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI-Powered Translation: Breaking Language Barriers",
      excerpt: "Discover how artificial intelligence is revolutionizing the translation industry and what this means for global communication.",
      category: "AI & Technology",
      author: "Dr. Sarah Chen",
      date: "2025-09-15",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      featured: true,
      likes: 324,
      comments: 28
    },
    {
      id: 2,
      title: "Best Practices for Professional Document Translation",
      excerpt: "Learn the essential techniques and considerations for achieving high-quality professional translations.",
      category: "Translation",
      author: "Michael Rodriguez",
      date: "2025-09-12",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
      featured: false,
      likes: 189,
      comments: 15
    },
    {
      id: 3,
      title: "Global Business Expansion: The Role of Localization",
      excerpt: "How proper localization strategies can make or break your international business ventures.",
      category: "Business",
      author: "Emma Thompson",
      date: "2025-09-10",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
      featured: false,
      likes: 256,
      comments: 32
    },
    {
      id: 4,
      title: "Machine Translation vs Human Translation: Finding the Balance",
      excerpt: "An in-depth comparison of machine and human translation, and when to use each approach.",
      category: "Industry News",
      author: "James Park",
      date: "2025-09-08",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
      featured: true,
      likes: 412,
      comments: 67
    },
    {
      id: 5,
      title: "Step-by-Step Guide to Document Preparation for Translation",
      excerpt: "Optimize your documents for translation with this comprehensive preparation guide.",
      category: "Tutorials",
      author: "Lisa Wang",
      date: "2025-09-05",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
      featured: false,
      likes: 178,
      comments: 21
    },
    {
      id: 6,
      title: "The Impact of Cultural Context in Translation Work",
      excerpt: "Understanding why cultural awareness is just as important as linguistic accuracy in professional translation.",
      category: "Translation",
      author: "Ahmed Hassan",
      date: "2025-09-02",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?w=800&h=400&fit=crop",
      featured: false,
      likes: 298,
      comments: 43
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const toggleLike = (postId) => {
    setLikedPosts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(postId)) {
        newLiked.delete(postId);
      } else {
        newLiked.add(postId);
      }
      return newLiked;
    });
  };

  const toggleBookmark = (postId) => {
    setBookmarkedPosts(prev => {
      const newBookmarked = new Set(prev);
      if (newBookmarked.has(postId)) {
        newBookmarked.delete(postId);
      } else {
        newBookmarked.add(postId);
      }
      return newBookmarked;
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navigation />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Insights & Innovation Hub
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Discover the latest trends, expert insights, and breakthrough innovations in AI-powered translation and global communication
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search articles, topics, or authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-900 bg-white/95 backdrop-blur-sm border-0 focus:ring-4 focus:ring-white/20 transition-all duration-300 text-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Filter Section */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-4 bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="font-semibold text-gray-700">Filter by:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full transition-all duration-300 font-medium ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'bg-white/50 text-gray-700 hover:bg-white/80 hover:shadow-md'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Article */}
        {featuredPost && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
              Featured Article
            </h2>
            
            <div className="group relative bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-semibold mb-6 w-fit">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    {featuredPost.category}
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(featuredPost.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <button className="group flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105">
                      Read Full Article
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </button>
                    
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleLike(featuredPost.id)}
                        className={`p-3 rounded-full transition-all duration-300 ${
                          likedPosts.has(featuredPost.id)
                            ? 'bg-red-100 text-red-500'
                            : 'bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-400'
                        }`}
                      >
                        <Heart className={`h-5 w-5 ${likedPosts.has(featuredPost.id) ? 'fill-current' : ''}`} />
                      </button>
                      
                      <button
                        onClick={() => toggleBookmark(featuredPost.id)}
                        className={`p-3 rounded-full transition-all duration-300 ${
                          bookmarkedPosts.has(featuredPost.id)
                            ? 'bg-blue-100 text-blue-500'
                            : 'bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-blue-400'
                        }`}
                      >
                        <Bookmark className={`h-5 w-5 ${bookmarkedPosts.has(featuredPost.id) ? 'fill-current' : ''}`} />
                      </button>
                      
                      <button className="p-3 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all duration-300">
                        <Share2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Articles Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full"></div>
            Latest Articles
          </h2>
          
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <div key={post.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      {formatDate(post.date)}
                    </span>
                    
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Heart className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </div>
                      
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`p-2 rounded-full transition-all duration-300 ${
                          likedPosts.has(post.id)
                            ? 'bg-red-100 text-red-500'
                            : 'bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-400'
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                      </button>
                      
                      <button
                        onClick={() => toggleBookmark(post.id)}
                        className={`p-2 rounded-full transition-all duration-300 ${
                          bookmarkedPosts.has(post.id)
                            ? 'bg-blue-100 text-blue-500'
                            : 'bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-blue-400'
                        }`}
                      >
                        <Bookmark className={`h-4 w-4 ${bookmarkedPosts.has(post.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Stay Updated with Our Newsletter</h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Get the latest insights, industry news, and expert tips delivered directly to your inbox. Join thousands of professionals already subscribed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 bg-white/95 backdrop-blur-sm border-0 focus:ring-4 focus:ring-white/20 transition-all duration-300"
            />
            <button className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdvancedBlogPage;