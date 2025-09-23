"use client"
import React, { useState } from 'react';
import { ArrowRight, TrendingUp, Clock, Users, BookOpen, Globe, Download, Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import Navigation from '../../../components/navigation';
import Footer from '../../../components/footer';

const CaseStudiesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const categories = [
    { id: 'all', name: 'All Industries' },
    { id: 'publishing', name: 'Publishing' },
    { id: 'education', name: 'Education' },
    { id: 'entertainment', name: 'Entertainment' }
  ];

  const caseStudies = [
    {
      id: 1,
      title: 'Global Publishing House Scales to 50+ Languages',
      company: 'Meridian Publishing',
      industry: 'publishing',
      challenge: 'Traditional translation taking 6+ months per book',
      solution: 'AI-powered translation pipeline with human review',
      results: {
        timeReduction: '85%',
        costSavings: '$2.3M annually',
        languagesAdded: '47',
        revenueIncrease: '340%'
      },
      description: 'Meridian Publishing transformed their global expansion strategy by implementing Lexivana\'s AI translation platform, reducing time-to-market from 6 months to 3 weeks.',
      image: '/api/placeholder/400/250',
      testimonial: '"Lexivana revolutionized our publishing workflow. We can now release books in dozens of languages simultaneously, opening up markets we never thought possible."',
      author: 'Sarah Chen',
      authorTitle: 'VP of Global Operations',
      tags: ['Publishing', 'Scale', 'Global Expansion']
    },
    {
      id: 2,
      title: 'University Creates Multilingual Learning Platform',
      company: 'Stanford Digital Education',
      industry: 'education',
      challenge: 'Making educational content accessible in multiple languages',
      solution: 'Automated course material translation with voice narration',
      results: {
        studentsReached: '125,000+',
        languagesCovered: '23',
        engagementIncrease: '67%',
        completionRate: '89%'
      },
      description: 'Stanford Digital Education used Lexivana to translate and narrate educational content, making their courses accessible to international students worldwide.',
      image: '/api/placeholder/400/250',
      testimonial: '"The quality of translations and voice generation exceeded our expectations. Our international enrollment increased by 300% in the first year."',
      author: 'Dr. Michael Rodriguez',
      authorTitle: 'Director of Digital Learning',
      tags: ['Education', 'Accessibility', 'Voice Generation']
    },
    {
      id: 4,
      title: 'Streaming Platform Expands Content Library Globally',
      company: 'StreamVision',
      industry: 'entertainment',
      challenge: 'Subtitling and dubbing content for international markets',
      solution: 'AI dubbing with voice cloning and lip-sync technology',
      results: {
        contentHours: '50,000+',
        marketsEntered: '35',
        viewershipGrowth: '450%',
        productionCost: '60% reduction'
      },
      description: 'StreamVision revolutionized their content localization by using AI dubbing and subtitling, enabling rapid expansion into new international markets.',
      image: '/api/placeholder/400/250',
      testimonial: '"The lip-sync quality is indistinguishable from traditional dubbing, but we can now localize content in days instead of months. It\'s transformed our global strategy."',
      author: 'Alex Thompson',
      authorTitle: 'Head of Content Localization',
      tags: ['Entertainment', 'Dubbing', 'Content Localization']
    }
  ];

  const testimonials = [
    {
      quote: "Lexivana has transformed how we approach global content creation. The speed and quality are unmatched.",
      author: "Jennifer Walsh",
      title: "CEO, Global Media Corp",
      company: "Global Media Corp",
      avatar: "/api/placeholder/80/80"
    },
    {
      quote: "We've reduced our translation costs by 70% while improving quality and speed. It's been a game-changer.",
      author: "David Kim",
      title: "Operations Director",
      company: "EduTech International",
      avatar: "/api/placeholder/80/80"
    },
    {
      quote: "The AI voices are so natural, our audiences can't tell the difference from human narration.",
      author: "Maria Santos",
      title: "Content Manager",
      company: "AudioBook Plus",
      avatar: "/api/placeholder/80/80"
    }
  ];

  const stats = [
    { label: 'Companies Served', value: '2,500+', icon: <Users className="w-6 h-6" /> },
    { label: 'Books Translated', value: '45,000+', icon: <BookOpen className="w-6 h-6" /> },
    { label: 'Languages Supported', value: '130+', icon: <Globe className="w-6 h-6" /> },
    { label: 'Time Saved', value: '2.5M+ hours', icon: <Clock className="w-6 h-6" /> }
  ];

  const filteredCaseStudies = selectedCategory === 'all' 
    ? caseStudies 
    : caseStudies.filter(study => study.industry === selectedCategory);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const formatMetric = (key, value) => {
    const metricLabels = {
      timeReduction: 'Time Reduction',
      costSavings: 'Cost Savings',
      languagesAdded: 'New Languages',
      revenueIncrease: 'Revenue Growth',
      studentsReached: 'Students Reached',
      languagesCovered: 'Languages',
      engagementIncrease: 'Engagement Up',
      completionRate: 'Completion Rate',
      documentsTranslated: 'Documents',
      developmentTime: 'Dev Time Saved',
      teamProductivity: 'Productivity Up',
      maintenanceCost: 'Maintenance Saved',
      contentHours: 'Content Hours',
      marketsEntered: 'New Markets',
      viewershipGrowth: 'Viewership Growth',
      productionCost: 'Cost Reduction'
    };
    return metricLabels[key] || key;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Success Stories</h1>
            <p className="text-xl opacity-90 mb-8">
              See how companies worldwide are transforming their content with Lexivana
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2 text-blue-200">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-1 shadow-lg">
            <div className="flex space-x-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="space-y-12">
          {filteredCaseStudies.map((study, index) => (
            <div key={study.id} className={`bg-white rounded-2xl shadow-lg overflow-hidden ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}>
              <div className="lg:flex">
                <div className="lg:w-1/2">
                  <img 
                    src={study.image} 
                    alt={study.company}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                </div>
                <div className="lg:w-1/2 p-8 lg:p-12">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {study.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{study.title}</h2>
                  <p className="text-gray-600 mb-6">{study.description}</p>
                  
                  {/* Challenge & Solution */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Challenge</h3>
                      <p className="text-gray-600 text-sm">{study.challenge}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Solution</h3>
                      <p className="text-gray-600 text-sm">{study.solution}</p>
                    </div>
                  </div>

                  {/* Results Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {Object.entries(study.results).map(([key, value]) => (
                      <div key={key} className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{value}</div>
                        <div className="text-sm text-gray-600">{formatMetric(key, value)}</div>
                      </div>
                    ))}
                  </div>

                  {/* Testimonial */}
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <Quote className="w-6 h-6 text-blue-600 mb-2" />
                    <p className="text-gray-700 italic mb-3">{study.testimonial}</p>
                    <div>
                      <div className="font-semibold text-gray-900">{study.author}</div>
                      <div className="text-sm text-gray-600">{study.authorTitle}, {study.company}</div>
                    </div>
                  </div>

                  <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold">
                    <span>Read Full Case Study</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Carousel */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">What Our Customers Say</h2>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="text-center">
              <Quote className="w-12 h-12 text-blue-600 mx-auto mb-6" />
              <p className="text-xl text-gray-700 italic mb-6">
                {testimonials[currentTestimonial].quote}
              </p>
              
              <div className="flex items-center justify-center space-x-4">
                <img 
                  src={testimonials[currentTestimonial].avatar} 
                  alt={testimonials[currentTestimonial].author}
                  className="w-12 h-12 rounded-full"
                />
                <div className="text-left">
                  <div className="font-semibold text-gray-900">
                    {testimonials[currentTestimonial].author}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonials[currentTestimonial].title}
                  </div>
                  <div className="text-sm text-blue-600">
                    {testimonials[currentTestimonial].company}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <button 
                onClick={prevTestimonial}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              
              {/* Dots indicator */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentTestimonial 
                        ? 'bg-blue-600' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextTestimonial}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white p-8 md:p-12 mt-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Content?</h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of companies worldwide who trust Lexivana for their translation and localization needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
                <span>Start Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center justify-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Download Case Studies</span>
              </button>
            </div>
            
            <div className="flex items-center justify-center space-x-4 mt-8 text-sm opacity-80">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-current" />
                <span>4.9/5 Customer Rating</span>
              </div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div>14-Day Free Trial</div>
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div>No Credit Card Required</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CaseStudiesPage;