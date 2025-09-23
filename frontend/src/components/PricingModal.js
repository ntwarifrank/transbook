"use client"
import React from 'react';
import { X } from 'lucide-react';

const PricingModal = ({ wordCount, cost, onConfirm, onCancel, isSignedIn, userCredits, isLoading = false, userPlan = 'free', onSubscribe }) => {
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
        {/* Emphasized Dollar Cost */}
        <div className="text-center mb-6">
          <p className="text-gray-600">Total Translation Cost</p>
          <p className="text-4xl font-bold text-gray-900 my-2">${cost.toFixed(2)}</p>
          <p className="text-sm text-gray-500">from {wordCount.toLocaleString()} words</p>
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
          <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Your Current Credits:</span>
              <span className="font-semibold text-gray-900">
                {userCredits.toLocaleString()}
                {isFreeUser && <span className="text-green-600 text-xs ml-1">(Free Plan)</span>}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Translation Cost:</span>
              <span className="font-semibold text-red-600">- {wordCount.toLocaleString()}</span>
            </div>
            <div className="border-t border-gray-200 my-2"></div>
            <div className="flex justify-between items-center font-semibold">
              <span className="text-gray-800">Remaining Credits:</span>
              <span className={`${userCredits >= wordCount ? 'text-green-600' : 'text-red-600'}`}>
                {(userCredits - wordCount).toLocaleString()}
              </span>
            </div>

            {userCredits < wordCount && (
              <div className="mt-2 p-3 bg-red-50 rounded-lg border border-red-200 text-center">
                <p className="text-sm text-red-700 font-semibold">You need to purchase additional credits.</p>
                <p className="text-xs text-red-600 mt-1">
                  You will be charged ${((wordCount - userCredits) * 0.005).toFixed(2)} to complete this translation.
                </p>
              </div>
            )}

            {userCredits >= wordCount && isNewUser && (
              <div className="mt-2 p-3 bg-green-50 rounded-lg border border-green-200 text-center">
                <p className="text-sm text-green-700"><strong>Welcome Bonus!</strong> You are using your free monthly credits.</p>
              </div>
            )}
          </div>
        )}

        <div className="mt-4 text-center">
          <button 
            onClick={onConfirm}
            disabled={isLoading}
            className={`w-full py-3 rounded-lg font-semibold text-base flex items-center justify-center transition-all duration-300 shadow-lg ${
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
                    `Buy Credits & Translate ($${((wordCount - userCredits) * 0.005).toFixed(2)})`
                  ) : 
                  `Sign Up & Pay $${cost.toFixed(2)}`
                }
              </>
            )}
          </button>
          <p className="text-xs text-gray-500 mt-2">
            {isSignedIn
              ? (userCredits >= wordCount ? 
                  `These credits will be deducted from your account.` :
                  `You will be redirected to our secure payment processor.`
                )
              : `You'll be prompted to create a free account to complete your translation.`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingModal;
