"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Loader2 } from 'lucide-react';

const PaymentSuccessPage = () => {
  const router = useRouter();
  const [status, setStatus] = useState('Verifying payment...');
  const [error, setError] = useState('');

  useEffect(() => {
    const handlePostPayment = async () => {
      // Check for a pending translation job in local storage
      const pendingTranslation = localStorage.getItem('pendingTranslation');
      
      if (pendingTranslation) {
        setStatus('Payment verified. Starting your translation...');
        const translationData = JSON.parse(pendingTranslation);

        try {
          // Call the translation API to start the job
          const response = await fetch('/api/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(translationData),
          });

          const result = await response.json();

          if (!response.ok || !result.success) {
            throw new Error(result.message || 'Failed to start translation job.');
          }

          // Translation started successfully. Clean up and redirect.
          setStatus('Translation successfully queued! Redirecting...');
          localStorage.removeItem('pendingTranslation');
          
          // Pass the new translation ID back to the main page
          localStorage.setItem('newTranslationId', result.translationId);

          setTimeout(() => {
            router.push('/');
          }, 2000);

        } catch (err) {
          console.error('Post-payment translation error:', err);
          setError(`An error occurred: ${err.message}. Please contact support.`);
          setStatus('Error processing translation.');
        }
      } else {
        // No pending translation, just a regular subscription success
        setStatus('Your subscription is active! Redirecting...');
        setTimeout(() => {
          router.push('/'); // Redirect to home or dashboard
        }, 3000);
      }
    };

    handlePostPayment();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        {error ? (
          <>
            <CheckCircle className="text-red-500 w-16 h-16 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{status}</h1>
            <p className="text-gray-600 mb-6">{error}</p>
          </>
        ) : (
          <>
            <Loader2 className="text-blue-500 w-16 h-16 mx-auto mb-4 animate-spin" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Processing Your Request</h1>
            <p className="text-gray-600 mb-6">{status}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
