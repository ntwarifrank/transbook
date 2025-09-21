"use client"
import React, { useState } from 'react';
import { Play, Clock, Users, ChevronRight, BookOpen, Mic, Languages, Settings, Download, Star, Filter, ExternalLink } from 'lucide-react';
import Navigation from '../../../components/navigation';
import Footer from '../../../components/footer';

const TutorialsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const categories = [
    { id: 'all', name: 'All Tutorials', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'getting-started', name: 'Getting Started', icon: <Play className="w-4 h-4" /> },
    { id: 'translation', name: 'Translation', icon: <Languages className="w-4 h-4" /> },
    { id: 'audio', name: 'Audio & Voice', icon: <Mic className="w-4 h-4" /> },
    { id: 'advanced', name: 'Advanced Features', icon: <Settings className="w-4 h-4" /> }
  ];

  const tutorials = [
    {
      id: 1,
      title: 'Your First Book Translation',
      description: 'Learn how to upload and translate your first book in under 10 minutes',
      category: 'getting-started',
      level: 'beginner',
      duration: '8 min',
      views: '15.2k',
      rating: 4.9,
      thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=225&fit=crop',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      tags: ['basics', 'upload', 'translation']
    },
    {
      id: 2,
      title: 'Choosing the Right Translation Settings',
      description: 'Master translation quality settings for different types of content',
      category: 'translation',
      level: 'intermediate',
      duration: '12 min',
      views: '8.7k',
      rating: 4.8,
      thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=225&fit=crop',
      videoUrl: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
      tags: ['settings', 'quality', 'optimization']
    },
    {
      id: 3,
      title: 'Creating Custom Voice Clones',
      description: 'Step-by-step guide to cloning voices for audiobook narration',
      category: 'audio',
      level: 'advanced',
      duration: '18 min',
      views: '12.4k',
      rating: 4.7,
      thumbnail: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=225&fit=crop',
      videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
      tags: ['voice-cloning', 'audio', 'narration']
    },
    {
      id: 4,
      title: 'Multi-Language Publishing Workflow',
      description: 'Efficient workflow for publishing books in multiple languages',
      category: 'advanced',
      level: 'expert',
      duration: '25 min',
      views: '5.3k',
      rating: 4.9,
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop',
      videoUrl: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
      tags: ['workflow', 'publishing', 'multi-language']
    },
    {
      id: 5,
      title: 'Handling Technical Documentation',
      description: 'Best practices for translating technical manuals and documentation',
      category: 'translation',
      level: 'intermediate',
      duration: '14 min',
      views: '6.8k',
      rating: 4.6,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
      videoUrl: 'https://www.youtube.com/watch?v=Sagg08DrO5U',
      tags: ['technical', 'documentation', 'terminology']
    },
    {
      id: 6,
      title: 'Audio Quality Optimization',
      description: 'Tips and tricks for perfect audio output quality',
      category: 'audio',
      level: 'intermediate',
      duration: '16 min',
      views: '9.1k',
      rating: 4.8,
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop',
      videoUrl: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
      tags: ['audio-quality', 'optimization', 'export']
    },
    {
      id: 7,
      title: 'AI Translation Quality Control',
      description: 'Learn how to review and improve AI-generated translations',
      category: 'translation',
      level: 'intermediate',
      duration: '11 min',
      views: '7.3k',
      rating: 4.7,
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop',
      videoUrl: 'https://www.youtube.com/watch?v=lTTajzrSkCw',
      tags: ['ai', 'quality-control', 'review']
    },
    {
      id: 8,
      title: 'Advanced Voice Customization',
      description: 'Fine-tune voice parameters for perfect narration style',
      category: 'audio',
      level: 'advanced',
      duration: '22 min',
      views: '4.8k',
      rating: 4.8,
      thumbnail: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=225&fit=crop',
      videoUrl: 'https://www.youtube.com/watch?v=kffacxfA7G4',
      tags: ['voice', 'customization', 'parameters']
    },
    {
      id: 9,
      title: 'Batch Processing Large Projects',
      description: 'Handle multiple books and large-scale translation projects efficiently',
      category: 'advanced',
      level: 'expert',
      duration: '28 min',
      views: '3.2k',
      rating: 4.9,
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop',
      videoUrl: 'https://www.youtube.com/watch?v=hFZFjoX2cGg',
      tags: ['batch-processing', 'efficiency', 'large-scale']
    }
  ];

  const featuredTutorial = {
    id: 'featured',
    title: 'Complete Lexivana Masterclass',
    description: 'A comprehensive 2-hour course covering everything from basic translation to advanced voice cloning techniques',
    duration: '2h 15m',
    lessons: 12,
    level: 'all-levels',
    rating: 4.9,
    students: '3,240',
    thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=300&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
    highlights: [
      'Book upload and preparation',
      'Translation quality optimization',
      'Voice cloning and audio generation',
      'Multi-language publishing',
      'API integration basics'
    ]
  };

  const filteredTutorials = tutorials.filter(tutorial => {
    const categoryMatch = selectedCategory === 'all' || tutorial.category === selectedCategory;
    const levelMatch = selectedLevel === 'all' || tutorial.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  const getLevelColor = (level) => {
    switch(level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-orange-100 text-orange-800';
      case 'expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const openVideo = (videoUrl) => {
    window.open(videoUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <Navigation />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Lexivana Tutorials
            </h1>
            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Master book translation with our comprehensive step-by-step video guides created by industry experts
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-blue-100">Video Tutorials</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2">25K+</div>
                <div className="text-blue-100">Active Students</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2">Weekly</div>
                <div className="text-blue-100">New Content</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Tutorial */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-16 group hover:shadow-3xl transition-all duration-500">
          <div className="md:flex">
            <div className="md:w-1/2 relative overflow-hidden">
              <img 
                src={featuredTutorial.thumbnail} 
                alt="Featured tutorial" 
                className="w-full h-72 md:h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <button 
                  onClick={() => openVideo(featuredTutorial.videoUrl)}
                  className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 group-hover:opacity-100 opacity-70"
                >
                  <Play className="w-8 h-8 text-blue-600 ml-1" />
                </button>
              </div>
              <div className="absolute top-6 left-6">
                <div className="flex items-center gap-2">
                  <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    ✨ Featured
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                    New
                  </span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 p-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                <h2 className="text-3xl font-bold text-gray-900">{featuredTutorial.title}</h2>
              </div>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">{featuredTutorial.description}</p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 text-blue-600 mb-2">
                    <Clock className="w-5 h-5" />
                    <span className="font-semibold">Duration</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{featuredTutorial.duration}</span>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 text-green-600 mb-2">
                    <BookOpen className="w-5 h-5" />
                    <span className="font-semibold">Lessons</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{featuredTutorial.lessons}</span>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 text-purple-600 mb-2">
                    <Users className="w-5 h-5" />
                    <span className="font-semibold">Students</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{featuredTutorial.students}</span>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 text-yellow-600 mb-2">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-semibold">Rating</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">{featuredTutorial.rating}</span>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">What you'll master:</h3>
                <div className="space-y-3">
                  {featuredTutorial.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <ChevronRight className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => openVideo(featuredTutorial.videoUrl)}
                className="group w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center justify-center gap-3"
              >
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Start Masterclass
                <ExternalLink className="w-4 h-4 opacity-70" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="mb-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
                      : 'bg-white/50 text-gray-700 hover:bg-white/80 hover:shadow-md'
                  }`}
                >
                  {category.icon}
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 space-y-6 md:space-y-0">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3 flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full"></div>
              All Tutorials
            </h2>
            <p className="text-gray-600 text-lg">Learn at your own pace with our comprehensive video library</p>
          </div>
          
          <div className="flex space-x-4">
            {/* Level Filter */}
            <div className="relative">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="appearance-none bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl px-6 py-3 pr-12 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-300 font-medium"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
              <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Tutorial Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTutorials.map((tutorial) => (
            <div key={tutorial.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group transform hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <img 
                  src={tutorial.thumbnail} 
                  alt={tutorial.title} 
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <button 
                    onClick={() => openVideo(tutorial.videoUrl)}
                    className="w-14 h-14 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl hover:scale-110"
                  >
                    <Play className="w-6 h-6 text-blue-600 ml-1" />
                  </button>
                </div>
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getLevelColor(tutorial.level)}`}>
                    {tutorial.level}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {tutorial.duration}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-lg line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                  {tutorial.title}
                </h3>
                <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">
                  {tutorial.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{tutorial.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-current text-yellow-400" />
                    <span className="font-semibold">{tutorial.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {tutorial.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>

                <button 
                  onClick={() => openVideo(tutorial.videoUrl)}
                  className="w-full bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-500 hover:to-purple-600 text-gray-700 hover:text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg"
                >
                  <Play className="w-4 h-4" />
                  Watch Tutorial
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-500 hover:to-purple-600 text-gray-700 hover:text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:shadow-lg hover:scale-105">
            Load More Tutorials
          </button>
        </div>

        {/* Newsletter Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Never Miss a Tutorial</h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
            Get notified when we release new tutorials and exclusive learning content
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 bg-white/95 backdrop-blur-sm border-0 focus:ring-4 focus:ring-white/20 transition-all duration-300"
            />
            <button className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TutorialsPage;