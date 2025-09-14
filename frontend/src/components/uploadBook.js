"use client"
import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Upload, X } from 'lucide-react';
import Flag from 'react-world-flags';

const BookTranslationUpload = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showToneDropdown, setShowToneDropdown] = useState(false);
  const [selectedTone, setSelectedTone] = useState('Select tone');
  const [linkInput, setLinkInput] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', flag: 'GB' },
    { code: 'de', name: 'German', flag: 'DE' },
    { code: 'fr', name: 'French', flag: 'FR' },
    { code: 'es', name: 'Spanish', flag: 'ES' },
  ];

  const tones = [
    'Professional',
    'Casual',
    'Academic',
    'Creative',
    'Technical',
    'Conversational'
  ];

  const acceptedFormats = ['PDF', 'DOC', 'DOCX', 'PPT', 'PPTX', 'AI', 'TXT'];

  const handleFileUpload = (file) => {
    // Simulate file upload
    setUploadedFile({
      name: file.name,
      size: file.size
    });
    setUploadError(null);

    // Simulate an error for demonstration
    setTimeout(() => {
      setUploadError('Translation error: Download failed: Request failed with status code 456');
    }, 1000);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const selectLanguage = (language) => {
    setSelectedLanguage(language);
    setShowLanguageDropdown(false);
  };

  const selectTone = (tone) => {
    setSelectedTone(tone);
    setShowToneDropdown(false);
  };

  const handleTranslate = () => {
    if (!uploadedFile && !linkInput) {
      alert('Please upload a file or paste a link');
      return;
    }
    if (!selectedLanguage) {
      alert('Please select a target language');
      return;
    }
    // Handle translation logic here
    console.log('Starting translation...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-purple-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-blue-300 rounded-full opacity-15 blur-xl"></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-purple-300 rounded-full opacity-15 blur-xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Professional Book Translation
          </h1>
          <p className="text-xl text-gray-600">
            AI-Powered Book Translation - No Registration Required
          </p>
        </div>

        {/* Main Upload Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {/* Upload File Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Upload file</h2>
            
            {!uploadedFile ? (
              <div
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                  isDragOver 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <div className="mb-6">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-blue-600 text-lg mb-2">Upload a file up to 10MB</p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-colors duration-200"
                  >
                    Upload a file
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileSelect}
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.ai,.txt"
                  />
                </div>
                <p className="text-blue-600 text-sm">
                  {acceptedFormats.join(', ')}
                </p>
              </div>
            ) : (
              <div className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FontAwesomeIcon icon={faFile} className="text-blue-600 text-xl" />
                    <div>
                      <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                      <p className="text-sm text-gray-500">Uploaded</p>
                    </div>
                  </div>
                  <button
                    onClick={removeFile}
                    className="text-gray-400 hover:text-gray-600 p-2"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
                {uploadError && (
                  <div className="mt-3 text-red-600 text-sm">
                    {uploadError}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Link Input Section */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="or Paste a link"
              value={linkInput}
              onChange={(e) => setLinkInput(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-700"
            />
          </div>

          {/* Translate To Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Translate to</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => selectLanguage(language)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl border transition-all duration-200 ${
                    selectedLanguage?.code === language.code
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400 text-gray-700'
                  }`}
                >
                  <Flag code={language.flag} className="w-5 h-4 rounded" />
                  <span className="font-medium">{language.name}</span>
                </button>
              ))}
              
              {/* Other Languages Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className="flex items-center justify-between w-full px-4 py-3 border border-gray-300 rounded-xl hover:border-gray-400 text-gray-700 transition-all duration-200"
                >
                  <span className="font-medium">Other</span>
                  <FontAwesomeIcon 
                    icon={faChevronDown} 
                    className={`transition-transform duration-200 ${showLanguageDropdown ? 'rotate-180' : ''}`}
                  />
                </button>
                
                {showLanguageDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                    {['Chinese', 'Japanese', 'Korean', 'Portuguese', 'Italian', 'Russian', 'Arabic'].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          selectLanguage({ code: lang.toLowerCase(), name: lang });
                          setShowLanguageDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 transition-colors duration-200"
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Tone Selection */}
            <div className="relative max-w-xs">
              <button
                onClick={() => setShowToneDropdown(!showToneDropdown)}
                className="flex items-center justify-between w-full px-4 py-3 border border-gray-300 rounded-xl hover:border-gray-400 text-gray-700 transition-all duration-200"
              >
                <span className="font-medium">{selectedTone}</span>
                <FontAwesomeIcon icon={faChevronDown}
                  className={`w-4 h-4 transition-transform duration-200 ${showToneDropdown ? 'rotate-180' : ''}`}
                />
              </button>
              
              {showToneDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                  {tones.map((tone) => (
                    <button
                      key={tone}
                      onClick={() => selectTone(tone)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl"
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Translate Button */}
          <button
            onClick={handleTranslate}
            disabled={(!uploadedFile && !linkInput) || !selectedLanguage}
            className={`w-full py-4 rounded-xl text-white text-lg font-semibold transition-all duration-200 ${
              (!uploadedFile && !linkInput) || !selectedLanguage
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02]'
            }`}
          >
            Translate
          </button>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showLanguageDropdown || showToneDropdown) && (
        <div 
          className="fixed inset-0 z-5"
          onClick={() => {
            setShowLanguageDropdown(false);
            setShowToneDropdown(false);
          }}
        />
      )}
    </div>
  );
};

export default BookTranslationUpload;