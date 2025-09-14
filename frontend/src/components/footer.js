import React from 'react';
import { Twitter, Linkedin, Instagram, MessageCircle } from 'lucide-react';

const Footer = () => {
  const footerData = {
    product: [
      'Pricing',
      'Transcription and translation control',
      'Timestamps control',
      'VoiceCloning',
      'Speakers control',
      'Multispeakers',
      'Ai-rewriter',
      'API'
    ],
    company: [
      'Customers',
      'Awards',
      'Compliance'
    ],
    useCases: [
      'Localisation Agencies',
      'Learning & Development',
      'Marketing',
      'Video Editing'
    ],
    resources: [
      'Enterprise',
      'AI Dubbing API'
    ],
    tools: [
      'Transcribe YouTube video',
      'Video translator',
      'Transcription',
      'Video to text',
      'Add subtitles',
      'Audio Translator',
      'Transcript for podcast',
      'Text-to-speech',
      'Convert Audio to Text',
      'Subtitle Generator',
      'Subtitle Translator',
      'Lip Sync',
      'See all'
    ],
    freeTools: [
      'Free Document Translator',
      'Free Subtitle Generator',
      'Free AI Dubbing',
      'Free Subtitle Translator',
      'Free Video Transcription',
      'Marketing Assets Translator',
      'Free Book Translator'
    ]
  };

  const socialIcons = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: MessageCircle, href: '#', label: 'Discord' },
    { icon: Instagram, href: '#', label: 'Instagram' }
  ];

  return (
    <footer className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-16">
          {/* Product Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3">
              {footerData.product.map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              {footerData.company.map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            
            <h3 className="font-semibold text-gray-900 mb-4 mt-8">Resources</h3>
            <ul className="space-y-3">
              {footerData.resources.map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Use Cases Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Use Cases</h3>
            <ul className="space-y-3">
              {footerData.useCases.map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Tools</h3>
            <ul className="space-y-3">
              {footerData.tools.map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Free Tools Column */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-semibold text-gray-900 mb-4">Free Tools</h3>
            <ul className="space-y-3">
              {footerData.freeTools.map((item, index) => (
                <li key={index}>
                  <a href="#" className={`hover:text-gray-900 transition-colors text-sm ${
                    item === 'Free Book Translator' ? 'text-gray-900 underline font-medium' : 'text-gray-600'
                  }`}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Community Section */}
        <div className="bg-white rounded-2xl p-8 mb-12 border border-gray-200">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-semibold text-gray-900">Join our AI experts</h2>
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-orange-400 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-blue-400 border-2 border-white"></div>
                </div>
                <span className="text-2xl font-semibold text-gray-900">community</span>
              </div>
              <p className="text-gray-600 text-lg max-w-2xl">
                Meet and learn from creators & companies who share how they use AI to create better content at lightning speed
              </p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition-colors">
              Join
            </button>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="text-sm text-gray-600">
              <p>© 2025 TransBook AI. All rights reserved.</p>
              <p className="mt-1">
                Part of <a href="#" className="underline hover:text-gray-900">Brask Inc.</a> – a global AI content company.
              </p>
              <p className="text-xs mt-1">GREEN, STE A, Dover, Kent, DE, 19901, US</p>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-sm">
                <a href="#" className="text-gray-600 hover:text-gray-900">Privacy policy</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Terms of Service</a>
                <a href="mailto:info@rask.ai" className="text-gray-600 hover:text-gray-900">info@transbook.ai</a>
              </div>
              
              <div className="flex items-center gap-3">
                {socialIcons.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                      aria-label={social.label}
                    >
                      <IconComponent size={18} />
                    </a>
                  );
                })}
                <a
                  href="#"
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                  aria-label="TikTok"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;