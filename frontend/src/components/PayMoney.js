"use client"
import React, { useState } from 'react';
import { X, CreditCard, Shield, Info } from 'lucide-react';

const PaymentForm = ({ isOpen, onClose, selectedPlan = "PRO" ,}) => {
  const [currentStep, setCurrentStep] = useState(1); // 1: Details, 2: Payment
  const [formData, setFormData] = useState({
    email: '',
    country: 'Rwanda',
    quantity: 1,
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    marketingOptIn: true
  });

  const planPrices = {
    FREE: 0,
    BASIC: 29,
    PRO: 99,
    ENTERPRISE: 499
  };

  const currentPrice = planPrices[selectedPlan] || 99;
  const subtotal = currentPrice * formData.quantity;
  const vat = 0; // Adjust based on country
  const total = subtotal + vat;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex">
          {/* Left Side - Order Summary */}
          <div className="w-1/2 p-8 bg-gray-50 rounded-l-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Order summary</h2>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-8">
              <div className="text-3xl font-bold text-green-500 mb-2">
                ${currentPrice}.00
              </div>
              <div className="text-gray-600 text-sm flex items-center">
                then ${currentPrice}.00 monthly
                <Info className="w-4 h-4 ml-1" />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">{selectedPlan}</h3>
              <p className="text-gray-600 text-sm mb-4">{selectedPlan} plan</p>
              
              <div className="flex items-center space-x-3 mb-4">
                <button 
                  onClick={() => handleInputChange('quantity', Math.max(1, formData.quantity - 1))}
                  className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="w-8 text-center">{formData.quantity}</span>
                <button 
                  onClick={() => handleInputChange('quantity', formData.quantity + 1)}
                  className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal}.00</span>
              </div>
              
              <button className="text-blue-600 hover:text-blue-700 text-left">
                Add discount
              </button>
              
              <div className="flex justify-between">
                <span>VAT</span>
                <span>${vat}.00</span>
              </div>
              
              <button className="text-blue-600 hover:text-blue-700 text-left">
                Add VAT number
              </button>
              
              <hr className="my-4" />
              
              <div className="flex justify-between font-semibold">
                <span>Due today</span>
                <span>${total}.00</span>
              </div>
              
              <div className="flex justify-between text-gray-600">
                <span>Due on {new Date(Date.now() + 30*24*60*60*1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                <span>${total}.00</span>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-1/2 p-8">
            {/* Progress Steps */}
            <div className="flex items-center mb-8">
              <span className={`${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'} font-medium`}>
                Your details
              </span>
              <span className="mx-3 text-gray-300">g</span>
              <span className={`${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'} font-medium`}>
                Payment
              </span>
            </div>

            {currentStep === 1 ? (
              // Step 1: Your Details
              <div>
                <div className="mb-6">
                  <p className="text-gray-600 text-sm mb-4">
                    We collect this information to help combat fraud, and to keep your payment secure.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    >
                      <option value="Rwanda">Rwanda</option>
                      <option value="Kenya">Kenya</option>
                      <option value="Uganda">Uganda</option>
                      <option value="Tanzania">Tanzania</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.marketingOptIn}
                      onChange={(e) => handleInputChange('marketingOptIn', e.target.checked)}
                      className="mt-1"
                    />
                    <p className="text-sm text-gray-600">
                      TransBook may send me product updates and offers via email. 
                      It is possible to opt-out at any time.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-full mt-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  Continue
                </button>
              </div>
            ) : (
              // Step 2: Payment
              <div>
                <div className="space-y-6">
                  {/* PayPal Option */}
                  <div className="border-2 border-blue-200 rounded-lg p-4 hover:border-blue-400 cursor-pointer transition-colors">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="text-blue-600 font-bold text-lg">Pay</div>
                      <div className="text-blue-400 font-bold text-lg">Pal</div>
                    </div>
                  </div>

                  <div className="text-center text-gray-500 text-sm">Or pay by card</div>

                  {/* Card Details */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                          className="w-full p-3 pr-20 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                          placeholder="XXXX XXXX XXXX XXXX"
                          maxLength={19}
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
                          <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
                          <div className="w-8 h-5 bg-red-500 rounded"></div>
                          <div className="w-8 h-5 bg-blue-400 rounded"></div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name on card
                      </label>
                      <input
                        type="text"
                        value={formData.cardName}
                        onChange={(e) => handleInputChange('cardName', e.target.value)}
                        className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="Full name as on card"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiration date
                        </label>
                        <input
                          type="text"
                          value={formData.expiry}
                          onChange={(e) => handleInputChange('expiry', e.target.value)}
                          className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Security code
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.cvv}
                            onChange={(e) => handleInputChange('cvv', e.target.value)}
                            className="w-full p-3 pr-10 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                            placeholder="CVV"
                            maxLength={4}
                          />
                          <Shield className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
                    Subscribe now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-gray-50 text-xs text-gray-500 rounded-b-2xl">
          This order process is conducted by our online reseller & Merchant of Record, TransBook.com, who also handles order-related inquiries and returns. 
          Your data will be shared with TransBook for product fulfillment.
        </div>
      </div>
    </div>
  );
};

// Example usage component
const PaymentDemo = ({showPaymentProp, price}) => {
  const [showPayment, setShowPayment] = useState(showPaymentProp);
  
  return (
    <div className="p-8">
      
      
      <PaymentForm 
        isOpen={showPayment} 
        onClose={() => setShowPayment(false)} 
        selectedPlan="PRO"
        price={ price }
      />
    </div>
  );
};

export default PaymentDemo;