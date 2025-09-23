"use client"
import React, { useState, useEffect } from 'react';
import { Home, Search, ArrowLeft, RefreshCw, MapPin, Clock, Zap, Heart, Star } from 'lucide-react';

const Advanced404Page = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAnimated, setIsAnimated] = useState(false);
  const [particles, setParticles] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Initialize floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setParticles(newParticles);
    setIsAnimated(true);

    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: (particle.y + particle.speed * 0.1) % 100,
        x: particle.x + Math.sin(Date.now() * 0.001 + particle.id) * 0.1,
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const suggestedPages = [
    { name: 'Home', path: '/', icon: Home, description: 'Back to main page' },
    { name: 'Translation Services', path: '/services', icon: Zap, description: 'Our professional services' },
    { name: 'Pricing', path: '/pricing', icon: Star, description: 'View our plans' },
    { name: 'Blog', path: '/blog', icon: Heart, description: 'Latest insights' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // In a real app, this would redirect to search results
    console.log('Searching for:', searchTerm);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              filter: 'blur(1px)',
            }}
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900/80" />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* 404 Animation */}
          <div className={`mb-12 transition-all duration-1000 ${isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
            <div className="relative">
              {/* Glowing 404 Text */}
              <h1 className="text-[12rem] md:text-[16rem] font-black text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text leading-none select-none">
                404
              </h1>
              
              {/* Glowing Effect */}
              <div className="absolute inset-0 text-[12rem] md:text-[16rem] font-black text-blue-400/20 blur-3xl leading-none select-none">
                404
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce opacity-80 blur-sm" />
              <div className="absolute -top-4 -right-12 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-ping opacity-60" />
              <div className="absolute -bottom-8 left-1/4 w-8 h-8 bg-gradient-to-r from-pink-400 to-red-500 rounded-full animate-pulse opacity-70" />
            </div>
          </div>

          {/* Error Message */}
          <div className={`mb-12 transition-all duration-1000 delay-300 ${isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Oops! Page Not Found
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              The page you&apos;re looking for seems to have vanished into the digital void. 
              Don&apos;t worry, even the best explorers sometimes take a wrong turn.
            </p>
            
            {/* Status Info */}
            <div className="flex items-center justify-center gap-8 text-sm text-gray-400 mb-8">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{currentTime.toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Error Location: Unknown</span>
              </div>
            </div>
          </div>

          {/* Search Box */}
          <div className={`mb-12 transition-all duration-1000 delay-500 ${isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
            <div className="max-w-2xl mx-auto">
              <p className="text-gray-300 mb-6">Maybe search for what you were looking for?</p>
              <form onSubmit={handleSearch} className="relative">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search our site..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-16 pr-32 py-5 text-lg bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:ring-4 focus:ring-blue-500/50 focus:border-blue-400/50 transition-all duration-300"
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 pr-2 flex items-center"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                    Search
                  </div>
                </button>
              </form>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={`mb-12 transition-all duration-1000 delay-700 ${isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/'}
                className="group flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <Home className="h-5 w-5 group-hover:animate-bounce" />
                Go Home
              </button>
              
              <button
                onClick={handleGoBack}
                className="group flex items-center gap-3 bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-2xl font-semibold hover:bg-white/20 hover:shadow-xl transition-all duration-300"
              >
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                Go Back
              </button>
              
              <button
                onClick={handleRefresh}
                className="group flex items-center gap-3 bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-2xl font-semibold hover:bg-white/20 hover:shadow-xl transition-all duration-300"
              >
                <RefreshCw className="h-5 w-5 group-hover:rotate-180 transition-transform duration-500" />
                Refresh
              </button>
            </div>
          </div>

          {/* Suggested Pages */}
          <div className={`transition-all duration-1000 delay-1000 ${isAnimated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
            <h3 className="text-2xl font-bold text-white mb-8">
              Popular Destinations
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {suggestedPages.map((page, index) => (
                <div
                  key={page.name}
                  className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300">
                      <page.icon className="h-6 w-6 text-white" />
                    </div>
                    
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {page.name}
                    </h4>
                    
                    <p className="text-gray-400 text-sm">
                      {page.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Message */}
          <div className={`mt-16 transition-all duration-1000 delay-1200 ${isAnimated ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
              <p className="text-gray-300 text-lg">
                Still need help? Our support team is here for you.
              </p>
              <div className="flex gap-4 justify-center mt-6">
                <button className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                  Contact Support
                </button>
                <span className="text-gray-500">•</span>
                <button className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                  Report Issue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Animation Elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-600/10 rounded-full blur-3xl animate-ping" />
    </div>
  );
};

export default Advanced404Page;