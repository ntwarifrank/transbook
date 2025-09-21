"use client"
import React, { useState, useEffect } from 'react';
import { Loader2, Check, AlertCircle, X, CreditCard } from 'lucide-react';

const PaddlePayment = ({ 
  isOpen, 
  onClose, 
  planData, 
  userEmail,
  onSuccess,
  onError 
}) => {
  const [loading, setLoading] = useState(false);
  const [paddle, setPaddle] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

  // Initialize Paddle
  useEffect(() => {
    const initPaddle = async () => {
      if (!window.Paddle) {
        const script = document.createElement('script');
        script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
        script.async = true;
        document.head.appendChild(script);
        
        script.onload = () => {
          window.Paddle.initialize({
            token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
            environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'
          });
          setPaddle(window.Paddle);
        };
      } else {
        setPaddle(window.Paddle);
      }
    };

    if (isOpen) {
      initPaddle();
    }
  }, [isOpen]);

  const handlePayment = async () => {
    if (!planData || !userEmail) {
      setError('Missing plan or user information');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Call your backend to create checkout
      const response = await fetch('/api/paddle/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planName: planData.name,
          planPrice: planData.price,
          userEmail: userEmail,
          customData: {
            userId: planData.userId || 'anonymous',
            source: 'paddle_component'
          }
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout');
      }

      setProcessing(true);

      // Open Paddle checkout overlay
      if (paddle && data.checkoutData) {
        await paddle.Checkout.open({
          ...data.checkoutData,
          eventCallback: (event) => {
            console.log('Paddle event:', event);
            
            if (event.name === 'checkout.completed') {
              setSuccess(true);
              setProcessing(false);
              onSuccess?.(event.data);
              
              setTimeout(() => {
                onClose();
              }, 2000);
            }
            
            if (event.name === 'checkout.closed') {
              setProcessing(false);
            }
            
            if (event.name === 'checkout.error') {
              setError('Payment failed: ' + event.data.message);
              setProcessing(false);
              onError?.(event.data);
            }
          }
        });
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message);
      onError?.(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="p-3 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Complete Payment</h3>
            <p className="text-sm text-gray-600">{planData?.name} Plan</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
            disabled={processing}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8">
          {/* Success State */}
          {success && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-500" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Payment Successful!</h4>
              <p className="text-gray-600 text-base">Your {planData?.name} plan is now active.</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6 mb-6">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 mr-4" />
                <div>
                  <h4 className="text-sm font-semibold text-red-900">Payment Error</h4>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Default State */}
          {!success && !error && (
            <>
              {/* Plan Details */}
              <div className="bg-gray-50 rounded-2xl p-4 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-gray-900 text-lg">{planData?.name} Plan</span>
                  <span className="font-bold text-gray-900 text-2xl">{planData?.price}</span>
                </div>
                <div className="text-gray-600 space-y-1">
                  <p className="font-medium">Email: {userEmail}</p>
                  <p className="text-sm">Billed monthly • Cancel anytime</p>
                </div>
              </div>

              {/* Features Preview */}
              <div className="mb-8">
                <h4 className="font-bold text-gray-900 mb-2 text-lg">What's included:</h4>
                <div className="space-y-3">
                  {planData?.features?.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Action Buttons */}
          {!success && (
            <div className="space-y-2">
              <button
                onClick={handlePayment}
                disabled={loading || processing || !paddle}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-2xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3 text-lg shadow-lg"
              >
                {loading || processing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{processing ? 'Processing Payment...' : 'Loading...'}</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    <span>Pay with Paddle</span>
                  </>
                )}
              </button>

              <div className="text-center pt-1">
                <p className="text-sm text-gray-500 flex items-center justify-center space-x-1">
                  <span>🔒</span>
                  <span>Secure payment powered by Paddle • 30-day money-back guarantee</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaddlePayment;