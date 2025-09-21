"use client"
import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

const PaymentSuccessPage = () => {

  useEffect(() => {
    // Here you might want to trigger a data refetch for the user's
    // subscription status to update the UI across the app.
    console.log('Payment was successful!');
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">Your subscription has been activated. You can now enjoy your new plan features.</p>
        <Link href="/dashboard">
          <a className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors">
            Go to Dashboard
          </a>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
