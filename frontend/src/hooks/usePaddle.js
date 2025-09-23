"use client"

import { useEffect, useState } from 'react';
import { initializePaddle } from '@paddle/paddle-js';

const usePaddle = () => {
  // Using a state to hold the paddle instance, to ensure it's loaded before use.
  const [paddle, setPaddle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This effect runs once on component mount to initialize Paddle
    initializePaddle({
      environment: 'sandbox', // or 'production'
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
    })
      .then((paddleInstance) => {
        if (paddleInstance) {
          setPaddle(paddleInstance);
          console.log('✅ Paddle Initialized Successfully');
        } else {
          throw new Error('Paddle instance is undefined after initialization.');
        }
      })
      .catch((err) => {
        console.error('❌ Failed to initialize Paddle:', err);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []); // Empty dependency array ensures this runs only once

  return { paddle, isLoading, error };
};

export default usePaddle;
