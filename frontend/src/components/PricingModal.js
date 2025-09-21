"use client"
import React from 'react';
import { X, Zap } from 'lucide-react';

const PricingModal = ({ wordCount, cost, onConfirm, onCancel }) => {
  if (wordCount === 0) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full transform transition-all duration-300 scale-95 opacity-0 animate-scale-in">
        <div className="flex justify-end">
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        <div className="text-center">
          <Zap className="mx-auto h-12 w-12 text-yellow-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Instant Translation Quote</h2>
          <p className="text-gray-600 mb-6">You're one step away from a professional translation.</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <div className="flex justify-between items-center text-lg">
            <span className="text-gray-600">Word Count</span>
            <span className="font-semibold text-gray-900">{wordCount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-lg">
            <span className="text-gray-600">Rate</span>
            <div className='flex items-center'>
              <span className="font-semibold text-gray-900 mr-2">$0.005 / word</span>
              <span className="text-xs bg-green-100 text-green-800 font-bold px-2 py-1 rounded-full">BEST VALUE</span>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex justify-between items-center text-2xl font-bold">
              <span className="text-gray-800">Total Cost:</span>
              <span className="text-green-600">${cost.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <button 
            onClick={onConfirm}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Create Account & Translate
          </button>
          <p className="text-xs text-gray-500 mt-3">You'll be asked to create a free account to securely complete your translation.</p>
        </div>
      </div>
    </div>
  );
};

export default PricingModal;
