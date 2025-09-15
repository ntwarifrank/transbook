import Image from "next/image";

const MarketingTranslatorComponent = () => {
  const userTypes = [
    {
      id: 1,
      title: "Independent Authors & Self-Publishers",
      description: "Expand one book into international markets without breaking your budget. Our translation services help you reach Spanish, French, German, and other language readers while maintaining the authentic voice that drives book sales success.",
      image: "https://framerusercontent.com/images/AEquPA8ISWht3a3vBGdtQpIVjiE.webp",
      imageAlt: "Hand writing with pen on paper with geometric shapes"
    },
    {
      id: 2,
      title: "Publishing Houses & Literary Agents",
      description: "Evaluate foreign book market potential quickly and cost-effectively. Generate sample literary translations for rights negotiations and international business development without expensive upfront translation costs.",
      image: "https://framerusercontent.com/images/czQMiJ3OglQS9QxEgXEibiVe6as.webp",
      imageAlt: "Bookstore shelves displaying various colorful books"
    },
    {
      id: 3,
      title: "Academic Authors & Researchers",
      description: "Make scholarly works accessible to global academic professionals. Translate research papers, textbooks, and academic documents with technical accuracy and proper terminology preservation across multiple languages.",
      image: "https://framerusercontent.com/images/6bSBIjOx6SK1q1LkZp37nqfI6j4.webp",
      imageAlt: "Stack of academic books with reading glasses on top"
    },
    {
      id: 4,
      title: "Educational Content Creators",
      description: "Adapt educational materials and instructional documents for international students and institutions. Our professional translation maintains pedagogical effectiveness while ensuring cultural appropriateness for diverse readers.",
      image: "https://framerusercontent.com/images/n38N9TZnCWvaVc67z0ZZpTDA1A.webp",
      imageAlt: "Person with curly hair writing on a whiteboard"
    },
    {
      id: 5,
      title: "Literary Fiction Writers",
      description: "Preserve the artistic essence of creative works across languages. Our book translator understands literary devices, metaphors, and cultural context, adapting them appropriately for target language readers worldwide.",
      image: "https://framerusercontent.com/images/9ZtANUYQwtRD1keRzRJJ80eU3Cs.webp",
      imageAlt: "Open book with pages fanned out"
    },
    {
      id: 6,
      title: "Business & Professional Writers",
      description: "Translate specialized manuals, professional guides, and industry-specific documents with accuracy. Maintain technical precision while ensuring readability for professional readers in different language markets.",
      image: "https://framerusercontent.com/images/mNUfJ1qlVyrHPuAP1UWgqb0dk.webp",
      imageAlt: "Laptop computer with business charts and calculator on desk"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Who Uses Our Marketing Assets Translator?
          </h1>
        </div>

        {/* Grid layout matching the original design */}
        <div className="space-y-16">
          {/* First Row - Two columns side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Independent Authors */}
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="w-full lg:w-80 flex-shrink-0">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white p-4">
                  <Image
                    src={userTypes[0].image}
                    alt={userTypes[0].imageAlt}
                    className="w-full h-64 object-cover rounded-2xl"
                  />
                </div>
              </div>
              <div className="flex-1 space-y-6">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  {userTypes[0].title}
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {userTypes[0].description}
                </p>
              </div>
            </div>

            {/* Publishing Houses */}
            <div className="flex flex-col lg:flex-row-reverse gap-8 items-start">
              <div className="w-full lg:w-80 flex-shrink-0">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white p-4">
                  <Image
                    src={userTypes[1].image}
                    alt={userTypes[1].imageAlt}
                    className="w-full h-64 object-cover rounded-2xl"
                  />
                </div>
              </div>
              <div className="flex-1 space-y-6 lg:text-right">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  {userTypes[1].title}
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {userTypes[1].description}
                </p>
              </div>
            </div>
          </div>

          {/* Second Row - Two columns side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Academic Authors */}
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="w-full lg:w-80 flex-shrink-0">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white p-4">
                  <Image
                    src={userTypes[2].image}
                    alt={userTypes[2].imageAlt}
                    className="w-full h-64 object-cover rounded-2xl"
                  />
                </div>
              </div>
              <div className="flex-1 space-y-6">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  {userTypes[2].title}
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {userTypes[2].description}
                </p>
              </div>
            </div>

            {/* Educational Content Creators */}
            <div className="flex flex-col lg:flex-row-reverse gap-8 items-start">
              <div className="w-full lg:w-80 flex-shrink-0">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white p-4">
                  <Image
                    src={userTypes[3].image}
                    alt={userTypes[3].imageAlt}
                    className="w-full h-64 object-cover rounded-2xl"
                  />
                </div>
              </div>
              <div className="flex-1 space-y-6 lg:text-right">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  {userTypes[3].title}
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {userTypes[3].description}
                </p>
              </div>
            </div>
          </div>

          {/* Third Row - Two columns side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Literary Fiction Writers */}
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="w-full lg:w-80 flex-shrink-0">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white p-4">
                  <Image
                    src={userTypes[4].image}
                    alt={userTypes[4].imageAlt}
                    className="w-full h-64 object-cover rounded-2xl"
                  />
                </div>
              </div>
              <div className="flex-1 space-y-6">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  {userTypes[4].title}
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {userTypes[4].description}
                </p>
              </div>
            </div>

            {/* Business & Professional Writers */}
            <div className="flex flex-col lg:flex-row-reverse gap-8 items-start">
              <div className="w-full lg:w-80 flex-shrink-0">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white p-4">
                  <Image
                    src={userTypes[5].image}
                    alt={userTypes[5].imageAlt}
                    className="w-full h-64 object-cover rounded-2xl"
                  />
                </div>
              </div>
              <div className="flex-1 space-y-6 lg:text-right">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  {userTypes[5].title}
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {userTypes[5].description}
                </p>
              </div>
            </div>
          </div>
        </div>


      </div>

      {/* Chat widget placeholder */}
      <div className="fixed bottom-6 right-6">
        <div className="w-16 h-16 bg-blue-600 hover:bg-blue-700 rounded-full shadow-2xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default MarketingTranslatorComponent;