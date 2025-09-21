"use client"
import Navigation from '../../../components/navigation';
import Footer from '../../../components/footer';
import React, { useState } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Globe, 
  Users, 
  Star,
  Heart,
  Zap,
  Award,
  Film,
  Headphones,
  CheckCircle,
  ArrowRight,
  Play,
  Download,
  Feather,
  Theater,
  Music,
  Palette
} from 'lucide-react';

const EntertainmentPage = () => {
  const [activeGenre, setActiveGenre] = useState('fiction');

  const stats = [
    { number: "1M+", label: "Books Translated", icon: <BookOpen className="w-6 h-6" /> },
    { number: "100+", label: "Entertainment Languages", icon: <Globe className="w-6 h-6" /> },
    { number: "98%", label: "Narrative Flow Retention", icon: <Heart className="w-6 h-6" /> },
    { number: "48hrs", label: "Novel Translation Time", icon: <Zap className="w-6 h-6" /> }
  ];

  const genres = {
    fiction: {
      title: "Fiction & Literature",
      icon: <BookOpen className="w-8 h-8" />,
      description: "Novels, short stories, and literary works",
      features: ["Character voice preservation", "Dialogue authenticity", "Cultural context adaptation", "Emotional tone retention"],
      examples: ["Romance novels", "Science fiction", "Fantasy epics", "Literary fiction", "Mystery & thrillers"]
    },
    scripts: {
      title: "Scripts & Screenplays",
      icon: <Film className="w-8 h-8" />,
      description: "Movie scripts, TV shows, and theatrical plays",
      features: ["Scene formatting preservation", "Character consistency", "Cultural adaptation", "Timing considerations"],
      examples: ["Movie screenplays", "TV series scripts", "Theater plays", "Web series", "Documentary scripts"]
    },
    audio: {
      title: "Audio Content",
      icon: <Headphones className="w-8 h-8" />,
      description: "Audiobooks, podcasts, and voice content",
      features: ["Natural speech flow", "Voice actor notes", "Pronunciation guides", "Cultural audio cues"],
      examples: ["Audiobook narration", "Podcast scripts", "Voice-over content", "Radio drama", "Interactive audio"]
    },
    interactive: {
      title: "Interactive Media",
      icon: <Theater className="w-8 h-8" />,
      description: "Games, interactive fiction, and digital media",
      features: ["UI text adaptation", "Branching dialogue", "Cultural references", "Interactive elements"],
      examples: ["Video game dialogue", "Interactive fiction", "VR experiences", "Mobile games", "Educational games"]
    }
  };

  const benefits = [
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: "Narrative Preservation",
      description: "Our AI understands story structure, maintaining plot flow, character development, and emotional arcs across all translations.",
      features: ["Story arc continuity", "Character voice consistency", "Emotional impact retention", "Plot coherence"],
      color: "blue"
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Cultural Adaptation",
      description: "Smart cultural adaptation that preserves the author's intent while making content accessible to different cultural contexts.",
      features: ["Cultural reference adaptation", "Idiom localization", "Social context adjustment", "Historical accuracy"],
      color: "purple"
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Global Distribution",
      description: "Reach international markets and expand your readership exponentially with professional-quality translations.",
      features: ["Multi-format publishing", "Rights management", "International distribution", "Market research insights"],
      color: "green"
    },
    {
      icon: <Star className="w-12 h-12" />,
      title: "Quality Assurance",
      description: "Professional review process with genre experts ensures publication-ready translations that meet industry standards.",
      features: ["Genre expert review", "Beta reader feedback", "Publisher format compliance", "Quality metrics"],
      color: "orange"
    }
  ];

  const showcases = [
    {
      title: "Fantasy Epic Success",
      author: "Sarah J. Martin",
      genre: "Fantasy",
      description: "7-book fantasy series translated into 15 languages",
      achievement: "2M+ international copies sold",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
      languages: ["Spanish", "French", "German", "Japanese", "Korean", "Portuguese"]
    },
    {
      title: "Indie Romance Phenomenon",
      author: "Maria Rodriguez",
      genre: "Romance",
      description: "Contemporary romance novel that became a global bestseller",
      achievement: "1M+ downloads worldwide",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
      languages: ["Italian", "Dutch", "Swedish", "Polish", "Czech", "Hungarian"]
    },
    {
      title: "Sci-Fi Breakthrough",
      author: "David Chen",
      genre: "Science Fiction",
      description: "Hard sci-fi trilogy with complex technical concepts",
      achievement: "Hugo Award nomination",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
      languages: ["Chinese", "Russian", "Arabic", "Hindi", "Turkish", "Thai"]
    }
  ];

  const features = [
    {
      icon: <Feather className="w-6 h-6" />,
      title: "Style Preservation",
      description: "Maintain author's unique writing style and voice across languages"
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Creative Adaptation",
      description: "Adapt creative elements like wordplay, poetry, and metaphors"
    },
    {
      icon: <Music className="w-6 h-6" />,
      title: "Rhythm & Flow",
      description: "Preserve the natural rhythm and pacing of prose and dialogue"
    },
    {
      icon: <Theater className="w-6 h-6" />,
      title: "Character Voices",
      description: "Maintain distinct character personalities and speaking patterns"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Cultural Bridge",
      description: "Bridge cultural gaps while respecting original context"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Industry Standards",
      description: "Meet publishing industry requirements for international markets"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
        <Navigation />
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold">Entertainment Solutions</span>
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Share Stories Across <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">All Cultures</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Bring your creative works to global audiences with translations that preserve the magic, emotion, and cultural depth of your original content.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center shadow-lg">
                  Translate Your Story <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <Play className="w-5 h-5 mr-2" /> See Examples
                </button>
              </div>
            </div>
            <div className="lg:pl-12">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
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

      {/* Genre Selection */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Content We Transform</h2>
            <p className="text-xl text-gray-600">Specialized translation for every type of creative content</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.keys(genres).map((key) => (
              <button
                key={key}
                onClick={() => setActiveGenre(key)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  activeGenre === key 
                    ? 'bg-purple-500 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {genres[key].title}
              </button>
            ))}
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="text-purple-500">{genres[activeGenre].icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900">{genres[activeGenre].title}</h3>
                </div>
                <p className="text-gray-600 mb-6 text-lg">{genres[activeGenre].description}</p>
                <div className="space-y-3">
                  {genres[activeGenre].features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-purple-500" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Examples we handle:</h4>
                <div className="grid grid-cols-1 gap-3">
                  {genres[activeGenre].examples.map((example, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-purple-100">
                      <span className="text-gray-800 font-medium">{example}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Creators Trust Lexivana</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Preserve your creative vision while reaching global audiences
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="group">
                <div className={`bg-${benefit.color}-50 border border-${benefit.color}-200 rounded-2xl p-8 hover:shadow-lg transition-all`}>
                  <div className={`text-${benefit.color}-500 mb-6`}>
                    {benefit.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{benefit.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {benefit.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className={`w-2 h-2 bg-${benefit.color}-400 rounded-full`}></div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Showcases */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">See how authors achieve global success with Lexivana</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {showcases.map((showcase, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative overflow-hidden">
                  <img 
                    src={showcase.image} 
                    alt={showcase.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {showcase.genre}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{showcase.title}</h3>
                  <p className="text-purple-600 font-semibold mb-3">{showcase.author}</p>
                  <p className="text-gray-600 mb-4">{showcase.description}</p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                    <span className="text-green-800 font-semibold text-sm">{showcase.achievement}</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Translated to:</p>
                    <div className="flex flex-wrap gap-2">
                      {showcase.languages.slice(0, 3).map((lang, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {lang}
                        </span>
                      ))}
                      {showcase.languages.length > 3 && (
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          +{showcase.languages.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Creative Translation Features</h2>
            <p className="text-xl text-gray-600">Specialized tools for creative content</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="text-purple-500 mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
            ))}
          </div>
          <blockquote className="text-2xl font-medium text-gray-900 mb-8 leading-relaxed">
            "My debut novel is now available in 12 languages thanks to Lexivana. The translations capture the essence of my characters perfectly - readers in Japan love my protagonist as much as readers in New York do."
          </blockquote>
          <div className="flex items-center justify-center space-x-4">
            <img 
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face" 
              alt="Emma Thompson" 
              className="w-16 h-16 rounded-full"
            />
            <div className="text-left">
              <div className="font-semibold text-gray-900">Emma Thompson</div>
              <div className="text-gray-600">Bestselling Author</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Share Your Story Worldwide?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of creators bringing their stories to global audiences
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Start Translation
            </button>
            <button className="border border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-colors">
              View Samples
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EntertainmentPage;