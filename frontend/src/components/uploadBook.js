"use client"
import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faDownload, faSpinner, faCheck, faExclamationTriangle, faChevronDown, faFile, faTrash } from '@fortawesome/free-solid-svg-icons';
import PricingModal from './PricingModal';
import Flag from 'react-world-flags';
import { Zap, AlertCircle, RefreshCw, FileText, Book } from 'lucide-react';
import { saveToHistory } from '../lib/historyUtils';
import usePaddle from '../hooks/usePaddle';


const BookTranslationUpload = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [showToneDropdown, setShowToneDropdown] = useState(false);
  const [showDownloadDropdown, setShowDownloadDropdown] = useState(false);
  const [selectedTone, setSelectedTone] = useState('Professional');
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationProgress, setTranslationProgress] = useState(0);
  const [translationStage, setTranslationStage] = useState('');
  const [translationId, setTranslationId] = useState(null);
  const [translationResult, setTranslationResult] = useState(null);
  const [extractedContent, setExtractedContent] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [networkStatus, setNetworkStatus] = useState('online');
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [translationCost, setTranslationCost] = useState(0);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [translationComplete, setTranslationComplete] = useState(false);
  const fileInputRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const extractionIntervalRef = useRef(null);
  const router = useRouter();
  const { user, isSignedIn } = useUser();
  const { paddle, isLoading: isPaddleLoading, error: paddleError } = usePaddle();
  const [userCredits, setUserCredits] = useState(0);
  const [isFetchingCredits, setIsFetchingCredits] = useState(true);
  
  const MONTHLY_FREE_CREDITS = 5000;

  const checkAndRefreshMonthlyCredits = useCallback(async (userData) => {
    if (!userData) return;
    const now = new Date();
    const lastRefreshDate = userData.publicMetadata?.lastCreditRefresh;
    const userPlan = userData.publicMetadata?.plan || 'free';
    if (userPlan !== 'free') return;
    
    let needsRefresh = false;
    if (!lastRefreshDate) {
      needsRefresh = true;
    } else {
      const lastRefresh = new Date(lastRefreshDate);
      if (now.getFullYear() > lastRefresh.getFullYear() || now.getMonth() > lastRefresh.getMonth()) {
        needsRefresh = true;
      }
    }
    
    if (needsRefresh) {
      try {
        await fetch('/api/user/refresh-credits', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ newCredits: MONTHLY_FREE_CREDITS, refreshDate: now.toISOString() })
        });
        setUserCredits(MONTHLY_FREE_CREDITS);
        console.log(`✅ Monthly credits refreshed: ${MONTHLY_FREE_CREDITS} credits`);
      } catch (error) {
        console.error('Failed to refresh monthly credits:', error);
      }
    }
  }, []);

  const languages = [
    { code: 'en', name: 'English', flag: 'GB' }, { code: 'de', name: 'German', flag: 'DE' },
    { code: 'fr', name: 'French', flag: 'FR' }, { code: 'es', name: 'Spanish', flag: 'ES' },
    { code: 'zh', name: 'Chinese', flag: 'CN' }, { code: 'ja', name: 'Japanese', flag: 'JP' },
    { code: 'ko', name: 'Korean', flag: 'KR' }, { code: 'pt', name: 'Portuguese', flag: 'PT' },
    { code: 'it', name: 'Italian', flag: 'IT' }, { code: 'ru', name: 'Russian', flag: 'RU' },
    { code: 'ar', name: 'Arabic', flag: 'SA' },
  ];

  const tones = ['Professional', 'Casual', 'Academic', 'Creative', 'Technical', 'Conversational'];
  const acceptedFormats = ['PDF', 'DOC', 'DOCX', 'TXT'];

  const handleTranslate = useCallback(async () => {
    setUploadError(null);
    setRetryCount(0);
    if (!uploadedFile?.extractedContent?.text) {
      setUploadError({ message: 'No text content available for translation' }); return;
    }
    if (!selectedLanguage) {
      setUploadError({ message: 'Please select a target language' }); return;
    }
    if (!navigator.onLine) {
      setUploadError({ message: 'No internet connection available' }); return;
    }
    const wordCount = uploadedFile.extractedContent.metadata?.words || uploadedFile.extractedContent.text.split(/\s+/).length;
    const costInDollars = wordCount * 0.008;
    setTranslationCost(costInDollars);
    setShowPricingModal(true);
  }, [uploadedFile, selectedLanguage]);

  useEffect(() => {
    const paymentRedirectData = localStorage.getItem('paymentRedirect');
    if (paymentRedirectData) {
      const { translationId, fileName } = JSON.parse(paymentRedirectData);
      setTranslationId(translationId);
      setUploadedFile({ name: fileName });
      setTranslationComplete(true);
      localStorage.removeItem('paymentRedirect');
    }

    const pendingTranslationData = localStorage.getItem('pendingTranslation');
    if (pendingTranslationData && isSignedIn) {
      const data = JSON.parse(pendingTranslationData);
      setUploadedFile({
        name: data.fileName,
        extractedContent: { text: data.text, html: data.html, structure: data.structure },
        uploaded: true,
      });
      setSelectedLanguage(languages.find(l => l.code === data.targetLanguage));
      setSelectedTone(data.tone);
      handleTranslate();
      localStorage.removeItem('pendingTranslation');
    }
  }, [isSignedIn, handleTranslate, languages]);

  useEffect(() => {
    const refreshAndFetchCredits = async () => {
      if (isSignedIn) {
        setIsFetchingCredits(true);
        try {
          // First, attempt to refresh the monthly credits
          await fetch('/api/credits/refresh', { method: 'POST' });

          // Then, fetch the latest credit balance
          const response = await fetch('/api/credits');
          const data = await response.json();

          if (data.success) {
            setUserCredits(data.credits);
          } else {
            console.error('Failed to fetch user credits after refresh.');
          }
        } catch (error) {
          console.error('Error refreshing or fetching user credits:', error);
        } finally {
          setIsFetchingCredits(false);
        }
      }
    };

    refreshAndFetchCredits();
  }, [isSignedIn]);

  useEffect(() => {
    const updateNetworkStatus = () => setNetworkStatus(navigator.onLine ? 'online' : 'offline');
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
    return () => {
      window.removeEventListener('online', updateNetworkStatus);
      window.removeEventListener('offline', updateNetworkStatus);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      if (extractionIntervalRef.current) clearInterval(extractionIntervalRef.current);
    };
  }, []);

  const handleApiError = async (error, context = 'operation') => {
    console.error(`${context} error:`, error);
    let errorMessage = 'Unknown error occurred';
    
    try {
      if (error.response) {
        // Handle fetch response errors
        const contentType = error.response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          try {
            const errorData = await error.response.json();
            errorMessage = errorData.message || `Server error: ${error.response.status}`;
          } catch {
            errorMessage = `Server error: ${error.response.status}`;
          }
        } else {
          try {
            errorMessage = await error.response.text() || `Server error: ${error.response.status}`;
          } catch {
            errorMessage = `Server error: ${error.response.status}`;
          }
        }
      } else if (error.message) {
        // Handle other errors (network, etc.)
        errorMessage = error.message;
      }
    } catch (parseError) {
      console.error('Error parsing API error:', parseError);
      errorMessage = 'Failed to process server response';
    }

    let suggestions = [];
    let canRetry = true;
    
    if (!navigator.onLine) {
      errorMessage = 'No internet connection';
      suggestions.push('Check your internet connection');
      canRetry = false;
    } else if (errorMessage.includes('Unauthorized')) {
      suggestions.push('Please sign in again');
      canRetry = false;
    } else if (errorMessage.includes('500')) {
      suggestions.push('Server error - please try again in a moment');
      canRetry = true;
    }
    
    return { errorMessage: `${context} failed: ${errorMessage}`, suggestions, canRetry };
  };

  const pollTranslationProgress = async (jobId) => {
    try {
      const response = await fetch(`/api/progress/${jobId}`);
      if (!response.ok) throw new Error(`Server responded with ${response.status}`);
      const data = await response.json();
      if (data.success) {
        const { progress = 0, stage = 'Processing...', completed, translatedText, failed, error } = data.progress || {};
        setTranslationProgress(progress);
        setTranslationStage(stage);
        if (completed) {
          setTranslationResult(translatedText || 'Translation completed');
          setIsTranslating(false);
          setTranslationComplete(true);
          clearInterval(progressIntervalRef.current);
          console.log('✅ Translation completed successfully!');
          
          // Save to history
          if (user && uploadedFile && selectedLanguage && translationId) {
            saveToHistory(user, {
              translationId: translationId,
              fileName: uploadedFile.name,
              originalLanguage: 'auto',
              targetLanguage: selectedLanguage.code,
              status: 'completed',
              fileSize: uploadedFile.size,
              wordCount: uploadedFile.extractedContent?.text?.split(/\s+/).length || 0
            });
          }
        } else if (failed) {
          throw new Error(error || 'Translation failed');
        }
      }
    } catch (error) {
      console.error('Progress polling error:', error);
      setRetryCount(prev => prev + 1);
      if (retryCount >= 3) {
        const { errorMessage, suggestions } = handleApiError(error, 'Translation progress');
        setUploadError({ message: errorMessage, suggestions, canRetry: true });
        setIsTranslating(false);
        clearInterval(progressIntervalRef.current);
      }
    }
  };

  const handleFileUpload = async (file) => {
    setIsUploading(true);
    setUploadError(null);
    setTranslationResult(null);
    setRetryCount(0);
    setTranslationComplete(false);

    if (file.size > 50 * 1024 * 1024) {
      setUploadError({ message: 'File too large (max 50MB)' });
      setIsUploading(false);
      return;
    }
    if (!acceptedFormats.some(format => file.name.toLowerCase().endsWith(`.${format.toLowerCase()}`))) {
      setUploadError({ message: `Unsupported file format. Supported: ${acceptedFormats.join(', ')}` });
      setIsUploading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.message || 'Upload failed');
      setExtractedContent(data.extractedContent);
      setUploadedFile({
        name: file.name, size: file.size, type: file.type,
        id: data.documentId, extractedContent: data.extractedContent, uploaded: true,
      });
    } catch (error) {
      const { errorMessage, suggestions, canRetry } = handleApiError(error, 'Upload');
      setUploadError({ message: errorMessage, suggestions, canRetry });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e) => { e.preventDefault(); setIsDragOver(false); if (e.dataTransfer.files.length) handleFileUpload(e.dataTransfer.files[0]); };
  const handleDragOver = (e) => { e.preventDefault(); setIsDragOver(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragOver(false); };
  const handleFileSelect = (e) => { if (e.target.files.length) handleFileUpload(e.target.files[0]); };
  const removeFile = () => { setUploadedFile(null); setUploadError(null); setExtractedContent(null); setTranslationResult(null); setRetryCount(0); setTranslationComplete(false); if (fileInputRef.current) fileInputRef.current.value = ''; };
  const selectLanguage = (language) => { setSelectedLanguage(language); setShowLanguageDropdown(false); };
  const selectTone = (tone) => { setSelectedTone(tone); setShowToneDropdown(false); };
  const retryOperation = () => { setUploadError(null); if (uploadedFile) handleTranslate(); else if (fileInputRef.current?.files[0]) handleFileUpload(fileInputRef.current.files[0]); };

  const handleSubscribe = async (planType) => {
    setIsProcessingPayment(true);
    
    // Price IDs for each plan
    const priceIds = {
      'basic': 'pri_01k5twpxnsb9ek5bw79h9f695gg',
      'pro': 'pri_01k5tx4d7e51h7vh209gzwk88h', 
      'business': 'pri_01k5tmewzw0003q0bm807955n'
    };
    
    try {
      // Store translation data for after subscription
      localStorage.setItem('pendingTranslation', JSON.stringify({
        text: uploadedFile.extractedContent.text,
        html: uploadedFile.extractedContent.html,
        structure: uploadedFile.extractedContent.structure,
        targetLanguage: selectedLanguage.code,
        tone: selectedTone,
        fileName: uploadedFile.name,
        documentId: uploadedFile.id
      }));
      
      // Initialize Paddle if not already loaded
      if (!window.Paddle) {
        // Load Paddle script dynamically
        const script = document.createElement('script');
        script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
        script.onload = () => {
          window.Paddle.Environment.set('sandbox'); // Change to 'production' when ready
          window.Paddle.Setup({ 
            token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN 
          });
          openPaddleCheckout();
        };
        document.head.appendChild(script);
      } else {
        openPaddleCheckout();
      }
      
      function openPaddleCheckout() {
        window.Paddle.Checkout.open({
          items: [{ 
            priceId: priceIds[planType], 
            quantity: 1 
          }],
          customer: {
            email: user?.emailAddresses?.[0]?.emailAddress || user?.primaryEmailAddress?.emailAddress
          },
          customData: {
            userId: user?.id,
            planType: planType,
            documentId: uploadedFile.id
          },
          successUrl: `${window.location.origin}/payment/success?plan=${planType}`,
          closeUrl: window.location.href
        });
      }
      
    } catch (error) {
      console.error('Subscription error:', error);
      setUploadError({ 
        message: 'Payment system temporarily unavailable. Please try again.', 
        suggestions: ['Check your internet connection', 'Try refreshing the page'] 
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleConfirmPayment = async () => {
    setIsProcessingPayment(true);
    const wordCount = uploadedFile.extractedContent.metadata?.words || uploadedFile.extractedContent.text.split(/\s+/).length;

    const translationData = {
      text: uploadedFile.extractedContent.text,
      html: uploadedFile.extractedContent.html || '',
      structure: uploadedFile.extractedContent.structure || [],
      targetLanguage: selectedLanguage.code,
      fileName: uploadedFile.name || 'document.txt',
      documentId: uploadedFile.id
    };

    if (!isSignedIn) {
      localStorage.setItem('pendingTranslation', JSON.stringify(translationData));
      router.push('/sign-up');
      return;
    }

    if (userCredits >= wordCount) {
      // User has enough credits, proceed directly
      setIsTranslating(true);
      setShowPricingModal(false);
      setTranslationStage('Deducting credits...');
      try {
        // Step 1: Deduct credits from the database
        const deductResponse = await fetch('/api/credits/deduct', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: wordCount }),
        });

        if (!deductResponse.ok) {
          const errorData = await deductResponse.json();
          throw new Error(errorData.message || 'Failed to deduct credits.');
        }

        const deductData = await deductResponse.json();
        setUserCredits(deductData.newBalance); // Update credits on the client

        // Step 2: Proceed with the translation
        setTranslationStage('Initializing translation...');
        const translateResponse = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(translationData),
        });
        
        if (!translateResponse.ok) {
          const error = new Error(`HTTP ${translateResponse.status}`);
          error.response = translateResponse;
          throw error;
        }
        
        const translateResult = await translateResponse.json();
        if (!translateResult.success) throw new Error(translateResult.message || 'Failed to start translation');
        setTranslationId(translateResult.translationId);
        progressIntervalRef.current = setInterval(() => pollTranslationProgress(translateResult.jobId), 3000);

      } catch (error) {
        const { errorMessage, suggestions, canRetry } = await handleApiError(error, 'Translation');
        setUploadError({ message: errorMessage, suggestions, canRetry });
        setIsTranslating(false);
        // Optional: Add a call here to refund credits if the translation fails to queue
      } finally {
        setIsProcessingPayment(false);
      }
    } else {
      // Insufficient credits, save data and proceed to payment
      localStorage.setItem('pendingTranslation', JSON.stringify(translationData));

      if (isPaddleLoading) {
        console.log('Paddle is still loading. Please wait.');
        return; 
      }

      if (paddleError || !paddle) {
        console.error('Paddle is not available or failed to initialize.', paddleError);
        setUploadError({ message: 'Payment service is currently unavailable. Please try again later.' });
        setIsProcessingPayment(false);
        return;
      }

      try {
        const creditsNeeded = wordCount - userCredits;
        const pricePerCredit = 0.008;
        const totalPrice = creditsNeeded * pricePerCredit;
        const amountInCents = Math.ceil(totalPrice * 100);

        paddle.Checkout.open({
          items: [{
            priceId: process.env.NEXT_PUBLIC_PADDLE_DYNAMIC_PRICE_ID,
            quantity: 1,
            unitPrice: { 
              amount: amountInCents.toString(),
              currencyCode: 'USD'
            }
          }],
          customer: {
            email: user?.emailAddresses?.[0]?.emailAddress
          },
          customData: {
            userId: user?.id,
            documentId: uploadedFile.id,
            creditsPurchased: creditsNeeded
          },
          // The success URL is now the key part of this flow
          successUrl: `${window.location.origin}/payment/success`
        });

      } catch (error) {
        console.error('Failed to open Paddle checkout for credits:', error);
        setUploadError({ message: 'Could not initiate the payment process. Please try again.' });
      } finally {
        setIsProcessingPayment(false);
      }
    }
  };

  const downloadTranslation = async (format = 'txt') => {
    try {
      console.log(`📥 Starting download: format=${format}, translationId=${translationId}`);
      
      const url = `/api/download/${translationId}?format=${format}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Download failed: ${response.status} - ${errorText}`);
      }
      
      const blob = await response.blob();
      console.log(`✅ Download blob created: ${blob.size} bytes, type: ${blob.type}`);
      
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      
      // Create a better filename
      const baseFileName = uploadedFile.name.replace(/\.[^/.]+$/, '');
      a.download = `translated_${baseFileName}.${format}`;
      
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);
      
      console.log(`✅ Download completed: ${a.download}`);
      
      // Show success message
      setUploadError({ 
        message: `✅ ${format.toUpperCase()} downloaded successfully!`, 
        suggestions: [], 
        canRetry: false 
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => setUploadError(null), 3000);
      
    } catch (error) {
      console.error('Download error:', error);
      const { errorMessage, suggestions } = await handleApiError(error, 'Download');
      setUploadError({ message: errorMessage, suggestions, canRetry: true });
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${['Bytes', 'KB', 'MB', 'GB'][i]}`;
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      {showPricingModal && (
        <PricingModal 
          wordCount={uploadedFile?.extractedContent?.metadata?.words || uploadedFile?.extractedContent?.text.split(/\s+/).length || 0}
          cost={translationCost}
          onConfirm={handleConfirmPayment}
          onSubscribe={handleSubscribe}
          onCancel={() => {
            setShowPricingModal(false);
            setIsProcessingPayment(false);
          }}
          isSignedIn={isSignedIn}
          userCredits={userCredits}
          userPlan={user?.publicMetadata?.plan || 'free'}
          isLoading={isProcessingPayment}
        />
      )}

      {networkStatus === 'offline' && (
        <div className="fixed top-0 left-0 right-0 bg-red-600 text-white py-2 px-4 text-center z-50">
          <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
          No internet connection - Some features may not work
        </div>
      )}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-purple-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-blue-300 rounded-full opacity-15 blur-xl"></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-purple-300 rounded-full opacity-15 blur-xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Professional Book Translation
          </h1>
          <p className="text-xl text-gray-600">
            AI-Powered Book Translation - No Registration Required
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
            {isSignedIn && (
              <div className="flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                <Zap size={14} className="mr-1" />
                <span>{userCredits.toLocaleString()} Credits</span>
              </div>
            )}
            <div className="text-gray-500">
              Enhanced v2.0 with Rate Limiting
            </div>
          </div>
        </div>

        {translationComplete ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 text-center">
            <FontAwesomeIcon icon={faCheck} className="text-green-500 h-16 w-16 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Translation Complete!</h2>
            <p className="text-gray-600 mb-6">Your document &ldquo;{uploadedFile?.name}&rdquo; has been successfully translated.</p>
            <div className="flex justify-center space-x-4">
                <button
                    onClick={() => downloadTranslation('pdf')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold text-lg transition-colors duration-200 flex items-center"
                >
                    <FontAwesomeIcon icon={faDownload} className="mr-2" />
                    Download PDF
                </button>
                <button
                    onClick={() => downloadTranslation('txt')}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-xl font-semibold text-lg transition-colors duration-200 flex items-center"
                >
                    <FontAwesomeIcon icon={faDownload} className="mr-2" />
                    Download TXT
                </button>
            </div>
          </div>
        ) : (
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
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
                    <FontAwesomeIcon icon={faSpinner} className="mx-auto h-24 w-24 text-blue-600 mb-4 animate-spin" />
                  ) : (
                    <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center mb-4 border-2 border-blue-200">
                      <FontAwesomeIcon icon={faUpload} className="h-14 w-14 text-blue-600" />
                    </div>
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

                {extractedContent && (
                  <div className="bg-gray-50 rounded-lg p-4 mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-gray-600 mr-2" />
                        <span className="text-sm font-medium text-gray-700">
                          Content Analysis
                        </span>
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

          {(isUploading || isTranslating) && (
            <div className="mb-8 bg-blue-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Book className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-blue-800 font-semibold">
                  {isUploading ? 'Processing Document' : 'Translation in Progress'}
                </span>
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-sm text-blue-700 mb-1">
                  <span>{translationStage}</span>
                  <span>{Math.round(translationProgress)}%</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${translationProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {translationResult && (
            <div className="mb-8 bg-green-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faCheck} className="text-green-600 mr-2" />
                  <span className="text-green-800 font-semibold">Translation Complete!</span>
                </div>
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
                        <button onClick={() => { downloadTranslation('txt'); setShowDownloadDropdown(false); }} className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg text-sm">Download as .txt</button>
                        <button onClick={() => { downloadTranslation('pdf'); setShowDownloadDropdown(false); }} className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg text-sm">Download as .pdf</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 max-h-60 overflow-y-auto border">
                <div className="text-gray-800 whitespace-pre-wrap leading-relaxed text-sm">
                  {translationResult}
                </div>
              </div>
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Translation Settings</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => selectLanguage(language)}
                  disabled={isTranslating || isUploading || networkStatus === 'offline'}
                  className={`flex items-center space-x-2 px-3 py-3 rounded-xl border transition-all duration-200 disabled:opacity-50 ${
                    selectedLanguage?.code === language.code
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  <Flag code={language.flag} className="w-5 h-4 rounded shadow-sm" />
                  <span className="font-medium">{language.name}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Translation Style:</span>
              <div className="relative">
                <button
                  onClick={() => setShowToneDropdown(!showToneDropdown)}
                  disabled={isTranslating || isUploading || networkStatus === 'offline'}
                  className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg hover:border-gray-400 disabled:opacity-50"
                >
                  <span>{selectedTone}</span>
                  <FontAwesomeIcon icon={faChevronDown} className={`w-3 h-3 ml-2 transition-transform ${showToneDropdown ? 'rotate-180' : ''}`} />
                </button>
                {showToneDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-lg z-10">
                    {tones.map((tone) => (
                      <button
                        key={tone}
                        onClick={() => selectTone(tone)}
                        className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${ selectedTone === tone ? 'bg-blue-50' : '' }`}
                      >
                        {tone}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleTranslate}
            disabled={ !uploadedFile?.extractedContent?.text || !selectedLanguage || isTranslating || isUploading || networkStatus === 'offline' }
            className="w-full py-4 rounded-xl text-white text-lg font-semibold transition-all duration-200 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:bg-gray-300 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed"
          >
            {isTranslating ? 'Translating...' : 'Start Translation'}
          </button>
        </div>
        )}
      </div>
    </div>
  );
};

export default BookTranslationUpload;