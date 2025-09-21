"use client"
import React, { useState, useEffect } from 'react';
import { Check, Star, Zap } from 'lucide-react';
import { initializePaddle, Paddle } from '@paddle/paddle-js';
import axios from 'axios';

const PricingPlans = ({ userEmail }) => {
  const [paddle, setPaddle] = useState();

  useEffect(() => {
    // Initialize Paddle
    initializePaddle({
      environment: 'sandbox', // Use 'sandbox' for testing, 'production' for live
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN, // Your client-side token
    }).then((paddleInstance) => {
      if (paddleInstance) {
        setPaddle(paddleInstance);
      }
    });
  }, []);

  const pricingPlans = [
    {
      name: "FREE",
      price: "$0",
      period: "forever",
      wordLimit: "5,000 words/month",
      features: [
        "5,000 words per month",
        "Basic AI translation",
        "50+ language pairs",
        "PDF, DOCX, TXT support",
        "Standard processing (24-48hrs)",
        "Email support",
        "Watermarked downloads"
      ],
      buttonText: "GET STARTED FREE",
      buttonStyle: "border border-gray-300 text-gray-700 hover:bg-gray-50",
      popular: false,
      pricePerWord: "Free"
    },
    {
      name: "BASIC",
      price: "$19",
      period: "per month",
      wordLimit: "50,000 words/month",
      features: [
        "All FREE features included",
        "50,000 words per month (~200 pages)",
        "Enhanced AI translation accuracy",
        "100+ language pairs",
        "Priority processing (12-24hrs)",
        "Context-aware translations",
        "Email & chat support",
        "No watermarks"
      ],
      buttonText: "START BASIC PLAN",
      buttonStyle: "border border-gray-300 text-gray-700 hover:bg-gray-50",
      popular: false,
      pricePerWord: "$0.00038/word"
    },
    {
      name: "PRO",
      price: "$49",
      period: "per month",
      wordLimit: "200,000 words/month",
      features: [
        "All BASIC features included",
        "200,000 words per month (~800 pages)",
        "Premium AI with quality review",
        "150+ language pairs",
        "Express processing (2-6hrs)",
        "Industry-specific terminology",
        "Style & tone preservation",
        "API access",
        "Priority 24/7 support",
        "Custom glossaries"
      ],
      buttonText: "GO PRO NOW",
      buttonStyle: "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 border-0",
      popular: true,
      pricePerWord: "$0.000245/word"
    },
    {
      name: "BUSINESS",
      price: "$149",
      period: "per month",
      wordLimit: "1,000,000 words/month",
      features: [
        "All PRO features included",
        "1,000,000 words per month (~4,000 pages)",
        "AI + Human review option",
        "Team collaboration tools",
        "Bulk processing & batch uploads",
        "Advanced API with webhooks",
        "White-label options",
        "Dedicated account manager",
        "Custom integrations",
        "SLA guarantee"
      ],
      buttonText: "CHOOSE BUSINESS",
      buttonStyle: "border border-gray-300 text-gray-700 hover:bg-gray-50",
      popular: false,
      pricePerWord: "$0.000149/word"
    },
    {
      name: "ENTERPRISE",
      price: "Custom",
      period: "contact us",
      wordLimit: "Unlimited words",
      features: [
        "All BUSINESS features included",
        "Unlimited translations",
        "Professional human translators",
        "200+ languages including dialects",
        "Real-time translation (1-2hrs)",
        "Custom domain integration",
        "On-premise deployment option",
        "Advanced security & compliance",
        "Custom workflow automation",
        "24/7 dedicated support"
      ],
      buttonText: "CONTACT SALES",
      buttonStyle: "bg-gradient-to-r from-purple-600 to-indigo-700 text-white hover:from-purple-700 hover:to-indigo-800 border-0",
      popular: false,
      pricePerWord: "Volume pricing"
    }
  ];

  const handlePlanClick = async (plan) => {
    if (plan.name === 'ENTERPRISE') {
      window.open('mailto:ntwarifrank@lexineva.com?subject=Enterprise Plan Inquiry', '_blank');
      return;
    }

    if (!paddle) {
      console.error('Paddle is not initialized yet.');
      // Optionally, show a message to the user
      return;
    }

    try {
      // 1. Create a checkout session on your backend
      const response = await axios.post('http://localhost:5000/api/paddle/create-checkout', {
        planName: plan.name,
        userEmail: userEmail, // Make sure you have the user's email
        customData: { 
          // You can pass any custom data here
          userId: 'user-id-if-available',
        },
      });

      const { checkoutData } = response.data;

      // 2. Open the Paddle checkout overlay
      paddle.Checkout.open(checkoutData);

    } catch (error) {
      console.error('Error creating checkout session:', error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          PRICING PLANS
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Transform any book into any language with our advanced AI translation technology. 
          Pay only for what you use with transparent word-based pricing.
        </p>
        <div className="inline-flex items-center mb-4 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
          <Zap className="w-4 h-4 mr-2" />
          Best value pricing in the market
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`relative bg-white rounded-2xl shadow-xl border-2 transition-all duration-300 hover:shadow-2xl hover:scale-105 group ${
              plan.popular ? 'border-blue-400 ring-4 ring-blue-100 lg:scale-110' : 'border-gray-200 hover:border-blue-400 hover:ring-4 hover:ring-blue-100'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-1 shadow-lg">
                  <Star className="w-4 h-4" />
                  <span>MOST POPULAR</span>
                </div>
              </div>
            )}
            
            <div className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold mb-4 tracking-wider text-gray-900 group-hover:text-blue-600 transition-colors">
                  {plan.name}
                </h3>
                
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {plan.price}
                  </span>
                  <p className="text-gray-500 text-xs mt-1">{plan.period}</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-sm font-semibold text-gray-800">{plan.wordLimit}</p>
                  <p className="text-xs text-gray-600">{plan.pricePerWord}</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className={`text-xs leading-relaxed ${
                      feature.startsWith('All ') ? 'text-blue-600 font-semibold' : 'text-gray-700'
                    }`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => handlePlanClick(plan)}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 transform hover:scale-105 ${plan.buttonStyle}`}
              >
                {plan.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Need more words?</h3>
          <p className="text-gray-600 mb-6">
            All paid plans include additional words at reduced rates when you exceed your monthly limit.
            Extra words: Basic ($0.0005/word), Pro ($0.0003/word), Business ($0.0002/word)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="font-semibold text-green-800">30-day money-back guarantee</div>
              <div className="text-green-600">Try risk-free</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="font-semibold text-blue-800">Cancel anytime</div>
              <div className="text-blue-600">No long-term contracts</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="font-semibold text-purple-800">24/7 Support</div>
              <div className="text-purple-600">We're here to help</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;