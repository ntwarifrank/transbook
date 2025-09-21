"use client"
import React, { useState } from 'react'; // ← Add this import
import PricingPlans from "../../components/PricingPlan";
import PaddlePayment from "../../components/paymentComponent";

// Corrected function syntax
function Pricing() { // ← Remove the => arrow
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Optional: Add user management
  const [userEmail] = useState("user@example.com"); // Get this from your auth context

  const handlePlanSelect = (plan) => {
    console.log('Plan selected:', plan);
    setSelectedPlan(plan);
    setShowPayment(true);
  };

  const handlePaymentSuccess = (data) => {
    console.log('Payment successful:', data);
    // You can add success notifications here
    setShowPayment(false);
    // Redirect to dashboard
    window.location.href = '/dashboard';
  };

  const handlePaymentError = (error) => {
    console.error('Payment failed:', error);
    // Better error handling than alert
    setShowPayment(false);
    // You could show a toast notification instead
    alert(`Payment failed: ${error}`);
  };

  const handleClosePayment = () => {
    setShowPayment(false);
    setSelectedPlan(null);
  };

  return (
    <div>
      <PricingPlans 
        onPlanSelect={handlePlanSelect}
        userEmail={userEmail}
      />

      <PaddlePayment
        isOpen={showPayment}
        onClose={handleClosePayment}
        planData={selectedPlan}
        userEmail={userEmail}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
      />
    </div>
  );
}

export default Pricing;