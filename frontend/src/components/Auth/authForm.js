"use client"
import React from 'react';
import { useState } from 'react';
import { Eye, EyeOff, Mic, Users, Languages, BookOpen, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: <Mic className="w-6 h-6" />,
      title: "VoiceClone in 29 languages",
      description: "Advanced AI voice cloning technology"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Lip-Sync for best-in-class localization",
      description: "Perfect synchronization for natural results"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Multi-speaker dubbing support",
      description: "Handle multiple voices seamlessly"
    },
    {
      icon: <Languages className="w-6 h-6" />,
      title: "Translation to 130+ supported languages",
      description: "Comprehensive global language support"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Translation dictionary",
      description: "Custom terminology for accurate translations"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "AI-generated captions",
      description: "Automated subtitle generation with high accuracy"
    }
  ];

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (isSignUp && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    
    console.log('Form submitted:', { ...formData, isSignUp });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Auto-rotate features
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % Math.min(features.length, 4));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* Left Panel - Auth Form */}
      <div className="w-1/2 bg-white shadow-2xl relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-50 to-transparent rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-50 to-transparent rounded-full translate-y-24 -translate-x-24"></div>
        
        <div className="relative z-10 p-16 flex flex-col justify-center min-h-screen">
          <div className="max-w-md mx-auto w-full">
            {/* Logo */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-18 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">Trans</span>
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Book</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
                Welcome to TransBook AI
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                Join <span className="font-semibold text-blue-600">2+ million users</span> to translate any video in minutes with AI
              </p>
            </div>

            {/* Google Sign Up Button */}
            <button className="w-full flex items-center justify-center gap-4 py-4 px-6 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all duration-200 mb-8 group">
              <svg width="24" height="24" viewBox="0 0 24 24" className="group-hover:scale-110 transition-transform">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-gray-700 font-semibold">Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-gray-500 text-sm font-medium px-2">Or continue with email</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Form */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-gray-800 font-semibold text-sm">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 ${
                      errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    </div>
                  )}
                </div>
                {errors.email && <p className="text-red-500 text-sm flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.email}</p>}
              </div>

              { !isSignUp && (
                <div className="space-y-2">
                <label className="block text-gray-800 font-semibold text-sm">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`w-full px-4 py-4 pr-12 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 ${
                      errors.password ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.password}</p>}
              </div>
              )

              }

              {isSignUp && (
                <div>
                    <div className="space-y-2">
                    <label className="block text-gray-800 font-semibold text-sm">Password</label>
                    <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className={`w-full px-4 py-4 pr-12 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 ${
                        errors.password ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-sm flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.password}</p>}
                </div>

                    
                    <div className="space-y-2">
                    <label className="block text-gray-800 font-semibold text-sm">Confirm Password</label>
                    <div className="relative">
                        <input
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className={`w-full px-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 ${
                            errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        />
                        {formData.confirmPassword && formData.password === formData.confirmPassword && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                        )}
                    </div>
                    {errors.confirmPassword && <p className="text-red-500 text-sm flex items-center gap-1"><AlertCircle className="w-4 h-4" />{errors.confirmPassword}</p>}
                    </div>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-400 disabled:to-blue-500 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {isSignUp ? 'Creating Account...' : 'Signing In...'}
                  </div>
                ) : (
                  isSignUp ? 'Create Account' : 'Sign In'
                )}
              </button>
            </div>

            {/* Toggle Sign In/Up */}
            <div className="mt-8 text-center">
              <span className="text-gray-600">
                {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              </span>
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setErrors({});
                  setFormData({ email: '', password: '', confirmPassword: '' });
                }}
                className="text-blue-600 hover:text-blue-700 font-semibold transition-colors hover:underline"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </div>

            {/* Terms */}
            <div className="mt-6 text-center text-sm text-gray-500 leading-relaxed">
              By {isSignUp ? 'creating an account' : 'signing in'}, you agree to Rask's{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline transition-colors">Privacy Policy</a>
              {' '}and{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Features */}
      <div className="w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-16 flex flex-col justify-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-purple-900/20"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-lg">
          <h2 className="text-5xl font-bold text-white mb-4 leading-tight">
            Best features for
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> high-quality</span>
            <br />results
          </h2>
          <p className="text-slate-300 text-xl mb-16 leading-relaxed">
            Professional-grade AI tools trusted by content creators worldwide
          </p>

          <div className="space-y-8">
            {features.slice(0, 4).map((feature, index) => (
              <div 
                key={index} 
                className={`flex items-start gap-6 p-6 rounded-2xl transition-all duration-500 cursor-pointer group ${
                  currentFeature === index 
                    ? 'bg-white/10 backdrop-blur-sm border border-white/20 scale-105' 
                    : 'hover:bg-white/5 hover:backdrop-blur-sm'
                }`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ${
                  currentFeature === index 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-110' 
                    : 'bg-white/10 backdrop-blur-sm group-hover:bg-white/20'
                }`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-blue-200 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced pagination dots */}
          <div className="flex gap-3 mt-16 justify-center">
            {[0, 1].map(dot => (
              <div 
                key={dot}
                className={`h-2 rounded-full transition-all duration-300 ${
                  dot === 0 ? 'w-8 bg-blue-500' : 'w-2 bg-white/30'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}