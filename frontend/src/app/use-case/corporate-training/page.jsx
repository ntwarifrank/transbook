"use client"
import Navigation from "../../../components/navigation"
import Footer from "../../../components/footer";
import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Shield, 
  BarChart3,
  Globe,
  Clock,
  Award,
  Zap,
  CheckCircle,
  ArrowRight,
  Star,
  Play,
  Download,
  Settings,
  Lock,
  FileText,
  TrendingUp,
  UserCheck,
  Briefcase,
  Network
} from 'lucide-react';

const CorporatePage = () => {
  const [activeIndustry, setActiveIndustry] = useState('technology');

  const stats = [
    { number: "10K+", label: "Companies Served", icon: <Building2 className="w-6 h-6" /> },
    { number: "50+", label: "Industry Verticals", icon: <Briefcase className="w-6 h-6" /> },
    { number: "99.9%", label: "Uptime Guarantee", icon: <Shield className="w-6 h-6" /> },
    { number: "2hrs", label: "Urgent Translation SLA", icon: <Clock className="w-6 h-6" /> }
  ];

  const industries = {
    technology: {
      title: "Technology & Software",
      icon: <Settings className="w-8 h-8" />,
      description: "Technical documentation, user guides, and training materials",
      challenges: ["Complex technical terminology", "Rapid product updates", "Global developer teams"],
      solutions: ["API documentation translation", "Code comment localization", "Technical training modules"],
      results: "95% faster global product launches"
    },
    finance: {
      title: "Financial Services",
      icon: <TrendingUp className="w-8 h-8" />,
      description: "Compliance training, risk management, and regulatory materials",
      challenges: ["Regulatory compliance", "Risk management protocols", "Financial terminology"],
      solutions: ["Compliance document translation", "Risk assessment materials", "Financial training content"],
      results: "100% regulatory compliance across markets"
    },
    healthcare: {
      title: "Healthcare & Pharma",
      icon: <UserCheck className="w-8 h-8" />,
      description: "Medical training, safety protocols, and patient care guidelines",
      challenges: ["Medical terminology accuracy", "Safety protocol compliance", "Cultural sensitivity"],
      solutions: ["Medical procedure guides", "Safety training materials", "Patient communication tools"],
      results: "Zero safety incidents in translated protocols"
    },
    manufacturing: {
      title: "Manufacturing",
      icon: <Network className="w-8 h-8" />,
      description: "Safety manuals, operational procedures, and quality standards",
      challenges: ["Safety protocol accuracy", "Equipment documentation", "Quality standards"],
      solutions: ["Safety manual translation", "Equipment operation guides", "Quality control procedures"],
      results: "40% reduction in training time"
    }
  };

  const benefits = [
    {
      icon: <Users className="w-12 h-12" />,
      title: "Global Team Alignment",
      description: "Ensure all international teams receive consistent, high-quality training materials in their native language, eliminating communication barriers.",
      features: ["Consistent messaging", "Cultural adaptation", "Multi-location sync", "Real-time updates"],
      color: "blue"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Compliance & Security",
      description: "Meet regulatory requirements across different markets with accurate legal and compliance translations.",
      features: ["GDPR adherence", "Industry regulations", "Audit trails"],
      color: "green"
    },
    {
      icon: <BarChart3 className="w-12 h-12" />,
      title: "Performance Analytics",
      description: "Track training effectiveness across different languages and regions with comprehensive analytics and reporting tools.",
      features: ["Usage analytics", "Performance metrics", "ROI tracking", "Custom reports"],
      color: "orange"
    }
  ];

  const solutions = [
    {
      title: "Training Materials",
      description: "Employee handbooks, onboarding guides, and skill development content",
      icon: <FileText className="w-8 h-8" />,
      features: ["Interactive content", "Multimedia support", "Progress tracking", "Certification integration"]
    },
    {
      title: "Compliance Documentation",
      description: "Regulatory materials, safety protocols, and legal requirements",
      icon: <Lock className="w-8 h-8" />,
      features: ["Regulatory accuracy", "Legal compliance", "Version control", "Audit support"]
    },
    {
      title: "Technical Documentation",
      description: "Product manuals, API docs, and operational procedures",
      icon: <Settings className="w-8 h-8" />,
      features: ["Technical accuracy", "Format preservation", "Version sync", "Developer tools"]
    },
    {
      title: "Communication Materials",
      description: "Internal communications, announcements, and policy updates",
      icon: <Network className="w-8 h-8" />,
      features: ["Brand consistency", "Cultural adaptation", "Multi-channel distribution", "Feedback loops"]
    }
  ];

  const caseStudies = [
    {
      company: "Global Tech Corp",
      industry: "Technology",
      employees: "50,000+",
      challenge: "Standardize training across 40 countries",
      solution: "Automated translation pipeline for all training materials",
      results: ["80% reduction in training deployment time", "95% employee satisfaction score", "100% compliance across regions"],
      timeline: "6 months",
      color: "blue"
    },
    {
      company: "International Bank",
      industry: "Financial Services",
      employees: "25,000+",
      challenge: "Meet compliance requirements in 15 markets",
      solution: "Regulatory-compliant translation with legal review",
      results: ["Zero compliance violations", "60% faster regulatory approvals", "Unified risk management protocols"],
      timeline: "4 months",
      color: "green"
    },
    {
      company: "Manufacturing Giant",
      industry: "Manufacturing",
      employees: "75,000+",
      challenge: "Ensure safety protocol consistency globally",
      solution: "Safety manual translation with expert review",
      results: ["40% reduction in safety incidents", "Faster training completion", "Improved safety culture"],
      timeline: "8 months",
      color: "orange"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
        <Navigation />
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Unify Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">Global Workforce</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Ensure consistent training and communication across all international teams with translation solutions.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <Play className="w-5 h-5 mr-2" /> Watch Overview
                </button>
              </div>
            </div>
            <div className="lg:pl-12">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                    <div className="text-blue-500 mb-3">{stat.icon}</div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Industry Solutions */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Industry-Specific Solutions</h2>
            <p className="text-xl text-gray-600">Tailored translation solutions for your industry needs</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.keys(industries).map((key) => (
              <button
                key={key}
                onClick={() => setActiveIndustry(key)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  activeIndustry === key 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {industries[key].title}
              </button>
            ))}
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="text-blue-500">{industries[activeIndustry].icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900">{industries[activeIndustry].title}</h3>
                </div>
                <p className="text-gray-600 mb-6 text-lg">{industries[activeIndustry].description}</p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Award className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-800">Key Result</span>
                  </div>
                  <p className="text-green-700 font-semibold">{industries[activeIndustry].results}</p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Common Challenges:</h4>
                  <div className="space-y-2">
                    {industries[activeIndustry].challenges.map((challenge, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span className="text-gray-700">{challenge}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Our Solutions:</h4>
                  <div className="space-y-2">
                    {industries[activeIndustry].solutions.map((solution, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-blue-500" />
                        <span className="text-gray-700">{solution}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Lexivana</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Solutions built for global organizations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="group">
                <div className={`bg-${benefit.color}-50 border border-${benefit.color}-200 rounded-2xl p-8 hover:shadow-lg transition-all`}>
                  <div className={`text-${benefit.color}-500 mb-6`}>
                    {benefit.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{benefit.description}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {benefit.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className={`w-2 h-2 bg-${benefit.color}-400 rounded-full`}></div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Solutions Grid */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Corporate Content Solutions</h2>
            <p className="text-xl text-gray-600">Comprehensive translation for all your corporate needs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {solutions.map((solution, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-blue-300 transition-all group">
                <div className="text-blue-500 group-hover:text-blue-600 transition-colors mb-4">
                  {solution.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{solution.title}</h3>
                <p className="text-gray-600 mb-4">{solution.description}</p>
                <div className="space-y-2">
                  {solution.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Case Studies */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">See how global organizations transform with Lexivana</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div key={index} className={`bg-white rounded-2xl shadow-lg p-8 border-t-4 border-${study.color}-500`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">{study.company}</h3>
                  <span className={`bg-${study.color}-100 text-${study.color}-800 px-3 py-1 rounded-full text-sm font-semibold`}>
                    {study.industry}
                  </span>
                </div>
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{study.employees} employees</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Challenge</h4>
                    <p className="text-gray-600 text-sm">{study.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Solution</h4>
                    <p className="text-gray-600 text-sm">{study.solution}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Results</h4>
                    <div className="space-y-1">
                      {study.results.map((result, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className={`w-4 h-4 text-${study.color}-500`} />
                          <span className="text-sm text-gray-700">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={`bg-${study.color}-50 rounded-lg p-3 text-center`}>
                    <span className={`text-${study.color}-800 font-bold`}>Completed in {study.timeline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Scale Globally?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of organizations transforming their global operations with Lexivana
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="border border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Contact Sales Team
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CorporatePage;