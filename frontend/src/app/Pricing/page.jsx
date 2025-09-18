"use client"
import { Check, Star } from 'lucide-react';
import PaymentDemo from '../../components/PayMoney';

const PricingComponent = () => {
  const pricingPlans = [
    {
      name: "FREE",
      price: "$0",
      period: "per month",
      features: [
        "Translate up to 5 pages per month",
        "Basic AI translation (Google Translate)",
        "PDF, DOCX, TXT file support",
        "50+ language pairs",
        "Standard processing time (24-48hrs)",
        "Email support",
        "Watermarked downloads"
      ],
      buttonText: "GET STARTED FREE",
      buttonStyle: "border border-gray-300 text-gray-700 hover:bg-gray-50",
      popular: false
    },
    {
      name: "BASIC",
      price: "$29",
      period: "per month",
      features: [
        "Translate up to 100 pages per month",
        "Enhanced AI translation accuracy",
        "All document formats supported",
        "100+ language pairs",
        "Priority processing (12-24hrs)",
        "Context-aware translations",
        "Email & chat support",
        "No watermarks"
      ],
      buttonText: "START BASIC PLAN",
      buttonStyle: "border border-gray-300 text-gray-700 hover:bg-gray-50",
      popular: false
    },
    {
      name: "PRO",
      price: "$99",
      period: "per month",
      features: [
        "UNLIMITED book translations per month",
        "Premium AI with human review",
        "All formats + bulk processing",
        "150+ language pairs including rare languages",
        "Express processing (2-6hrs)",
        "Industry-specific terminology",
        "Style & tone preservation",
        "API access for developers",
        "Priority 24/7 support",
        "Custom glossaries"
      ],
      buttonText: "GO PRO NOW",
      buttonStyle: "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 border-0",
      popular: true
    },
    {
      name: "ENTERPRISE",
      price: "$499",
      period: "per month",
      features: [
        "UNLIMITED translations + team accounts per month",
        "AI + Professional human translators",
        "White-label solutions",
        "200+ languages including dialects",
        "Real-time translation (1-2hrs)",
        "Custom domain integration",
        "Advanced security & compliance",
        "Dedicated account manager",
        "Custom API & integrations",
        "Translation memory database",
        "Multi-user collaboration tools"
      ],
      buttonText: "CONTACT SALES",
      buttonStyle: "border border-gray-300 text-gray-700 hover:bg-gray-50",
      popular: false
    }
  ];
  

  function payMoney(price){
    const showPaymentProp=true
    return PaymentDemo(price, showPaymentProp)

  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          PRICING PLANS
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Transform any book into any language with our advanced AI translation technology. From novels to technical manuals, we've got you covered.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`relative bg-white rounded-2xl shadow-xl border-2 transition-all duration-300 hover:shadow-2xl hover:scale-105 group ${
              plan.popular ? 'border-blue-400 ring-4 ring-blue-100' : 'border-gray-200 hover:border-blue-400 hover:ring-4 hover:ring-blue-100'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                  <Star className="w-4 h-4" />
                  <span>POPULAR</span>
                </div>
              </div>
            )}
            
            {/* Hover badge for non-popular plans */}
            {!plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                  <Star className="w-4 h-4" />
                  <span>FEATURED</span>
                </div>
              </div>
            )}
            
            <div className="p-8">
              <div className="text-center mb-8">
                <h3 className={`text-xl font-bold mb-6 tracking-wider transition-colors duration-300 ${
                  plan.popular ? 'text-gray-900' : 'text-gray-900 group-hover:text-blue-600'
                }`}>
                  {plan.name}
                </h3>
                
                <div className="mb-6">
                  <span className={`text-5xl font-bold transition-colors duration-300 ${
                    plan.popular ? 'text-gray-900' : 'text-gray-900 group-hover:text-blue-600'
                  }`}>
                    {plan.price}
                  </span>
                  <p className="text-gray-500 text-sm mt-1">{plan.period}</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <Check className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className="text-gray-700 text-sm leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
              
              <button
                onClick={payMoney(plan.price)}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-200 transform hover:scale-105 ${
                  plan.popular 
                    ? plan.buttonStyle 
                    : plan.buttonStyle + ' group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-600 group-hover:text-white group-hover:border-0'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <p className="text-gray-600 mb-6 text-lg">Join thousands of authors, publishers, and readers worldwide</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 max-w-4xl mx-auto mb-6">
          <div className="flex items-center justify-center space-x-2">
            <Check className="w-4 h-4 text-blue-500" />
            <span>99.9% Translation Accuracy</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Check className="w-4 h-4 text-blue-500" />
            <span>24/7 Customer Support</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Check className="w-4 h-4 text-blue-500" />
            <span>Secure & Confidential</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Check className="w-4 h-4 text-blue-500" />
            <span>30-Day Money Back</span>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 max-w-2xl mx-auto">
          <h3 className="font-semibold text-gray-900 mb-2">Special Launch Offer!</h3>
          <p className="text-gray-600 text-sm">Get 50% off your first month on any paid plan. Use code: <span className="font-mono bg-yellow-100 px-2 py-1 rounded">TRANSLATE50</span></p>
        </div>
      </div>
    </div>
  );
};

export default PricingComponent;