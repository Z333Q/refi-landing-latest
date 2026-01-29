import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, MapPin, Clock, Users, Code, Brain, Shield, Zap, ExternalLink } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';

const CareersPage: React.FC = () => {
  const openRoles = [
    {
      id: 1,
      title: 'Senior Reinforcement Learning Engineer',
      department: 'Engineering',
      location: 'Remote / San Francisco',
      type: 'Full-time',
      description: 'Build and optimize our ReFinity© AI agents using cutting-edge RL algorithms including PPO, TD3, and RVI-Q.',
      requirements: [
        '5+ years experience in machine learning/AI',
        'Deep expertise in reinforcement learning',
        'Experience with PyTorch, TensorFlow, or JAX',
        'Background in financial markets preferred'
      ],
      icon: <Brain className="h-6 w-6" />
    },
    {
      id: 2,
      title: 'Cryptography Engineer (Zero-Knowledge)',
      department: 'Engineering',
      location: 'Remote / New York',
      type: 'Full-time',
      description: 'Develop and implement zero-knowledge proof systems for our zk-VaR risk management engine.',
      requirements: [
        'Strong background in cryptography',
        'Experience with zk-SNARKs, PLONK, or similar',
        'Proficiency in Rust, Go, or C++',
        'Understanding of blockchain protocols'
      ],
      icon: <Shield className="h-6 w-6" />
    },
    {
      id: 3,
      title: 'Full-Stack Engineer (DeFi)',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'Build user-facing applications and smart contracts for our decentralized trading platform.',
      requirements: [
        'Experience with React, TypeScript, Node.js',
        'Smart contract development (Solidity)',
        'Understanding of DeFi protocols',
        'Web3 integration experience'
      ],
      icon: <Code className="h-6 w-6" />
    },
    {
      id: 4,
      title: 'DevOps Engineer (DePIN Infrastructure)',
      department: 'Infrastructure',
      location: 'Remote',
      type: 'Full-time',
      description: 'Scale our decentralized infrastructure network and optimize node performance across global regions.',
      requirements: [
        'Experience with Kubernetes, Docker',
        'Cloud infrastructure (AWS, GCP, Azure)',
        'Monitoring and observability tools',
        'Network optimization experience'
      ],
      icon: <Zap className="h-6 w-6" />
    }
  ];

  const benefits = [
    {
      title: 'Competitive Compensation',
      description: 'Top-tier salary plus equity in a revolutionary fintech startup',
      icon: '💰'
    },
    {
      title: 'Remote-First Culture',
      description: 'Work from anywhere with flexible hours and async collaboration',
      icon: '🌍'
    },
    {
      title: 'Cutting-Edge Technology',
      description: 'Work with the latest in AI, blockchain, and cryptography',
      icon: '🚀'
    },
    {
      title: 'Learning & Development',
      description: 'Conference budget, courses, and continuous learning opportunities',
      icon: '📚'
    },
    {
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance and wellness stipend',
      icon: '🏥'
    },
    {
      title: 'Token Allocation',
      description: 'Early employee token grants with long-term upside potential',
      icon: '🪙'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Careers | ReFi.Trading - Build Execution Automation Infrastructure</title>
        <meta name="description" content="Join ReFi.Trading and help build execution automation infrastructure. Explore open positions in engineering, cryptography, and infrastructure at our innovative fintech startup." />
        <meta property="og:title" content="Careers | ReFi.Trading" />
        <meta property="og:description" content="Join ReFi.Trading and help build execution automation infrastructure." />
      </Helmet>

      <div className="min-h-screen bg-charcoal pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <Breadcrumbs items={[{ label: 'Careers' }]} />

            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-mint/10 border border-mint/20 rounded-full px-6 py-2 mb-8">
                <Users className="h-5 w-5 text-mint" />
                <span className="text-mint font-medium">We're Hiring</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Build <span className="text-gradient">Execution Automation Infrastructure</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                Join a world-class team of engineers, researchers, and innovators working on cutting-edge AI, cryptography, and decentralized systems.
              </p>
            </div>

            {/* Company Culture */}
            <div className="mb-16">
              <div className="bg-charcoal-lighter rounded-lg p-8 border border-gray-700">
                <h2 className="text-2xl font-bold mb-6 text-center">Why ReFi.Trading?</h2>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🎯</div>
                    <h3 className="font-semibold text-lg mb-2">Mission-Driven</h3>
                    <p className="text-gray-300">Democratize access to institutional-grade AI trading technology</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-4xl mb-4">⚡</div>
                    <h3 className="font-semibold text-lg mb-2">Fast-Paced</h3>
                    <p className="text-gray-300">Move quickly, iterate rapidly, and ship groundbreaking features</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-4xl mb-4">🧠</div>
                    <h3 className="font-semibold text-lg mb-2">Innovation-First</h3>
                    <p className="text-gray-300">Push the boundaries of what's possible in fintech and AI</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Open Positions */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Open Positions</h2>
              
              <div className="space-y-6">
                {openRoles.map((role) => (
                  <div key={role.id} className="bg-charcoal-lighter rounded-lg p-6 border border-gray-700 hover:border-mint/30 transition-all duration-300 group">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="p-2 rounded-lg bg-mint/20 group-hover:bg-mint/30 transition-colors">
                            {role.icon}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold group-hover:text-mint transition-colors">{role.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                              <span className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {role.department}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {role.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {role.type}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-300 mb-4">{role.description}</p>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Key Requirements:</h4>
                          <ul className="space-y-1">
                            {role.requirements.map((req, index) => (
                              <li key={index} className="text-sm text-gray-300 flex items-start gap-2">
                                <span className="text-mint mt-1">•</span>
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="ml-6">
                        <a
                          href={`mailto:careers@refi.trading?subject=Application for ${role.title}&body=Hi, I'm interested in the ${role.title} position. Please find my resume attached.`}
                          className="bg-mint hover:bg-mint-dark text-charcoal font-semibold px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 group-hover:shadow-[0_0_15px_rgba(12,212,160,0.3)]"
                        >
                          Apply Now
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* No Perfect Match */}
              <div className="mt-8 text-center">
                <div className="bg-charcoal-lighter rounded-lg p-6 border border-gray-700">
                  <h3 className="text-xl font-semibold mb-2">Don't see a perfect match?</h3>
                  <p className="text-gray-300 mb-4">
                    We're always looking for exceptional talent. Send us your resume and tell us how you'd like to contribute.
                  </p>
                  <a
                    href="mailto:careers@refi.trading?subject=General Application&body=Hi, I'm interested in joining ReFi.Trading. Here's how I think I can contribute..."
                    className="inline-flex items-center gap-2 text-mint hover:text-mint-light transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Send General Application
                  </a>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center">Benefits & Perks</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="bg-charcoal-lighter rounded-lg p-6 border border-gray-700">
                    <div className="text-3xl mb-4">{benefit.icon}</div>
                    <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-gray-300">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Process */}
            <div className="bg-charcoal-lighter rounded-lg p-8 border border-gray-700">
              <h2 className="text-2xl font-bold mb-6 text-center">Our Hiring Process</h2>
              
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-mint/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-mint font-bold">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Application</h3>
                  <p className="text-sm text-gray-300">Submit your resume and cover letter</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-mint/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-mint font-bold">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Screening</h3>
                  <p className="text-sm text-gray-300">Initial call with our talent team</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-mint/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-mint font-bold">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Technical</h3>
                  <p className="text-sm text-gray-300">Technical interview with the team</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-mint/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-mint font-bold">4</span>
                  </div>
                  <h3 className="font-semibold mb-2">Final</h3>
                  <p className="text-sm text-gray-300">Culture fit and offer discussion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CareersPage;