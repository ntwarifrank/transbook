"use client"
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faTrash, faCheck, faSpinner, faDownload, faExclamationTriangle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Upload, FileText, Book, AlertCircle, RefreshCw } from 'lucide-react';
import Flag from 'react-world-flags';

const BookTranslationUpload = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showToneDropdown, setShowToneDropdown] = useState(false);
  const [showDownloadDropdown, setShowDownloadDropdown] = useState(false);
  const [selectedTone, setSelectedTone] = useState('Professional');
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationProgress, setTranslationProgress] = useState(0);
  const [translationStage, setTranslationStage] = useState('');
  const [translationId, setTranslationId] = useState(null);
  const [extractionId, setExtractionId] = useState(null);
  const [translationResult, setTranslationResult] = useState(null);
  const [extractedContent, setExtractedContent] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [networkStatus, setNetworkStatus] = useState('online');
  const fileInputRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const extractionIntervalRef = useRef(null);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const languages = [
    { code: 'en', name: 'English', flag: 'GB' },
    { code: 'de', name: 'German', flag: 'DE' },
    { code: 'fr', name: 'French', flag: 'FR' },
    { code: 'es', name: 'Spanish', flag: 'ES' },
    { code: 'zh', name: 'Chinese', flag: 'CN' },
    { code: 'ja', name: 'Japanese', flag: 'JP' },
    { code: 'ko', name: 'Korean', flag: 'KR' },
    { code: 'pt', name: 'Portuguese', flag: 'PT' },
    { code: 'it', name: 'Italian', flag: 'IT' },
    { code: 'ru', name: 'Russian', flag: 'RU' },
    { code: 'ar', name: 'Arabic', flag: 'SA' },
  ];

  const tones = [
    'Professional',
    'Casual', 
    'Academic',
    'Creative',
    'Technical',
    'Conversational'
  ];

  const acceptedFormats = ['PDF', 'DOC', 'DOCX', 'TXT'];

  // Check network connectivity
  useEffect(() => {
    const updateNetworkStatus = () => {
      setNetworkStatus(navigator.onLine ? 'online' : 'offline');
    };

    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);

    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
    };
  }, []);

  // Enhanced error handling with retry logic
  const handleApiError = (error, context = 'operation') => {
    console.error(`${context} error:`, error);
    
    let errorMessage = `${context} failed: `;
    let suggestions = [];
    let canRetry = false;

    if (!navigator.onLine) {
      errorMessage += 'No internet connection';
      suggestions.push('Check your internet connection');
    } else if (error.message.includes('NetworkError') || error.message.includes('fetch')) {
      errorMessage += 'Cannot connect to server';
      suggestions.push(`Ensure backend is running on ${API_BASE_URL}`);
      suggestions.push('Check firewall settings');
      canRetry = true;
    } else if (error.message.includes('429') || error.message.includes('Too Many Requests')) {
      errorMessage += 'Rate limit exceeded';
      suggestions.push('Wait 1 minute before retrying');
      suggestions.push('Try smaller documents');
      canRetry = true;
    } else if (error.message.includes('413') || error.message.includes('too large')) {
      errorMessage += 'File too large (max 50MB)';
      suggestions.push('Use a smaller file');
      suggestions.push('Convert to TXT format');
    } else if (error.message.includes('400')) {
      errorMessage += 'Invalid request';
      suggestions.push('Check file format');
      suggestions.push('Ensure all required fields are filled');
    } else if (error.message.includes('500')) {
      errorMessage += 'Server error';
      suggestions.push('Try again in a few minutes');
      suggestions.push('Contact support if problem persists');
      canRetry = true;
    } else {
      errorMessage += error.message;
      canRetry = true;
    }

    return { errorMessage, suggestions, canRetry };
  };

  // Enhanced polling with better error handling
  const pollExtractionProgress = async (extractionId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/extraction-progress/${extractionId}`);
      const data = await response.json();
      
      if (data.success) {
        setTranslationProgress(data.progress || 0);
        setTranslationStage(data.stage || 'Processing...');
        
        if (data.completed && data.extractedContent) {
          setExtractedContent(data.extractedContent);
          setUploadedFile(prev => ({
            ...prev,
            extractedContent: data.extractedContent,
            uploaded: true
          }));
          clearInterval(extractionIntervalRef.current);
          return true;
        }
        
        if (data.failed) {
          const { errorMessage, suggestions } = handleApiError(new Error(data.error), 'PDF extraction');
          setUploadError({ message: errorMessage, suggestions });
          clearInterval(extractionIntervalRef.current);
          return true;
        }
      }
      return false;
    } catch (error) {
      const { errorMessage, suggestions } = handleApiError(error, 'Progress check');
      setUploadError({ message: errorMessage, suggestions });
      return false;
    }
  };

  const pollTranslationProgress = async (translationId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/translation-progress/${translationId}`);
      const data = await response.json();
      
      if (data.success) {
        setTranslationProgress(data.progress || 0);
        setTranslationStage(data.stage || 'Processing...');
        
        if (data.completed) {
          setTranslationResult(data.result);
          setIsTranslating(false);
          clearInterval(progressIntervalRef.current);
          return true;
        }
        
        if (data.failed) {
          const { errorMessage, suggestions, canRetry } = handleApiError(new Error(data.error), 'Translation');
          setUploadError({ message: errorMessage, suggestions, canRetry });
          setIsTranslating(false);
          clearInterval(progressIntervalRef.current);
          return true;
        }
      }
      return false;
    } catch (error) {
      const { errorMessage, suggestions, canRetry } = handleApiError(error, 'Translation progress');
      if (retryCount < 3 && canRetry) {
        setRetryCount(prev => prev + 1);
        // Continue polling
        return false;
      } else {
        setUploadError({ message: errorMessage, suggestions, canRetry });
        setIsTranslating(false);
        clearInterval(progressIntervalRef.current);
        return true;
      }
    }
  };

  // Enhanced file upload with better error handling
  const handleFileUpload = async (file) => {
    setIsUploading(true);
    setUploadError(null);
    setTranslationResult(null);
    setRetryCount(0);

    // Client-side validation
    if (file.size > 50 * 1024 * 1024) {
      setUploadError({
        message: 'File too large (max 50MB)',
        suggestions: ['Use a smaller file', 'Convert to TXT format']
      });
      setIsUploading(false);
      return;
    }

    const allowedExtensions = ['.pdf', '.doc', '.docx', '.txt'];
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    if (!allowedExtensions.includes(fileExtension)) {
      setUploadError({
        message: 'Unsupported file format',
        suggestions: [`Supported formats: ${acceptedFormats.join(', ')}`]
      });
      setIsUploading(false);
      return;
    }

    if (!navigator.onLine) {
      setUploadError({
        message: 'No internet connection',
        suggestions: ['Check your internet connection and try again']
      });
      setIsUploading(false);
      return;
    }

    try {
      console.log('Uploading file:', file.name, `(${(file.size / 1024 / 1024).toFixed(2)}MB)`);
      
      const formData = new FormData();
      formData.append('file', file);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

      const response = await fetch(`${API_BASE_URL}/api/upload-document`, {
        method: 'POST',
        body: formData,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        if (data.requiresProgress && data.extractionId) {
          // PDF processing - start polling
          setExtractionId(data.extractionId);
          setUploadedFile({
            name: file.name,
            size: file.size,
            type: file.type,
            id: data.documentId,
            uploaded: false
          });
          
          extractionIntervalRef.current = setInterval(() => {
            pollExtractionProgress(data.extractionId);
          }, 2000);
          
        } else {
          // Direct processing complete
          setExtractedContent(data.extractedContent);
          setUploadedFile({
            name: file.name,
            size: file.size,
            type: file.type,
            id: data.documentId,
            extractedContent: data.extractedContent,
            uploaded: true
          });
        }
      } else {
        throw new Error(data.message || 'Upload failed');
      }

    } catch (error) {
      if (error.name === 'AbortError') {
        setUploadError({
          message: 'Upload timeout - file too large or connection too slow',
          suggestions: ['Try a smaller file', 'Check your internet connection']
        });
      } else {
        const { errorMessage, suggestions, canRetry } = handleApiError(error, 'Upload');
        setUploadError({ message: errorMessage, suggestions, canRetry });
      }
    } finally {
      setIsUploading(false);
    }
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
    setExtractedContent(null);
    setTranslationProgress(0);
    setTranslationStage('');
    setTranslationResult(null);
    setRetryCount(0);
    clearInterval(progressIntervalRef.current);
    clearInterval(extractionIntervalRef.current);
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

  const retryOperation = () => {
    if (uploadError?.canRetry) {
      if (!uploadedFile && fileInputRef.current?.files[0]) {
        handleFileUpload(fileInputRef.current.files[0]);
      } else if (uploadedFile && selectedLanguage) {
        handleTranslate();
      }
      setUploadError(null);
      setRetryCount(0);
    }
  };

  const handleTranslate = async () => {
    if (!uploadedFile?.extractedContent?.text) {
      setUploadError({
        message: 'No text content available',
        suggestions: ['Upload a file with readable text content']
      });
      return;
    }
    if (!selectedLanguage) {
      setUploadError({
        message: 'No target language selected',
        suggestions: ['Please select a target language']
      });
      return;
    }

    if (!navigator.onLine) {
      setUploadError({
        message: 'No internet connection',
        suggestions: ['Check your internet connection']
      });
      return;
    }

    setIsTranslating(true);
    setTranslationProgress(0);
    setTranslationStage('Starting translation...');
    setUploadError(null);
    setTranslationResult(null);
    setRetryCount(0);

    try {
      const response = await fetch(`${API_BASE_URL}/api/translate-document-complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: uploadedFile.extractedContent.text,
          html: uploadedFile.extractedContent.html,
          structure: uploadedFile.extractedContent.structure,
          targetLanguage: selectedLanguage.code,
          tone: selectedTone,
          fileName: uploadedFile.name
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setTranslationId(data.translationId);
        
        // Start polling for progress
        progressIntervalRef.current = setInterval(() => {
          pollTranslationProgress(data.translationId);
        }, 2000);
        
      } else {
        throw new Error(data.message || 'Translation failed to start');
      }
      
    } catch (error) {
      const { errorMessage, suggestions, canRetry } = handleApiError(error, 'Translation');
      setUploadError({ message: errorMessage, suggestions, canRetry });
      setIsTranslating(false);
    }
  };

  const downloadTranslation = async (format = 'txt') => {
    if (!translationId) return;
    
    try {
      if (format === 'pdf') {
        const response = await fetch(`${API_BASE_URL}/api/download-pdf/${translationId}`);
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `translated_${uploadedFile.name.replace(/\.[^/.]+$/, '')}.pdf`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
          return;
        }
      }
      
      // Fallback to text download
      const blob = new Blob([translationResult], { type: 'text/plain;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `translated_${uploadedFile.name.replace(/\.[^/.]+$/, '')}_${selectedLanguage.code}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Download error:', error);
      const { errorMessage, suggestions } = handleApiError(error, 'Download');
      setUploadError({ message: errorMessage, suggestions });
    }
  };

  const copyToClipboard = async () => {
    if (!translationResult) return;
    
    try {
      await navigator.clipboard.writeText(translationResult);
      // You could add a toast notification here
      console.log('Text copied to clipboard');
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = translationResult;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      console.log('Text copied to clipboard (fallback)');
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Cleanup intervals on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (extractionIntervalRef.current) {
        clearInterval(extractionIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      {/* Network status indicator */}
      {networkStatus === 'offline' && (
        <div className="fixed top-0 left-0 right-0 bg-red-600 text-white py-2 px-4 text-center z-50">
          <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
          No internet connection - Some features may not work
        </div>
      )}

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
            Enhanced Document Translation
          </h1>
          <p className="text-xl text-gray-600">
            AI Translation with Smart Rate Limiting & Error Recovery
          </p>
          <div className="flex items-center justify-center mt-4 space-x-4 text-sm">
            <div className={`flex items-center px-3 py-1 rounded-full ${
              networkStatus === 'online' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              <div className={`w-2 h-2 rounded-full mr-2 ${
                networkStatus === 'online' ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              {networkStatus === 'online' ? 'Online' : 'Offline'}
            </div>
            <div className="text-gray-500">
              Enhanced v2.0 with Rate Limiting
            </div>
          </div>
        </div>

        {/* Main Upload Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {/* Enhanced Error Display */}
          {uploadError && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-red-800 font-semibold mb-2">Error</h3>
                  <p className="text-red-700 mb-3">{uploadError.message}</p>
                  {uploadError.suggestions && uploadError.suggestions.length > 0 && (
                    <div className="mb-3">
                      <p className="text-red-600 text-sm font-medium mb-1">Suggestions:</p>
                      <ul className="list-disc list-inside text-red-600 text-sm space-y-1">
                        {uploadError.suggestions.map((suggestion, index) => (
                          <li key={index}>{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="flex items-center space-x-3">
                    {uploadError.canRetry && (
                      <button
                        onClick={retryOperation}
                        className="flex items-center px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium transition-colors"
                      >
                        <RefreshCw className="w-3 h-3 mr-1" />
                        Retry
                      </button>
                    )}
                    <button
                      onClick={() => setUploadError(null)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Upload File Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Upload Document</h2>
            
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
                  {isUploading ? (
                    <FontAwesomeIcon icon={faSpinner} className="mx-auto h-12 w-12 text-blue-600 mb-4 animate-spin" />
                  ) : (
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  )}
                  <p className="text-blue-600 text-lg mb-2">
                    {isUploading ? 'Processing file...' : 'Upload a file up to 50MB'}
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading || isTranslating || networkStatus === 'offline'}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUploading ? 'Processing...' : 'Upload File'}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileSelect}
                    accept=".pdf,.doc,.docx,.txt"
                  />
                </div>
                <p className="text-blue-600 text-sm">
                  Supported: {acceptedFormats.join(', ')} | Max: 50MB
                </p>
              </div>
            ) : (
              <div className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faFile} className="text-blue-600 text-xl mr-2" />
                      {uploadedFile.uploaded ? (
                        <FontAwesomeIcon icon={faCheck} className="text-green-600 text-sm" />
                      ) : isUploading ? (
                        <FontAwesomeIcon icon={faSpinner} className="text-blue-600 text-sm animate-spin" />
                      ) : null}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{formatFileSize(uploadedFile.size)}</span>
                        {uploadedFile.uploaded ? (
                          <span className="text-green-600 flex items-center">
                            <FontAwesomeIcon icon={faCheck} className="mr-1" />
                            Ready for Translation
                          </span>
                        ) : isUploading ? (
                          <span className="text-blue-600 flex items-center">
                            <FontAwesomeIcon icon={faSpinner} className="mr-1 animate-spin" />
                            Processing...
                          </span>
                        ) : (
                          <span className="text-yellow-600">Pending</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={removeFile}
                    disabled={isTranslating}
                    className="text-gray-400 hover:text-gray-600 p-2 disabled:opacity-50"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>

                {/* Enhanced Content Preview */}
                {extractedContent && (
                  <div className="bg-gray-50 rounded-lg p-4 mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-gray-600 mr-2" />
                        <span className="text-sm font-medium text-gray-700">
                          Content Analysis
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                        {extractedContent.extractionMethod === 'ocr' ? 'OCR' : 
                         extractedContent.extractionMethod === 'selectable_text' ? 'Direct' : 'Processed'}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-600 mb-3">
                      {extractedContent.metadata?.pages && (
                        <div className="bg-white rounded p-2 text-center">
                          <div className="font-semibold">{extractedContent.metadata.pages}</div>
                          <div>Pages</div>
                        </div>
                      )}
                      {extractedContent.metadata?.words && (
                        <div className="bg-white rounded p-2 text-center">
                          <div className="font-semibold">{extractedContent.metadata.words.toLocaleString()}</div>
                          <div>Words</div>
                        </div>
                      )}
                      {extractedContent.metadata?.characters && (
                        <div className="bg-white rounded p-2 text-center">
                          <div className="font-semibold">{extractedContent.metadata.characters.toLocaleString()}</div>
                          <div>Characters</div>
                        </div>
                      )}
                      <div className="bg-white rounded p-2 text-center">
                        <div className="font-semibold text-green-600">Ready</div>
                        <div>Status</div>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-500 bg-white p-3 rounded max-h-24 overflow-y-auto">
                      {extractedContent.text.substring(0, 300)}
                      {extractedContent.text.length > 300 && '...'}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Enhanced Progress Display */}
          {(isUploading || isTranslating) && (
            <div className="mb-8 bg-blue-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Book className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-blue-800 font-semibold">
                  {isUploading ? 'Processing Document' : 'Translation in Progress'}
                </span>
                {retryCount > 0 && (
                  <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                    Retry #{retryCount}
                  </span>
                )}
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between text-sm text-blue-700 mb-1">
                  <span>{translationStage}</span>
                  <span>{translationProgress}%</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${translationProgress}%` }}
                  ></div>
                </div>
              </div>
              
              <p className="text-blue-600 text-sm">
                {isUploading ? 
                  'Analyzing document structure and extracting text...' : 
                  'Translating with enhanced rate limiting - This may take several minutes for large documents'
                }
              </p>
              
              {isTranslating && (
                <div className="mt-2 text-xs text-blue-500">
                  <FontAwesomeIcon icon={faInfoCircle} className="mr-1" />
                  Using smart rate limiting to avoid API restrictions
                </div>
              )}
            </div>
          )}

          {/* Enhanced Translation Result */}
          {translationResult && (
            <div className="mb-8 bg-green-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faCheck} className="text-green-600 mr-2" />
                  <span className="text-green-800 font-semibold">Translation Complete!</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <button
                      onClick={() => setShowDownloadDropdown(!showDownloadDropdown)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"
                    >
                      <FontAwesomeIcon icon={faDownload} className="mr-2" />
                      Download
                      <FontAwesomeIcon icon={faChevronDown} className="ml-2 w-3 h-3" />
                    </button>
                    
                    {showDownloadDropdown && (
                      <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-20 min-w-48">
                        <div className="p-2">
                          <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                            Download Options
                          </div>
                          <button
                            onClick={() => {
                              downloadTranslation('txt');
                              setShowDownloadDropdown(false);
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-gray-50 text-gray-700 transition-colors duration-200 rounded-lg text-sm"
                          >
                            <div className="flex items-center">
                              <FontAwesomeIcon icon={faFile} className="mr-2 text-blue-500" />
                              <div>
                                <div className="font-medium">Text File (.txt)</div>
                                <div className="text-xs text-gray-500">Plain text format</div>
                              </div>
                            </div>
                          </button>
                          
                          <button
                            onClick={() => {
                              downloadTranslation('pdf');
                              setShowDownloadDropdown(false);
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-gray-50 text-gray-700 transition-colors duration-200 rounded-lg text-sm"
                          >
                            <div className="flex items-center">
                              <FontAwesomeIcon icon={faFile} className="mr-2 text-red-600" />
                              <div>
                                <div className="font-medium">PDF Document</div>
                                <div className="text-xs text-gray-500">Formatted PDF</div>
                              </div>
                            </div>
                          </button>
                          
                          <button
                            onClick={() => {
                              copyToClipboard();
                              setShowDownloadDropdown(false);
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-gray-50 text-gray-700 transition-colors duration-200 rounded-lg text-sm"
                          >
                            <div className="flex items-center">
                              <FontAwesomeIcon icon={faCheck} className="mr-2 text-green-500" />
                              <div>
                                <div className="font-medium">Copy to Clipboard</div>
                                <div className="text-xs text-gray-500">Copy translated text</div>
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 max-h-60 overflow-y-auto border">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Flag code={selectedLanguage.flag} className="w-4 h-3 rounded mr-1" />
                        <span className="font-medium">{selectedLanguage.name}</span>
                      </div>
                      <div>Tone: <span className="font-medium">{selectedTone}</span></div>
                      <div>Words: <span className="font-medium">{translationResult.split(' ').length.toLocaleString()}</span></div>
                    </div>
                  </div>
                </div>
                <div className="text-gray-800 whitespace-pre-wrap leading-relaxed text-sm">
                  {translationResult}
                </div>
              </div>
              
              {/* Enhanced Translation Stats */}
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="bg-white rounded-lg p-3 text-center">
                  <div className="text-lg font-semibold text-green-600">{translationResult.split(' ').length.toLocaleString()}</div>
                  <div className="text-gray-500">Words</div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center">
                  <div className="text-lg font-semibold text-green-600">{translationResult.length.toLocaleString()}</div>
                  <div className="text-gray-500">Characters</div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center">
                  <div className="text-lg font-semibold text-green-600">{translationResult.split(/[.!?]+/).length - 1}</div>
                  <div className="text-gray-500">Sentences</div>
                </div>
                <div className="bg-white rounded-lg p-3 text-center">
                  <div className="text-lg font-semibold text-green-600">{selectedLanguage.code.toUpperCase()}</div>
                  <div className="text-gray-500">Language</div>
                </div>
              </div>
            </div>
          )}

          {/* Translate To Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Translation Settings</h2>
            
            {/* Selected Language Display */}
            {selectedLanguage && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Flag code={selectedLanguage.flag} className="w-6 h-4 rounded" />
                    <div>
                      <span className="font-semibold text-blue-800">{selectedLanguage.name}</span>
                      <span className="text-blue-600 text-sm ml-2">({selectedLanguage.code.toUpperCase()})</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedLanguage('')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Change Language
                  </button>
                </div>
              </div>
            )}
            
            {/* Language Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => selectLanguage(language)}
                  disabled={isTranslating || isUploading || networkStatus === 'offline'}
                  className={`flex items-center space-x-2 px-3 py-3 rounded-xl border transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm hover:shadow-md ${
                    selectedLanguage?.code === language.code
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md ring-2 ring-blue-200'
                      : 'border-gray-300 hover:border-blue-300 text-gray-700 hover:bg-blue-50'
                  }`}
                >
                  <Flag code={language.flag} className="w-5 h-4 rounded shadow-sm" />
                  <span className="font-medium">{language.name}</span>
                </button>
              ))}
            </div>

            {/* Enhanced Tone Selection */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Translation Style:</span>
              <div className="relative">
                <button
                  onClick={() => setShowToneDropdown(!showToneDropdown)}
                  disabled={isTranslating || isUploading || networkStatus === 'offline'}
                  className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 text-gray-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-w-32"
                >
                  <span className="font-medium">{selectedTone}</span>
                  <FontAwesomeIcon icon={faChevronDown}
                    className={`w-3 h-3 ml-2 transition-transform duration-200 ${showToneDropdown ? 'rotate-180' : ''}`}
                  />
                </button>
                
                {showToneDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
                    {tones.map((tone) => (
                      <button
                        key={tone}
                        onClick={() => selectTone(tone)}
                        className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl ${
                          selectedTone === tone ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                        }`}
                      >
                        {tone}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Translate Button */}
          <button
            onClick={handleTranslate}
            disabled={
              !uploadedFile?.extractedContent?.text || 
              !selectedLanguage || 
              isTranslating || 
              isUploading || 
              networkStatus === 'offline'
            }
            className={`w-full py-4 rounded-xl text-white text-lg font-semibold transition-all duration-200 ${
              (!uploadedFile?.extractedContent?.text || !selectedLanguage || isTranslating || isUploading || networkStatus === 'offline')
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02]'
            }`}
          >
            {isTranslating ? (
              <div className="flex items-center justify-center">
                <FontAwesomeIcon icon={faSpinner} className="animate-spin mr-2" />
                Translating with Smart Rate Limiting...
              </div>
            ) : networkStatus === 'offline' ? (
              <div className="flex items-center justify-center">
                <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
                No Internet Connection
              </div>
            ) : (
              'Start Enhanced Translation'
            )}
          </button>
          
          {/* Enhanced Status */}
          <div className="mt-4 text-center text-sm text-gray-500">
            <div className="flex items-center justify-center space-x-4">
              <div>Powered by Google Translate API</div>
              <div>•</div>
              <div>Enhanced Rate Limiting</div>
              <div>•</div>
              <div>Error Recovery</div>
            </div>
            {retryCount > 0 && (
              <div className="mt-1 text-yellow-600">
                Auto-retry mechanism active ({retryCount}/3 attempts)
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showToneDropdown || showDownloadDropdown) && (
        <div 
          className="fixed inset-0 z-5"
          onClick={() => {
            setShowToneDropdown(false);
            setShowDownloadDropdown(false);
          }}
        />
      )}
    </div>
  );
};

export default BookTranslationUpload;