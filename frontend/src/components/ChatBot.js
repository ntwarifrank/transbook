"use client"
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, Bot, User } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm here to help you with TransBook. How can I assist you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Predefined responses for common questions
  const getResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('price') || message.includes('cost') || message.includes('how much')) {
      return "Our translation service costs $0.005 per word. For example, a 1000-word document would cost $5.00. New users get 1000 free credits to try our service!";
    }
    
    if (message.includes('file') || message.includes('format') || message.includes('upload')) {
      return "We support various file formats including PDF, DOCX, TXT, and more. Simply drag and drop your file or click to browse and upload.";
    }
    
    if (message.includes('language') || message.includes('translate')) {
      return "We support translation between many languages including English, Spanish, French, German, Chinese, Japanese, Korean, and more. You can select your target language after uploading your document.";
    }
    
    if (message.includes('credit') || message.includes('free')) {
      return "New users receive 1000 free credits (equivalent to $5 worth of translation). Each word costs 1 credit. You can purchase more credits anytime through our secure payment system.";
    }
    
    if (message.includes('time') || message.includes('how long') || message.includes('speed')) {
      return "Translation time depends on document length. Most documents are processed within 2-5 minutes. You'll see real-time progress updates during translation.";
    }
    
    if (message.includes('quality') || message.includes('accurate')) {
      return "We use advanced AI technology to provide high-quality, context-aware translations. Our system maintains formatting and understands document structure for professional results.";
    }
    
    if (message.includes('payment') || message.includes('pay') || message.includes('billing')) {
      return "We use Paddle for secure payments. You can pay with credit cards, PayPal, and other methods. All transactions are encrypted and secure.";
    }
    
    if (message.includes('account') || message.includes('sign up') || message.includes('register')) {
      return "Creating an account is free and gives you access to 1000 free credits, translation history, and faster processing. You can sign up with email or social accounts.";
    }
    
    if (message.includes('download') || message.includes('result')) {
      return "After translation, you can download your document in PDF or TXT format, copy the text to clipboard, or view it directly in your browser.";
    }
    
    if (message.includes('contact') || message.includes('support') || message.includes('help') || message.includes('problem') || message.includes('issue')) {
      return "I'm here to help! You can ask me about:\n\n📋 **Common Questions:**\n• Pricing and payment options\n• Supported file formats\n• Translation languages\n• Account and credit management\n• Translation quality and speed\n\n📞 **Need Human Support?**\n• Email: support@transbook.com\n• Live chat: Available 9 AM - 6 PM EST\n• Response time: Usually within 2 hours\n\n🔧 **Technical Issues:**\n• Upload problems\n• Payment difficulties\n• Account access issues\n• Translation errors\n\nWhat specific question can I help you with?";
    }
    
    if (message.includes('upload') && (message.includes('error') || message.includes('fail') || message.includes('problem'))) {
      return "Having upload issues? Here are common solutions:\n\n🔧 **Quick Fixes:**\n• Check file size (max 50MB)\n• Ensure stable internet connection\n• Try refreshing the page\n• Clear browser cache\n\n📄 **Supported Formats:**\n• PDF, DOCX, TXT, RTF\n• Images with text (JPG, PNG)\n\nIf the problem persists, contact support@transbook.com with your file details.";
    }
    
    if (message.includes('slow') || message.includes('taking long') || message.includes('stuck')) {
      return "Translation taking longer than expected? Here's what might help:\n\n⏱️ **Normal Processing Times:**\n• Small files (1-10 pages): 1-3 minutes\n• Medium files (10-50 pages): 3-8 minutes\n• Large files (50+ pages): 8-15 minutes\n\n🚀 **Speed Tips:**\n• Smaller files process faster\n• PDF files may take longer than text files\n• High server load can cause delays\n\nIf stuck for over 20 minutes, please refresh and try again.";
    }
    
    if (message.includes('refund') || message.includes('money back') || message.includes('cancel')) {
      return "We want you to be satisfied with our service!\n\n💰 **Refund Policy:**\n• Full refund within 24 hours if unsatisfied\n• Partial refund for unused credits\n• No questions asked policy\n\n📧 **To Request Refund:**\n• Email: billing@transbook.com\n• Include your order number\n• Reason for refund (optional)\n\n⏰ **Processing Time:**\n• Refunds processed within 3-5 business days";
    }
    
    if (message.includes('security') || message.includes('privacy') || message.includes('safe') || message.includes('data')) {
      return "Your data security is our top priority! 🔒\n\n🛡️ **Security Measures:**\n• All files encrypted during upload\n• Secure SSL/TLS connections\n• Files deleted after 24 hours\n• No human access to your documents\n\n🔐 **Privacy Protection:**\n• GDPR compliant\n• No data sharing with third parties\n• Anonymous processing\n• Optional account deletion\n\nRead our full Privacy Policy on our website.";
    }
    
    if (message.includes('api') || message.includes('integration') || message.includes('developer')) {
      return "Interested in our API? Great for developers! 👨‍💻\n\n🔌 **API Features:**\n• RESTful API endpoints\n• Bulk translation support\n• Real-time status updates\n• Multiple output formats\n\n📚 **Developer Resources:**\n• Complete API documentation\n• Code examples (Python, Node.js, PHP)\n• Sandbox environment\n• Developer support\n\n📧 **Get Started:**\nContact api@transbook.com for API access and documentation.";
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! Welcome to TransBook. I'm here to help you with any questions about our AI-powered translation service. What would you like to know?";
    }
    
    // Default response
    return "I'd be happy to help you with that! You can ask me about:\n• Pricing and credits\n• Supported file formats\n• Translation languages\n• Account features\n• Payment methods\n• Translation quality\n\nWhat specific question do you have?";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getResponse(inputMessage),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "How much does translation cost?",
    "What file formats are supported?",
    "How can I contact support?",
    "How do I get free credits?",
    "My upload is not working",
    "Is my data secure?",
    "How long does translation take?",
    "Can I get a refund?"
  ];

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center z-40 group ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
        style={{
          boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4), 0 4px 16px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div className="relative">
          <MessageCircle 
            size={26} 
            className="group-hover:scale-110 transition-transform duration-200" 
            strokeWidth={2}
          />
          {/* Notification dot */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
        </div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50 animate-scale-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">TransBook Support</h3>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <p className="text-xs text-white text-opacity-90">Online now</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white text-opacity-80 hover:text-white hover:bg-white hover:bg-opacity-20 p-1 rounded-full transition-all duration-200"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-2xl text-sm shadow-sm ${
                    message.isBot
                      ? 'bg-gray-50 text-gray-800 border border-gray-100'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.isBot && (
                      <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Bot size={12} className="text-blue-600" />
                      </div>
                    )}
                    <div className="whitespace-pre-line leading-relaxed">{message.text}</div>
                    {!message.isBot && (
                      <div className="w-5 h-5 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <User size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-50 border border-gray-100 px-4 py-3 rounded-2xl text-sm flex items-center space-x-3 shadow-sm">
                  <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot size={12} className="text-blue-600" />
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
              <p className="text-xs text-gray-600 mb-3 font-medium">💬 Popular questions:</p>
              <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="w-full text-left text-xs bg-white hover:bg-blue-50 hover:border-blue-200 border border-gray-200 px-3 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <div className="flex space-x-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-300 text-white p-3 rounded-full transition-all duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
