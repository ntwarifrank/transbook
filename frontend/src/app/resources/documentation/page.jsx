"use client"
import React, { useState } from 'react';
import { Search, ChevronRight, Book, Languages, Mic, MessageSquare, Settings, Play, Download, Upload, Eye, Code, Zap } from 'lucide-react';
import Navigation from '../../../components/navigation';
import Footer from '../../../components/footer';

const DocumentationPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('getting-started');

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <Zap className="w-5 h-5" />,
      content: {
        title: 'Getting Started with Lexivana',
        description: 'Learn how to translate your first book with our AI-powered platform',
        steps: [
          {
            title: 'Create Your Account',
            description: 'Sign up for free and access our translation tools',
            details: 'Click "Try it free" to create your account. You\'ll get instant access to our basic translation features with no credit card required.'
          },
          {
            title: 'Upload Your Content',
            description: 'Upload books in PDF, EPUB, or text format',
            details: 'Drag and drop your files or use our upload button. We support multiple formats including PDF, EPUB, DOCX, and plain text files up to 50MB.'
          },
          {
            title: 'Select Languages',
            description: 'Choose from 130+ supported languages',
            details: 'Select your source language and target language(s). Our AI automatically detects the source language if you\'re unsure.'
          },
          {
            title: 'Start Translation',
            description: 'Let our AI translate your book in minutes',
            details: 'Review the preview, adjust settings if needed, and click "Start Translation". Most books are completed within 5-15 minutes.'
          }
        ]
      }
    },
    {
      id: 'features',
      title: 'Core Features',
      icon: <Book className="w-5 h-5" />,
      content: {
        title: 'Core Features',
        description: 'Explore the powerful features that make Lexivana the best book translation platform',
        features: [
          {
            icon: <Languages className="w-6 h-6 text-blue-500" />,
            title: 'Multi-Language Support',
            description: 'Translate to and from 130+ languages including English, Spanish, French, German, Chinese, Japanese, Arabic, and more.'
          },
          {
            icon: <Book className="w-6 h-6 text-green-500" />,
            title: 'Format Preservation',
            description: 'Maintain original formatting, images, and layout structure throughout the translation process.'
          },
          {
            icon: <Mic className="w-6 h-6 text-purple-500" />,
            title: 'Audio Generation',
            description: 'Convert translated books to audiobooks with natural-sounding AI voices in 29 languages.'
          },
          {
            icon: <MessageSquare className="w-6 h-6 text-orange-500" />,
            title: 'Context-Aware Translation',
            description: 'Our AI understands context, idioms, and cultural nuances for more accurate translations.'
          }
        ]
      }
    },
    {
      id: 'translation-guide',
      title: 'Translation Guide',
      icon: <Languages className="w-5 h-5" />,
      content: {
        title: 'Translation Guide',
        description: 'Best practices for high-quality book translations',
        guidelines: [
          {
            title: 'Prepare Your Content',
            tips: [
              'Ensure your source text is clean and properly formatted',
              'Remove unnecessary headers, footers, and page numbers',
              'Check that images and captions are properly labeled',
              'Use consistent terminology throughout your book'
            ]
          },
          {
            title: 'Choose the Right Settings',
            tips: [
              'Select the appropriate translation tone (formal, casual, technical)',
              'Enable terminology dictionary for consistent translations',
              'Choose the target audience (general, academic, children)',
              'Set regional preferences (US English vs UK English)'
            ]
          },
          {
            title: 'Review and Edit',
            tips: [
              'Use our built-in editor to review translations',
              'Check cultural references and adapt them if needed',
              'Verify technical terms and proper nouns',
              'Test different sections with native speakers'
            ]
          }
        ]
      }
    },
    {
      id: 'audio-features',
      title: 'Audio Features',
      icon: <Mic className="w-5 h-5" />,
      content: {
        title: 'Audio & Voice Features',
        description: 'Transform your translated books into engaging audiobooks',
        audioFeatures: [
          {
            title: 'Voice Cloning',
            description: 'Create custom voices that match your brand or narrator style',
            details: 'Upload a 5-minute voice sample and our AI will clone it for consistent narration across your entire book.'
          },
          {
            title: 'Multi-Speaker Support',
            description: 'Assign different voices to different characters',
            details: 'Perfect for dialogue-heavy books, assign unique voices to each character for immersive storytelling.'
          },
          {
            title: 'Pronunciation Control',
            description: 'Fine-tune pronunciation of names and technical terms',
            details: 'Use our phonetic editor to ensure proper pronunciation of character names, places, and specialized vocabulary.'
          },
          {
            title: 'Audio Export Options',
            description: 'Export in multiple formats for different platforms',
            details: 'Download as MP3, WAV, or M4A. Optimized for Audible, Spotify, Apple Podcasts, and other platforms.'
          }
        ]
      }
    },
    {
      id: 'api-integration',
      title: 'API Integration',
      icon: <Code className="w-5 h-5" />,
      content: {
        title: 'API Integration',
        description: 'Integrate Lexivana\'s translation capabilities into your applications',
        endpoints: [
          {
            method: 'POST',
            endpoint: '/api/v1/translate',
            description: 'Submit a book for translation',
            example: `{
  "source_language": "en",
  "target_language": "es",
  "content": "book_content",
  "format": "epub",
  "settings": {
    "tone": "formal",
    "preserve_formatting": true
  }
}`
          },
          {
            method: 'GET',
            endpoint: '/api/v1/translation/{id}',
            description: 'Check translation status and retrieve results',
            example: `{
  "id": "trans_123456",
  "status": "completed",
  "progress": 100,
  "download_url": "https://..."
}`
          }
        ]
      }
    },
    {
      id: 'pricing',
      title: 'Pricing & Plans',
      icon: <Settings className="w-5 h-5" />,
      content: {
        title: 'Pricing & Plans',
        description: 'Choose the plan that fits your translation needs',
        plans: [
          {
            name: 'Free',
            price: '$0',
            features: [
              'Up to 5,000 words per month',
              '10 supported languages',
              'Basic translation quality',
              'Standard support'
            ]
          },
          {
            name: 'Pro',
            price: '$29/month',
            features: [
              'Up to 100,000 words per month',
              'All 130+ languages',
              'Premium translation quality',
    }
  }
];

const filteredSections = sections.filter(section =>
  section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  section.content.title.toLowerCase().includes(searchTerm.toLowerCase())
);
  const filteredSections = sections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.content.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentSection = sections.find(s => s.id === activeSection);

  const renderContent = (section) => {
    const { content } = section;
    
    switch(section.id) {
      case 'getting-started':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.title}</h2>
              <p className="text-lg text-gray-600 mb-8">{content.description}</p>
            </div>
            <div className="space-y-6">
              {content.steps.map((step, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600 mb-3">{step.description}</p>
                      <p className="text-sm text-gray-500">{step.details}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'features':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.title}</h2>
              <p className="text-lg text-gray-600 mb-8">{content.description}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {content.features.map((feature, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'translation-guide':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.title}</h2>
              <p className="text-lg text-gray-600 mb-8">{content.description}</p>
            </div>
            <div className="space-y-8">
              {content.guidelines.map((guideline, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{guideline.title}</h3>
                  <ul className="space-y-2">
                    {guideline.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start space-x-3">
                        <ChevronRight className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-600">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case 'audio-features':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.title}</h2>
              <p className="text-lg text-gray-600 mb-8">{content.description}</p>
            </div>
            <div className="space-y-6">
              {content.audioFeatures.map((feature, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-3">{feature.description}</p>
                  <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">{feature.details}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'api-integration':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.title}</h2>
              <p className="text-lg text-gray-600 mb-8">{content.description}</p>
            </div>
            <div className="space-y-6">
              {content.endpoints.map((endpoint, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      endpoint.method === 'POST' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {endpoint.method}
                    </span>
                    <code className="text-lg font-mono text-gray-800">{endpoint.endpoint}</code>
                  </div>
                  <p className="text-gray-600 mb-4">{endpoint.description}</p>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm whitespace-pre-wrap">{endpoint.example}</pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'pricing':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{content.title}</h2>
              <p className="text-lg text-gray-600 mb-8">{content.description}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {content.plans.map((plan, index) => (
                <div key={index} className={`border-2 rounded-xl p-6 ${
                  plan.name === 'Pro' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}>
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="text-3xl font-bold text-gray-900">{plan.price}</div>
                    {plan.name !== 'Enterprise' && <div className="text-gray-500">per month</div>}
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-2">
                        <ChevronRight className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full mt-6 py-2 px-4 rounded-lg font-semibold transition-colors ${
                    plan.name === 'Pro' 
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}>
                    {plan.name === 'Free' ? 'Get Started' : plan.name === 'Pro' ? 'Start Free Trial' : 'Contact Sales'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <Navigation />
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Lexivana
              </span>{' '}
              Documentation
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Everything you need to translate books with AI
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <nav className="space-y-2">
                {filteredSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {section.icon}
                    <span className="font-medium">{section.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              {currentSection && renderContent(currentSection)}
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to translate your first book?</h2>
            <p className="text-xl opacity-90 mb-8">Join thousands of authors and publishers using Lexivana</p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DocumentationPage;