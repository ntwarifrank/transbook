"use client"
import React, { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  MessageSquare, 
  Mail, 
  Phone, 
  Clock, 
  ChevronRight, 
  Star,
  PlayCircle,
  FileText,
  Settings,
  Headphones,
  Globe,
  Zap,
  ArrowRight,
  ChevronDown,
  ExternalLink,
  HelpCircle,
  Users,
  Shield,
  CreditCard
} from 'lucide-react';
import Navigation from '../../../components/navigation';
import Footer from '../../../components/footer';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const categories = [
    { id: 'all', name: 'All Topics', icon: <BookOpen className="w-5 h-5" />, count: 47 },
    { id: 'getting-started', name: 'Getting Started', icon: <PlayCircle className="w-5 h-5" />, count: 8 },
    { id: 'tools', name: 'Tools & Features', icon: <Zap className="w-5 h-5" />, count: 12 },
    { id: 'account', name: 'Account & Billing', icon: <CreditCard className="w-5 h-5" />, count: 9 },
    { id: 'technical', name: 'Technical Support', icon: <Settings className="w-5 h-5" />, count: 10 },
    { id: 'api', name: 'API & Integration', icon: <FileText className="w-5 h-5" />, count: 8 }
  ];

  const popularArticles = [
    {
      title: 'How to get started with AI Dubbing',
      category: 'Getting Started',
      readTime: '5 min read',
      views: '2.1k views',
      rating: 4.8,
      description: 'Learn the basics of creating your first AI-dubbed video with our step-by-step guide.'
    },
    {
      title: 'Voice Cloning Best Practices',
      category: 'Tools & Features',
      readTime: '8 min read',
      views: '1.8k views',
      rating: 4.9,
      description: 'Discover how to create high-quality voice clones with optimal audio samples and settings.'
    },
    {
      title: 'Supported File Formats and Limits',
      category: 'Technical Support',
      readTime: '3 min read',
      views: '1.5k views',
      rating: 4.7,
      description: 'Complete list of supported audio and video formats, along with upload limits and recommendations.'
    },
    {
      title: 'API Authentication Guide',
      category: 'API & Integration',
      readTime: '6 min read',
      views: '942 views',
      rating: 4.6,
      description: 'Step-by-step instructions for setting up API keys and authenticating requests.'
    }
  ];

  const faqs = [
    {
      question: 'What file formats are supported for upload?',
      answer: 'Lexivana supports a wide range of audio and video formats including MP4, AVI, MOV, MP3, WAV, FLAC, and more. The maximum file size is 2GB for video files and 500MB for audio files.',
      category: 'technical'
    },
    {
      question: 'How accurate is the AI translation?',
      answer: 'Our AI translation achieves 95%+ accuracy for major languages like English, Spanish, French, German, and Mandarin. Accuracy may vary for less common languages or highly technical content.',
      category: 'tools'
    },
    {
      question: 'Can I cancel my subscription at any time?',
      answer: 'Yes, you can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing cycle.',
      category: 'account'
    },
    {
      question: 'How long does it take to process a video?',
      answer: 'Processing time depends on video length and complexity. Most videos under 10 minutes are processed within 5-15 minutes. Longer videos may take up to 1 hour.',
      category: 'tools'
    },
    {
      question: 'Is my data secure and private?',
      answer: 'Absolutely. We use enterprise-grade encryption and comply with GDPR, CCPA, and SOC 2 standards. Your content is automatically deleted after 30 days unless you choose to save it.',
      category: 'account'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 14-day money-back guarantee for all paid plans. If you\'re not satisfied within the first 14 days, contact our support team for a full refund.',
      category: 'account'
    }
  ];

  const tutorials = [
    {
      title: 'Creating Your First AI Dub',
      duration: '12:34',
      difficulty: 'Beginner',
      thumbnail: '/api/placeholder/300/180'
    },
    {
      title: 'Advanced Voice Cloning Techniques',
      duration: '18:45',
      difficulty: 'Advanced',
      thumbnail: '/api/placeholder/300/180'
    },
    {
      title: 'Using the API for Bulk Processing',
      duration: '15:22',
      difficulty: 'Intermediate',
      thumbnail: '/api/placeholder/300/180'
    }
  ];

  const contactOptions = [
    {
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: <MessageSquare className="w-6 h-6" />,
      status: 'Available now',
      statusColor: 'text-green-600',
      action: 'Start Chat',
      actionColor: 'bg-green-600 hover:bg-green-700'
    },
    {
      title: 'Email Support',
      description: 'Send us a detailed message',
      icon: <Mail className="w-6 h-6" />,
      status: 'Response within 4 hours',
      statusColor: 'text-blue-600',
      action: 'Send Email',
      actionColor: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: 'Phone Support',
      description: 'Call our technical experts',
      icon: <Phone className="w-6 h-6" />,
      status: 'Mon-Fri, 9AM-6PM PST',
      statusColor: 'text-orange-600',
      action: 'Call Now',
      actionColor: 'bg-orange-600 hover:bg-orange-700'
    }
  ];

  const filteredArticles = selectedCategory === 'all' 
    ? popularArticles 
    : popularArticles.filter(article => 
        article.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );

  const filteredFaqs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <Navigation />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">How can we help you?</h1>
            <p className="text-xl opacity-90 mb-8">
              Search our knowledge base or get in touch with our support team
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for help articles, tutorials, FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-white/20 shadow-lg"
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {['AI Dubbing', 'Voice Cloning', 'API Integration', 'Billing', 'File Formats'].map((tag) => (
                <button
                  key={tag}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Browse by Category</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className={selectedCategory === category.id ? 'text-blue-600' : 'text-gray-400'}>
                        {category.icon}
                      </span>
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{category.count}</span>
                  </button>
                ))}
              </div>

              {/* Quick Contact */}
              <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                <h4 className="font-semibold text-gray-900 mb-2">Need immediate help?</h4>
                <p className="text-sm text-gray-600 mb-3">Our support team is here for you</p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Start Live Chat</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Popular Articles */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Popular Articles</h2>
                <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1">
                  <span>View all</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="grid gap-6">
                {filteredArticles.map((article, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium">
                            {article.category}
                          </span>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{article.readTime}</span>
                            </span>
                            <span>{article.views}</span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 fill-current text-yellow-400" />
                              <span>{article.rating}</span>
                            </div>
                          </div>
                        </div>
                        
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{article.description}</p>
                        
                        <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1">
                          <span>Read article</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Video Tutorials */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Video Tutorials</h2>
                <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1">
                  <span>View all</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {tutorials.map((tutorial, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="relative mb-4">
                      <img 
                        src={tutorial.thumbnail} 
                        alt={tutorial.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <PlayCircle className="w-12 h-12 text-white" />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                        {tutorial.duration}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 rounded-md text-xs font-medium ${getDifficultyColor(tutorial.difficulty)}`}>
                        {tutorial.difficulty}
                      </span>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {tutorial.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${
                        expandedFaq === index ? 'rotate-180' : ''
                      }`} />
                    </button>
                    
                    {expandedFaq === index && (
                      <div className="px-4 pb-4">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Still Need Help?</h2>
              <p className="text-gray-600 mb-6">
                Can't find what you're looking for? Our support team is ready to help you with any questions.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                {contactOptions.map((option, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {option.icon}
                      </div>
                      <h3 className="font-semibold text-gray-900">{option.title}</h3>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{option.description}</p>
                    <p className={`text-sm ${option.statusColor} mb-4`}>{option.status}</p>
                    
                    <button className={`w-full text-white py-2 px-4 rounded-lg font-medium transition-colors ${option.actionColor}`}>
                      {option.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-xl opacity-90 mb-8">
              Connect with other Lexivana users and get tips, tricks, and updates
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Join Discord</span>
              </button>
              
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>Community Forum</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HelpCenter;