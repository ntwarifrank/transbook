"use client"
import React from 'react';
import { X } from 'lucide-react';

const PricingModal = ({ wordCount, cost, onConfirm, onCancel, isSignedIn, userCredits, isLoading = false, userPlan = 'free' }) => {
  if (wordCount === 0) return null;
  
  // Check if user is on free plan
  const isFreeUser = isSignedIn && userPlan === 'free';
  const isNewUser = isSignedIn && userCredits === 5000; // New users get 5000 credits now

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full transform transition-all duration-300 scale-95 opacity-0 animate-scale-in">
        <div className="flex justify-end">
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Translation Payment</h2>
          <p className="text-sm text-gray-600 mb-4">Confirm your translation order</p>
        </div>
        
        {/* Translation Calculation - Same for all users */}
        <div className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-200">
          <div className="text-center">
            <div className="text-sm font-medium text-blue-800 mb-2">Translation Calculation</div>
            <div className="text-base text-gray-700">
              <span className="font-semibold">{wordCount.toLocaleString()} words</span>
              <span className="mx-2">×</span>
              <span className="font-semibold">1 credit per word</span>
              <span className="mx-2">=</span>
              <span className="font-bold text-blue-600">{wordCount.toLocaleString()} credits</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              (Equivalent to ${cost.toFixed(2)} at $0.005 per word)
            </div>
          </div>
        </div>

        {/* For Non-Signed Users: Show Payment */}
        {!isSignedIn && (
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-gray-600">Your Current Plan:</span>
              <span className="font-semibold text-gray-900">0 Credits (Not Signed In)</span>
            </div>
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-gray-600">Translation Cost:</span>
              <span className="font-semibold text-gray-900">{wordCount.toLocaleString()} Credits</span>
            </div>
            <div className="border-t border-gray-200 mt-3 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-800 font-semibold">Payment Required:</span>
                <span className="text-lg font-bold text-red-600">${cost.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="text-sm text-green-700">
                <strong>🎁 Free Plan Benefits:</strong> Sign up and get 5,000 free credits every month! No payment required for basic usage.
              </div>
            </div>
          </div>
        )}

        {/* For Signed Users: Show Credit Usage and Remaining Balance */}
        {isSignedIn && (
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-gray-600">Your Current Plan:</span>
              <span className="font-semibold text-gray-900">
                {userCredits.toLocaleString()} Credits
                {isFreeUser && <span className="text-green-600 text-xs ml-1">(Free Plan - 5K/month)</span>}
              </span>
            </div>
            
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-gray-600">Translation Cost:</span>
              <span className="font-semibold text-gray-900">{wordCount.toLocaleString()} Credits</span>
            </div>
            
            <div className="border-t border-gray-200 pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-800 font-semibold">Remaining Credits:</span>
                <span className={`font-bold ${userCredits >= wordCount ? 'text-green-600' : 'text-red-600'}`}>
                  {userCredits >= wordCount ? 
                    `${(userCredits - wordCount).toLocaleString()} Credits` : 
                    `Need ${(wordCount - userCredits).toLocaleString()} More Credits`
                  }
                </span>
              </div>
            </div>
            
            {userCredits >= wordCount && (
              <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="text-sm text-green-700">
                  {isNewUser ? (
                    <><strong>Welcome Bonus:</strong> You're using your free monthly credits! Enjoy professional AI translation.</>
                  ) : (
                    <><strong>Free Plan:</strong> You get 5,000 credits every month automatically. No subscription needed!</>
                  )}
                </div>
              </div>
            )}
            
            {userCredits < wordCount && (
              <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="text-sm text-red-700">
                  <strong>Insufficient Credits:</strong> You need {(wordCount - userCredits).toLocaleString()} more credits to complete this translation.
                </div>
                <div className="text-xs text-red-600 mt-1">
                  Additional cost: ${((wordCount - userCredits) * 0.005).toFixed(2)}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-4 text-center">
          <button 
            onClick={onConfirm}
            disabled={isLoading}
            className={`w-full py-3 rounded-lg font-semibold text-base flex items-center justify-center transition-all duration-300 shadow-md ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105'
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                {isSignedIn ? 
                  (userCredits >= wordCount ? 
                    `Translate Now (${wordCount.toLocaleString()} Credits)` : 
                    `Buy ${(wordCount - userCredits).toLocaleString()} More Credits for $${((wordCount - userCredits) * 0.005).toFixed(2)}`
                  ) : 
                  `Buy ${wordCount.toLocaleString()} Credits for $${cost.toFixed(2)}`
                }
              </>
            )}
          </button>
          <p className="text-xs text-gray-500 mt-2">
            {isSignedIn
              ? (userCredits >= wordCount ? 
                  `${wordCount.toLocaleString()} credits will be deducted from your account.` :
                  `You&apos;ll be redirected to purchase additional credits.`
                )
              : `Create account and pay $${cost.toFixed(2)} to start translation.`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingModal;
