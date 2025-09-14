"use client"
import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';


const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navigationItems = [
    { 
      name: 'Tools', 
      hasDropdown: true,
      items: ['AI Dubbing', 'Voice Cloning', 'Video Translation', 'Audio Translation']
    },
    { 
      name: 'Free tools', 
      hasDropdown: true,
      items: ['Free Dubbing', 'Free Translation', 'Voice Generator', 'Subtitle Generator']
    },
    { 
      name: 'Use Cases', 
      hasDropdown: true,
      items: ['Education', 'Marketing', 'Entertainment', 'Corporate Training']
    },
    { name: 'Pricing', hasDropdown: false },
    { 
      name: 'Resources', 
      hasDropdown: true,
      items: ['Documentation', 'Tutorials', 'Case Studies', 'Help Center']
    },
    { name: 'Blog', hasDropdown: false }
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
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600  p-8 text-white font-bold text-xl px-2 py-1 rounded-xl">
                Trans
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">Book</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative">
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
                
                {/* Dropdown Menu */}
                {item.hasDropdown && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {item.items.map((dropdownItem) => (
                      <a
                        key={dropdownItem}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
                      >
                        {dropdownItem}
                      </a>
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
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                    <span className="mr-2">🇫🇷</span>
                    Français
                  </a>
                </div>
              )}
            </div>

            {/* Log in */}
            <a
              href="/auth"
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
            >
              Log in
            </a>

            {/* Try it free button */}
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white px-4 py-2 text-sm font-medium transition-colors duration-200">
              Try it free
            </button>

            {/* Book a demo button */}
            <button className="border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
              Book a demo
            </button>
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
                  
                  {/* Mobile Dropdown */}
                  {item.hasDropdown && activeDropdown === item.name && (
                    <div className="pl-4 space-y-1">
                      {item.items.map((dropdownItem) => (
                        <a
                          key={dropdownItem}
                          href="#"
                          className="block text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 text-sm rounded-md transition-colors duration-200"
                        >
                          {dropdownItem}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Mobile actions */}
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <button className="flex items-center text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 text-base font-medium rounded-md w-full transition-colors duration-200">
                  <span className="mr-2">🇺🇸</span>
                  En
                </button>
                <a
                  href="#"
                  className="block text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 text-base font-medium rounded-md transition-colors duration-200"
                >
                  Log in
                </a>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-base font-medium transition-colors duration-200">
                  Try it free
                </button>
                <button className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg text-base font-medium transition-colors duration-200">
                  Book a demo
                </button>
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