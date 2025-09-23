"use client"
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTrash, faCalendar, faFileAlt, faLanguage } from '@fortawesome/free-solid-svg-icons';
import Navigation from '../../components/navigation';
import Footer from '../../components/footer';

const TranslationHistory = () => {
  const { user, isLoaded } = useUser();
  const [translations, setTranslations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, completed, failed

  const loadTranslationHistory = () => {
    try {
      // Load from localStorage
      const localHistory = localStorage.getItem(`translations_${user.id}`) || '[]';
      const parsedHistory = JSON.parse(localHistory);
      
      // Sort by date (newest first)
      const sortedHistory = parsedHistory.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setTranslations(sortedHistory);
    } catch (error) {
      console.error('Error loading translation history:', error);
      setTranslations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && user) {
      loadTranslationHistory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, user]);


  const downloadTranslation = async (translationId, format = 'pdf', fileName = 'translation') => {
    try {
      const url = `/api/download/${translationId}?format=${format}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`);
      }
      
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${fileName}.${format}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);
      
      console.log(`✅ Downloaded: ${fileName}.${format}`);
    } catch (error) {
      console.error('Download error:', error);
      alert(`Download failed: ${error.message}`);
    }
  };

  const deleteTranslation = (translationId) => {
    if (confirm('Are you sure you want to delete this translation from your history?')) {
      try {
        const updatedTranslations = translations.filter(t => t.id !== translationId);
        setTranslations(updatedTranslations);
        localStorage.setItem(`translations_${user.id}`, JSON.stringify(updatedTranslations));
      } catch (error) {
        console.error('Error deleting translation:', error);
      }
    }
  };

  const clearAllHistory = () => {
    if (confirm('Are you sure you want to clear all translation history? This cannot be undone.')) {
      try {
        localStorage.removeItem(`translations_${user.id}`);
        setTranslations([]);
      } catch (error) {
        console.error('Error clearing history:', error);
      }
    }
  };

  const filteredTranslations = translations.filter(translation => {
    if (filter === 'all') return true;
    return translation.status === filter;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getLanguageName = (code) => {
    const languages = {
      'en': 'English',
      'es': 'Spanish',
      'fr': 'French',
      'de': 'German',
      'it': 'Italian',
      'pt': 'Portuguese',
      'ru': 'Russian',
      'ja': 'Japanese',
      'ko': 'Korean',
      'zh': 'Chinese',
      'ar': 'Arabic',
      'hi': 'Hindi',
      'auto': 'Auto-detect'
    };
    return languages[code] || code;
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your translation history...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Please sign in to view your translation history.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Translation History</h1>
              <p className="mt-2 text-gray-600">
                View and download all your translated documents
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Translations</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
              {translations.length > 0 && (
                <button
                  onClick={clearAllHistory}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FontAwesomeIcon icon={faFileAlt} className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Translations</p>
                <p className="text-2xl font-bold text-gray-900">{translations.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <FontAwesomeIcon icon={faDownload} className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {translations.filter(t => t.status === 'completed').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <FontAwesomeIcon icon={faLanguage} className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Languages</p>
                <p className="text-2xl font-bold text-gray-900">
                  {new Set(translations.map(t => t.targetLanguage)).size}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Translation List */}
        {filteredTranslations.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <FontAwesomeIcon icon={faFileAlt} className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No translations found</h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all' 
                ? "You haven't translated any documents yet. Start by uploading a document!"
                : `No ${filter} translations found. Try changing the filter.`
              }
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
            >
              Start Translating
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTranslations.map((translation) => (
              <div key={translation.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {translation.fileName}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        translation.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : translation.status === 'failed'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {translation.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center text-sm text-gray-600 space-x-4">
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={faCalendar} className="h-4 w-4 mr-1" />
                        {formatDate(translation.createdAt)}
                      </div>
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={faLanguage} className="h-4 w-4 mr-1" />
                        {getLanguageName(translation.originalLanguage)} → {getLanguageName(translation.targetLanguage)}
                      </div>
                      {translation.wordCount && (
                        <div>
                          {translation.wordCount} words
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4 lg:mt-0 flex items-center space-x-3">
                    {translation.status === 'completed' && (
                      <>
                        <button
                          onClick={() => downloadTranslation(translation.translationId, 'pdf', translation.fileName.replace(/\.[^/.]+$/, ''))}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
                        >
                          <FontAwesomeIcon icon={faDownload} className="h-4 w-4 mr-2" />
                          PDF
                        </button>
                        <button
                          onClick={() => downloadTranslation(translation.translationId, 'txt', translation.fileName.replace(/\.[^/.]+$/, ''))}
                          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center"
                        >
                          <FontAwesomeIcon icon={faDownload} className="h-4 w-4 mr-2" />
                          TXT
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => deleteTranslation(translation.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center"
                    >
                      <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default TranslationHistory;
