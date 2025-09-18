// components/Footer.js
import React from 'react';
import Link from 'next/link';

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

  // WhatsApp Icon Component
  const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
    </svg>
  );

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
                <Link href="/Privacy" className="text-gray-600 hover:text-gray-900">Privacy policy</Link>
                <Link href="/Terms" className="text-gray-600 hover:text-gray-900">Terms of Service</Link>
                <Link href="mailto:info@transbook.ai" className="text-gray-600 hover:text-gray-900">info@transbook.ai</Link>
              </div>
              
              {/* WhatsApp Icon Only */}
              <div className="flex items-center gap-3">
                <a
                  href="https://wa.me/+250793189088"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon />
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