"use client"
import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navigationItems = [
    { 
      name: 'Tools', 
      hasDropdown: true,
      items: [
        { name: 'AI Dubbing', to: '/tools/ai-dubbing' },
        { name: 'Voice Cloning', to: '/tools/voice-cloning' },
        { name: 'Video Translation', to: '/tools/video-translation' },
        { name: 'Audio Translation', to: '/tools/audio-translation' }
      ]
    },
    { 
      name: 'Free tools', 
      hasDropdown: true,
      items: [
        { name: 'Free Dubbing', to: '/free-tools/dubbing' },
        { name: 'Free Translation', to: '/free-tools/translation' },
        { name: 'Voice Generator', to: '/free-tools/voice-generator' },
        { name: 'Subtitle Generator', to: '/free-tools/subtitle-generator' }
      ]
    },
    { 
      name: 'Use Cases', 
      hasDropdown: true,
      items: [
        { name: 'Education', to: '/use-case/education' },
        { name: 'Marketing', to: '/use-case/marketing' },
        { name: 'Entertainment', to: '/use-case/entertainment' },
        { name: 'Corporate Training', to: '/use-case/corporate-training' }
      ]
    },
    { name: 'Pricing', to: "/Pricing", hasDropdown: false },
    { 
      name: 'Resources', 
      hasDropdown: true,
      items: [
        { name: 'Documentation', to: '/resources/documentation' },
        { name: 'Tutorials', to: '/resources/tutorials' },
        { name: 'Case Studies', to: '/resources/case-studies' },
        { name: 'Help Center', to: '/resources/help-center' }
      ]
    },
    { name: 'Blog', to: '/blog', hasDropdown: false }
  ];

  const toggleDropdown = (itemName) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveDropdown(null);
  };


  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex flex-row">
            <Image src="/logo.png" width={40} height={40} alt="logo" />
            <div className="flex items-center">
              <div className="bg-gradient-to-r bg-clip-text text-transparent from-blue-600 to-purple-600 pl-2 py-1 font-bold text-2xl">
                lexi
              </div>
              <span className="text-2xl font-bold text-gray-900">vana</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative">
                {item.to ? (
                  <Link href={item.to} className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200">
                    {item.name}
                  </Link>
                ) : (
                  <button
                    className="flex items-center text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
                    onClick={() => item.hasDropdown && toggleDropdown(item.name)}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDown 
                        className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`} 
                      />
                    )}
                  </button>
                )}
                
                {/* Dropdown Menu */}
                {item.hasDropdown && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {item.items.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.name}
                        href={dropdownItem.to}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right side items */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button 
                className="flex items-center text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
                onClick={() => toggleDropdown('language')}
              >
                <span className="mr-1">🇺🇸</span>
                En
                <ChevronDown 
                  className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                    activeDropdown === 'language' ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              {activeDropdown === 'language' && (
                <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                    <span className="mr-2">🇺🇸</span>
                    English
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                    <span className="mr-2">🇪🇸</span>
                    Español
                  </a>
                </div>
              )}
            </div>

            {/* Authentication Section */}
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Link
                href="/sign-in"
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Log in
              </Link>
              <Link
                href="/sign-up"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              >
                Try it free
              </Link>
            </SignedOut>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-gray-900 p-2"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  {item.to ? (
                    <Link 
                      href={item.to} 
                      className="block text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 text-base font-medium rounded-md transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <button
                      className="w-full flex justify-between items-center text-left text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 text-base font-medium rounded-md transition-colors duration-200"
                      onClick={() => item.hasDropdown && toggleDropdown(item.name)}
                    >
                      {item.name}
                      {item.hasDropdown && (
                        <ChevronDown 
                          className={`h-4 w-4 transition-transform duration-200 ${
                            activeDropdown === item.name ? 'rotate-180' : ''
                          }`} 
                        />
                      )}
                    </button>
                  )}
                  
                  {item.hasDropdown && activeDropdown === item.name && (
                    <div className="pl-4 space-y-1">
                      {item.items.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          href={dropdownItem.to}
                          className="block text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 text-sm rounded-md transition-colors duration-200"
                          onClick={() => {
                            setActiveDropdown(null);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <SignedIn>
                  <div className="flex items-center space-x-3 px-3 py-2">
                    <UserButton afterSignOutUrl="/" />
                    <p className="text-base font-medium text-gray-900">My Account</p>
                  </div>
                </SignedIn>
                <SignedOut>
                  <div className="flex flex-col space-y-2">
                    <Link
                      href="/sign-in"
                      className="block text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 text-base font-medium rounded-md transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link
                      href="/sign-up"
                      className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-base font-medium text-center transition-colors duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Try it free
                    </Link>
                  </div>
                </SignedOut>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop for closing dropdowns */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </nav>
  );
};

export default Navigation;