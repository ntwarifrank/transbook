import React from 'react';
import { 
  MessageCircle, 
  CheckCircle, 
  Globe, 
  Diamond, 
  Zap, 
  RotateCcw,
  Maximize2,
  Share2,
  FileText
} from 'lucide-react';

const TranslationAdvantages = ({ videoUrl = "https://static.rask.ai/webflow/VD_free_tool_video.mp4" } = {}) => {
  const advantages = [
    {
      icon: <MessageCircle className="w-8 h-8 text-gray-700" />,
      title: "Literary Context Awareness",
      description: "Our book translator understands the importance of context in different genres. Each translation project receives specialized treatment that preserves unique requirements and reader expectations better than generic translation services."
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-gray-700" />,
      title: "Character Voice Consistency",
      description: "Maintain distinct character voices throughout literary fiction works. Our software recognizes dialogue patterns and personality traits, ensuring each character sounds consistent in the translated version across all file formats."
    },
    {
      icon: <Globe className="w-8 h-8 text-gray-700" />,
      title: "Cultural Adaptation Intelligence",
      description: "Beyond literal translation, our platform adapts cultural references and context-specific elements to resonate with target language readers while preserving original text meaning and emotional impact."
    },
    {
      icon: <Diamond className="w-8 h-8 text-gray-700" />,
      title: "Professional Quality Assurance",
      description: "Complete book translation projects that require minimal editing or proofread work. Our translation process produces clean, readable results that flow naturally, reducing post-translation revision time significantly."
    },
    {
      icon: <Zap className="w-8 h-8 text-gray-700" />,
      title: "Multi-Language Expertise",
      description: "Whether translating to Spanish, French, German, Portuguese, Italian, Chinese, or Japanese, our professional translator applies appropriate methodologies for each language's unique requirements and cultural context."
    },
    {
      icon: <RotateCcw className="w-8 h-8 text-gray-700" />,
      title: "Speed Without Compromise",
      description: "Complete professional translation projects in hours, not months. Quality results delivered quickly enough to meet publishing deadlines and international business opportunities while maintaining accuracy."
    },
    {
      icon: <Maximize2 className="w-8 h-8 text-gray-700" />,
      title: "Global Market Access",
      description: "Open doors to international book sales with professional translation quality. Reach Spanish-speaking markets, European readers, and global audiences with confidence in translation accuracy and literary preservation."
    },
    {
      icon: <Share2 className="w-8 h-8 text-gray-700" />,
      title: "Publishing Platform Compatibility",
      description: "Translated documents work seamlessly with publishing software, printing services, and EPUB conversion tools, streamlining your path to international publication and reaching new readers worldwide."
    },
    {
      icon: <FileText className="w-8 h-8 text-gray-700" />,
      title: "Consistent Terminology Handling",
      description: "Our system tracks key terms, names, and recurring phrases throughout the book to ensure consistency from start to finish, preserving narrative clarity and professional polish."
    }
  ];

  const additionalFeatures = [
    "AI translation in 130+ languages with lip-sync",
    "Voice-clone support for 32 languages", 
    "Editable SRT with multi-speaker support and timestamp control",
    "Dedicated teamspaces for real-time collaboration",
    "API to integrate full localization into your platform"
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Key Advantages of Our Translation Software
          </h1>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {advantages.map((advantage, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
                {advantage.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {advantage.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Features Section */}
        <div className="bg-white rounded-3xl p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Need More Features?
              </h2>
              <div className="space-y-4 mb-8">
                {additionalFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors duration-300">
                Try it now for free
              </button>
            </div>
            
            {/* Video Section */}
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-teal-400 rounded-2xl p-6">
                {videoUrl ? (
                  <div className="bg-white rounded-xl p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="text-sm text-gray-500">▶ Download this video</div>
                    </div>
                    
                    {/* Real Video Player */}
                    <div className="rounded-lg overflow-hidden">
                      <video
                        className="w-full h-auto rounded-lg"
                        controls
                        poster="/api/placeholder/640/360"
                      >
                        <source src={videoUrl} type="video/mp4" />
                        <source src={videoUrl} type="video/webm" />
                        <source src={videoUrl} type="video/ogg" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="text-sm text-gray-500">▶ Download this video</div>
                    </div>
                    
                    {/* Video Grid Mockup (fallback) */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
                        <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                      </div>
                      <div className="bg-gray-300 rounded-lg aspect-video flex items-center justify-center">
                        <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
                      </div>
                      <div className="bg-gray-300 rounded-lg aspect-video flex items-center justify-center">
                        <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
                      </div>
                      <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
                        <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Video Controls Mockup */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 text-gray-600">▶</div>
                        <span className="text-sm text-gray-600">0:00 / 0:53</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 text-gray-600">🔊</div>
                        <div className="w-5 h-5 text-gray-600">⛶</div>
                        <div className="w-5 h-5 text-gray-600">⋮</div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="text-center text-white">
                  <p className="font-semibold mb-2">OVER 2,000,000 HAPPY USERS</p>
                  <div className="flex justify-center items-center space-x-6 opacity-80">
                    <span className="text-sm">amazon</span>
                    <span className="text-sm">SEMRUSH</span>
                    <span className="text-sm">紫牛</span>
                    <span className="text-sm">Dilloncom</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslationAdvantages;