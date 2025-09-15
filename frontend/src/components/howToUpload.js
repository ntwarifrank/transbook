"use client"
import { Upload, FileText, Globe, CheckCircle } from 'lucide-react';
import Flag from "react-world-flags"

const HowToUploadBook = () => {
  const supportedLanguages = [
    { code: 'es', name: 'Spanish', flag: 'ES', color: 'bg-red-500' },
    { code: 'fr', name: 'French', flag: 'FR', color: 'bg-blue-500' },
    { code: 'de', name: 'German', flag: 'DE', color: 'bg-gray-800' },
    { code: 'pt', name: 'Portuguese', flag: 'PT', color: 'bg-green-600' },
    { code: 'it', name: 'Italian', flag: 'IT', color: 'bg-green-500' },
    { code: 'zh', name: 'Chinese', flag: 'CN', color: 'bg-red-700' },
    { code: 'ja', name: 'Japanese', flag: 'JP', color: 'bg-red-600' },
    { code: 'ko', name: 'Korean', flag: 'KR', color: 'bg-blue-600' }
  ];

  const features = [
    "Preserves literary style and tone",
    "Maintains character dialogue authenticity", 
    "Supports 33+ language pairs",
    "Professional-grade accuracy"
  ];

  const steps = [
    {
      id: 1,
      title: "Upload Your Document",
      description: "Securely upload your book file in PDF, DOCX, or TXT format. Our advanced system supports files up to 10MB, ensuring compatibility with manuscripts, novels, academic texts, and technical documents from any writing platform.",
      
      visual: (
        <div className="relative group">
          <div className="w-40 h-[120px] bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-blue-300 hover:border-blue-500 transition-colors duration-300">
            <div className="text-center">
              <Upload className="w-12 h-12 text-blue-500 mx-auto mb-3" />
              <div className="text-sm font-medium text-blue-700">Drop file here</div>
            </div>
            <div className=" absolute text-xs text-gray-500 font-medium mt-24">
            PDF • DOCX • TXT
            </div>
          </div>
          
        </div>
      )
    },
    {
      id: 2,
      title: "Select Target Language", 
      description: "Choose from our extensive selection of languages including Spanish, French, German, Portuguese, Italian, Chinese, Japanese, and 25+ additional options. Each translation is optimized for cultural nuance and linguistic accuracy.",
      icon: <Globe className="w-8 h-8 text-green-600" />,
      visual: (
        <div className="relative">
          <div className="grid grid-cols-4 gap-3 mb-4">
            {supportedLanguages.slice(0, 4).map((lang) => (
              <div 
                key={lang.code}
                className="w-12 h-9 bg-white rounded-lg shadow-md hover:shadow-lg border border-gray-200 flex items-center justify-center text-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                title={lang.name}
              >
                {lang.flag}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-3">
            {supportedLanguages.slice(4, 8).map((lang) => (
              <div 
                key={lang.code}
                className="w-12 h-9 bg-white rounded-lg shadow-md hover:shadow-lg border border-gray-200 flex items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
                title={lang.name}
              >
                <Flag code={lang.flag} className="w-8 h-6 object-cover" />
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
              +25 more languages
            </span>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Download Translation",
      description: "Receive your professionally translated document in minutes. Each translation undergoes quality assurance checks to ensure accuracy, readability, and preservation of your original work's intent and style.",
      
      visual: (
        <div className="relative">
          <div className="w-45 h-32 bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl flex items-center justify-center border border-purple-200 hover:border-purple-400 transition-colors duration-300">
            <div className="text-center">
              <div className="relative">
                <FileText className="w-12 h-12 text-purple-500 mx-auto mb-2" />
                <CheckCircle className="w-6 h-6 text-green-500 absolute -top-1 -right-1" />
              </div>
              <div className="text-sm font-medium text-purple-700">Ready to download</div>
            </div>
            <div className="absolute bottom-2 left-7 transform text-xs text-gray-500 font-medium">
             Same format as original
          </div>
          </div>
          
        </div>
      )
    }
  ];

  return (
    <div className="bg-white py-20 px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
            <Globe className="w-4 h-4 mr-2" />
            Professional Translation Service
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            How to Translate Your Book
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform your literary work for global audiences with our AI-powered translation platform that preserves style, tone, and cultural context.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid lg:grid-cols-3 gap-16 mb-20">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-lg z-10">
                {step.id}
              </div>
              
              {/* Visual Component */}
              <div className="flex justify-center mb-10">
                {step.visual}
              </div>

              {/* Content */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {step.description}
                </p>
              </div>

              {/* Connection Line (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 -right-8 w-16 h-px bg-gray-300">
                  <div className="absolute right-0 top-0 w-2 h-2 bg-gray-400 rounded-full transform translate-x-1 -translate-y-1"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-gray-50 rounded-3xl p-12 mb-16">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Why Choose Our Translation Service?
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />
                  <span className="text-lg text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-6">
            Ready to Reach Global Readers?
          </h3>
          <p className="text-xl text-blue-100 leading-relaxed mb-8">
            Join thousands of authors and publishers who trust our platform to deliver accurate, culturally-sensitive translations that preserve the essence of their original work while making it accessible to international audiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors duration-300">
              Start Translation
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors duration-300">
              View Pricing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToUploadBook;