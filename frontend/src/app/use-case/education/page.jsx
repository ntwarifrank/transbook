"use client"
import Navigation from '../../../components/navigation';
import Footer from '../../../components/footer';
import React, { useState } from 'react';
import { 
  GraduationCap, 
  Globe, 
  Clock, 
  Award, 
  Shield, 
  BookOpen,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  Play,
  Download,
  BarChart3
} from 'lucide-react';

const EducationPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { number: "500K+", label: "Students Helped", icon: <Users className="w-6 h-6" /> },
    { number: "50+", label: "Languages Supported", icon: <Globe className="w-6 h-6" /> },
    { number: "99.2%", label: "Accuracy Rate", icon: <Award className="w-6 h-6" /> },
    { number: "24hrs", label: "Average Turnaround", icon: <Clock className="w-6 h-6" /> }
  ];

  const benefits = [
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Global Accessibility",
      description: "Make textbooks available in any language, ensuring no student is left behind due to language barriers. Our platform supports over 50 languages including rare dialects.",
      features: ["Multi-language support", "Cultural adaptation", "Regional dialects", "Accessibility compliance"]
    },
    {
      icon: <Clock className="w-12 h-12" />,
      title: "Instant Translations",
      description: "Get academic content translated in hours, not months, keeping pace with curriculum needs and semester schedules.",
      features: ["24-hour turnaround", "Rush delivery options", "Bulk processing", "Real-time progress tracking"]
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: "Academic Precision",
      description: "Specialized algorithms trained on academic content ensure technical terms and concepts are accurately translated with proper context.",
      features: ["Subject-specific terminology", "Academic style preservation", "Citation handling", "Reference formatting"]
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Copyright Compliant",
      description: "Maintain proper attribution and respect intellectual property while making content accessible to international students.",
      features: ["Rights management", "Attribution tracking", "Fair use compliance", "Publisher partnerships"]
    }
  ];

  const useCases = [
    {
      title: "International Universities",
      description: "Enable global campuses to share curriculum materials across all locations",
      metrics: "40% increase in international enrollment",
      icon: <GraduationCap className="w-8 h-8" />
    },
    {
      title: "Online Learning Platforms",
      description: "Scale course content to reach learners worldwide",
      metrics: "300% expansion in global reach",
      icon: <BookOpen className="w-8 h-8" />
    },
    {
      title: "Educational Publishers",
      description: "Localize textbooks for international markets efficiently",
      metrics: "75% reduction in localization costs",
      icon: <Globe className="w-8 h-8" />
    }
  ];

  const features = [
    { title: "Subject-specific terminology databases", description: "Specialized dictionaries for STEM, humanities, and professional fields" },
    { title: "Academic style preservation", description: "Maintain formal academic tone and writing conventions" },
    { title: "Citation and reference handling", description: "Properly format academic citations across different systems" },
    { title: "Collaborative review tools", description: "Enable educators to review and approve translations" },
    { title: "Bulk processing for curriculum", description: "Handle entire course catalogs efficiently" },
    { title: "LMS integration", description: "Connect with popular learning management systems" }
  ];

  return (
    <div className="min-h-screen bg-white">
        <Navigation />
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-blue-500 rounded-xl">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">Education Solutions</span>
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Democratize Knowledge Across All Languages
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Make educational content accessible to students worldwide with AI-powered translations that maintain academic precision and cultural context.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center">
                  Start Free Translation <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <Play className="w-5 h-5 mr-2" /> Watch Demo
                </button>
              </div>
            </div>
            <div className="lg:pl-12">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <div className="text-blue-500 mb-3">{stat.icon}</div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Lexivana for Education?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform how knowledge is shared globally with our specialized education translation platform
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="group">
                <div className="flex items-start space-x-6">
                  <div className="text-blue-500 group-hover:text-blue-600 transition-colors">
                    {benefit.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{benefit.description}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {benefit.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Education Use Cases</h2>
            <p className="text-xl text-gray-600">See how institutions worldwide leverage our platform</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-blue-500 mb-4">{useCase.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{useCase.title}</h3>
                <p className="text-gray-600 mb-4">{useCase.description}</p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-800">{useCase.metrics}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Specialized Education Features</h2>
            <p className="text-xl text-gray-600">Built specifically for academic content and educational needs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="py-20 bg-blue-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
          </div>
          <blockquote className="text-2xl font-medium text-gray-900 mb-8 leading-relaxed">
            "Lexivana has revolutionized how we deliver multilingual education. Our international students now have access to the same quality textbooks as native speakers, and our faculty can focus on teaching rather than translation logistics."
          </blockquote>
          <div className="flex items-center justify-center space-x-4">
            <img 
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face" 
              alt="Dr. Sarah Chen" 
              className="w-16 h-16 rounded-full"
            />
            <div className="text-left">
              <div className="font-semibold text-gray-900">Dr. Sarah Chen</div>
              <div className="text-gray-600">Director of International Programs, Stanford University</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Education?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of educators making knowledge accessible worldwide
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Start Free Trial
            </button>
            <button className="border border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EducationPage;