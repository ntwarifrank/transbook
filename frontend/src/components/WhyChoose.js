"use client"
import { BookOpen, CheckCircle, Sparkles, Diamond, ExternalLink, ThumbsUp } from 'lucide-react';

const WhyChoose = () => {
  const features = [
    {
      id: 1,
      icon: <BookOpen className="w-8 h-8 text-gray-700" />,
      title: "Advanced Literary Understanding",
      description: "Unlike Google Translate or basic translation services, our book translator is trained specifically on published literary translations. It understands narrative structure, character development, and literary devices, ensuring your translated book reads naturally in any target language."
    },
    {
      id: 2,
      icon: <CheckCircle className="w-8 h-8 text-gray-700" />,
      title: "Voice Preservation Technology",
      description: "Maintain your unique writing style across multiple languages. Whether you write conversational literary fiction, formal academic documents, or poetic works, our professional translator preserves the distinctive voice that connects with readers worldwide."
    },
    {
      id: 3,
      icon: <Sparkles className="w-8 h-8 text-gray-700" />,
      title: "Genre-Specific Intelligence",
      description: "Our translation process adapts based on your book's context and genre. Children's books maintain simplicity, technical documents preserve accuracy, poetry retains rhythm, and literary fiction retains emotional resonance, which attracts new readers."
    },
    {
      id: 4,
      icon: <Diamond className="w-8 h-8 text-gray-700" />,
      title: "Superior Quality Control",
      description: "Produce translations ready for international publication without extensive editing or proofreading requirements. Our platform delivers manuscript-quality results that publishers and readers expect, creating better book sales opportunities globally."
    },
    {
      id: 5,
      icon: <ExternalLink className="w-8 h-8 text-gray-700" />,
      title: "Format Flexibility",
      description: "Support for multiple file formats including PDF, DOCX, TXT, and more. Maintain original formatting, chapter structure, and document layout while translating content, ensuring professional presentation across all target languages."
    },
    {
      id: 6,
      icon: <ThumbsUp className="w-8 h-8 text-gray-700" />,
      title: "Seamless Experience",
      description: "Simple three-step process: upload your manuscript, select target language, and download professionally translated content. No complex setup, no lengthy registration process, and no technical expertise required."
    }
  ];

  return (
    <div className="bg-gray-50 py-16 px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose Our Professional Translation Service?
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {features.map((feature) => (
            <div key={feature.id} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              {/* Icon */}
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed text-lg">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Translate Your Book?
            </h3>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of authors who trust our professional translation service to reach global audiences.
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors duration-200">
              Start Translation Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;