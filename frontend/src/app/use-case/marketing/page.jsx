"use client"
import Navigation from '../../../components/navigation';
import Footer from '../../../components/footer';
import React, { useState } from 'react';
import { 
  TrendingUp, 
  Target, 
  Sparkles, 
  BarChart3, 
  Zap,
  Globe,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  Play,
  Download,
  Megaphone,
  Heart,
  Eye,
  MousePointer
} from 'lucide-react';

const MarketingPage = () => {
  const [activeMetric, setActiveMetric] = useState(0);

  const stats = [
    { number: "300%", label: "Average ROI Increase", icon: <TrendingUp className="w-6 h-6" /> },
    { number: "85+", label: "Marketing Languages", icon: <Globe className="w-6 h-6" /> },
    { number: "72hrs", label: "Campaign Launch Time", icon: <Zap className="w-6 h-6" /> },
    { number: "95%", label: "Brand Voice Retention", icon: <Sparkles className="w-6 h-6" /> }
  ];

  const benefits = [
    {
      icon: <Target className="w-12 h-12" />,
      title: "Accelerated Market Penetration",
      description: "Enter new markets 10x faster with localized content that resonates with local audiences and cultural preferences.",
      metrics: ["Reduce time-to-market by 80%", "Increase conversion rates by 45%", "Expand to 50+ markets simultaneously"],
      color: "blue"
    },
    {
      icon: <Sparkles className="w-12 h-12" />,
      title: "Brand Consistency at Scale",
      description: "Maintain your unique brand voice, tone, and messaging across all languages and cultural contexts worldwide.",
      metrics: ["95% brand voice retention", "Consistent messaging across markets", "Automated style guide enforcement"],
      color: "purple"
    },
    {
      icon: <BarChart3 className="w-12 h-12" />,
      title: "Performance Analytics",
      description: "Monitor engagement metrics across different language markets to optimize your global marketing strategy.",
      metrics: ["Real-time performance tracking", "A/B test across languages", "ROI optimization insights"],
      color: "green"
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Lightning-Fast Deployment",
      description: "Launch campaigns simultaneously across multiple markets with AI-powered translation speed and accuracy.",
      metrics: ["72-hour global deployment", "Simultaneous multi-market launch", "Real-time content updates"],
      color: "orange"
    }
  ];

  const contentTypes = [
    {
      title: "Website Content",
      description: "Landing pages, product descriptions, and web copy",
      icon: <Globe className="w-8 h-8" />,
      features: ["SEO optimization", "Cultural adaptation", "CTA localization", "Meta tag translation"]
    },
    {
      title: "Social Media Content",
      description: "Posts, campaigns, and community management",
      icon: <Heart className="w-8 h-8" />,
      features: ["Platform-specific adaptation", "Hashtag localization", "Cultural trend integration", "Engagement optimization"]
    },
    {
      title: "Email Marketing",
      description: "Newsletters, campaigns, and automation sequences",
      icon: <Megaphone className="w-8 h-8" />,
      features: ["Subject line optimization", "Personalization", "Cultural timing", "Regulatory compliance"]
    },
    {
      title: "Advertising Copy",
      description: "PPC ads, display banners, and video scripts",
      icon: <Eye className="w-8 h-8" />,
      features: ["Character limit optimization", "Cultural sensitivity", "Local regulations", "Performance tracking"]
    }
  ];

  const caseStudies = [
    {
      company: "TechStartup Inc.",
      industry: "SaaS",
      challenge: "Expand to European markets",
      solution: "Localized entire marketing funnel in 12 languages",
      results: "400% increase in international leads, 250% revenue growth",
      timeline: "3 months",
      color: "blue"
    },
    {
      company: "Fashion Brand Co.",
      industry: "E-commerce",
      challenge: "Maintain brand voice across cultures",
      solution: "AI-powered brand voice preservation with cultural adaptation",
      results: "95% brand consistency score, 180% engagement increase",
      timeline: "6 weeks",
      color: "purple"
    },
    {
      company: "FinTech Solutions",
      industry: "Finance",
      challenge: "Navigate complex regulatory requirements",
      solution: "Compliance-aware translations with legal review",
      results: "100% regulatory approval, 300% market penetration",
      timeline: "4 months",
      color: "green"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
        <Navigation />
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold">Marketing Solutions</span>
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Scale Your Brand's <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Global Reach</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Transform your marketing content into multiple languages while maintaining your brand voice, tone, and messaging across all international markets.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all flex items-center justify-center shadow-lg">
                  Launch Global Campaign <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <Play className="w-5 h-5 mr-2" /> See Success Stories
                </button>
              </div>
            </div>
            <div className="lg:pl-12">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div 
                    key={index} 
                    className={`bg-white p-6 rounded-2xl shadow-lg border-2 transition-all cursor-pointer ${
                      activeMetric === index ? 'border-purple-300 ring-4 ring-purple-100' : 'border-gray-100 hover:border-purple-200'
                    }`}
                    onClick={() => setActiveMetric(index)}
                  >
                    <div className="text-purple-500 mb-3">{stat.icon}</div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Marketers Choose Lexivana</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Drive global growth with marketing translations that convert, engage, and scale
            </p>
          </div>
          <div className="space-y-16">
            {benefits.map((benefit, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-cols-2' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className={`text-${benefit.color}-500 mb-6`}>
                    {benefit.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">{benefit.title}</h3>
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">{benefit.description}</p>
                  <div className="space-y-3">
                    {benefit.metrics.map((metric, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className={`w-5 h-5 text-${benefit.color}-500`} />
                        <span className="text-gray-700 font-medium">{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`bg-gradient-to-br from-${benefit.color}-50 to-${benefit.color}-100 p-8 rounded-2xl ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="aspect-square bg-white rounded-xl shadow-lg p-8 flex items-center justify-center">
                    <div className={`text-8xl text-${benefit.color}-200`}>
                      {benefit.icon}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Types Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Marketing Content We Transform</h2>
            <p className="text-xl text-gray-600">From websites to social media, we localize all your marketing materials</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contentTypes.map((type, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group">
                <div className="text-purple-500 group-hover:text-purple-600 transition-colors mb-6">
                  {type.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{type.title}</h3>
                <p className="text-gray-600 mb-6">{type.description}</p>
                <div className="space-y-2">
                  {type.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Case Studies Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">See how brands achieve global success with Lexivana</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div key={index} className={`bg-gradient-to-br from-${study.color}-50 to-${study.color}-100 p-8 rounded-2xl border border-${study.color}-200`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">{study.company}</h3>
                  <span className={`bg-${study.color}-200 text-${study.color}-800 px-3 py-1 rounded-full text-sm font-semibold`}>
                    {study.industry}
                  </span>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Challenge</h4>
                    <p className="text-gray-600 text-sm">{study.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Solution</h4>
                    <p className="text-gray-600 text-sm">{study.solution}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Results</h4>
                    <p className={`text-${study.color}-700 font-semibold text-sm`}>{study.results}</p>
                  </div>
                  <div className={`bg-${study.color}-200 rounded-lg p-3 text-center`}>
                    <span className={`text-${study.color}-800 font-bold`}>Timeline: {study.timeline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="py-20 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
          </div>
          <blockquote className="text-2xl font-medium text-gray-900 mb-8 leading-relaxed">
            "Our global campaigns now launch in 15 languages simultaneously. Lexivana's brand voice preservation is incredible - our messaging stays consistent worldwide while feeling native in each market."
          </blockquote>
          <div className="flex items-center justify-center space-x-4">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face" 
              alt="Marcus Rodriguez" 
              className="w-16 h-16 rounded-full"
            />
            <div className="text-left">
              <div className="font-semibold text-gray-900">Marcus Rodriguez</div>
              <div className="text-gray-600">Global Marketing Director, TechCorp</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Go Global?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of marketers scaling their brands worldwide with Lexivana
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Start Global Campaign
            </button>
            <button className="border border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-colors">
              Book Strategy Call
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MarketingPage;