import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, BarChart3, TrendingUp, Shield, Loader2, CheckCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import AssetSelector from '../components/AssetSelector';
import MetricsGrid from '../components/MetricsGrid';
import EquityChart from '../components/EquityChart';
import { usePortfolioStore } from '../stores/usePortfolioStore';
import { supabase } from '../lib/supabase';

const PortfolioAnalyzer: React.FC = () => {
  const [hasAccess, setHasAccess] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const { 
    selectedAssets, 
    setPortfolioData, 
    setLoading, 
    isLoading 
  } = usePortfolioStore();

  // Check for access token, dev mode, or previous email submission
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const hasToken = urlParams.has('token');
    const devMode = import.meta.env.VITE_DEV_ACCESS === '1';
    const hasSubmittedEmail = localStorage.getItem('portfolio_analyzer_access') === 'granted';
    
    if (hasToken || devMode || hasSubmittedEmail) {
      setHasAccess(true);
    }
  }, []);

  const handleWaitlistSubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          // Email already exists, but still grant access
          toast.success('Welcome back! Redirecting to analyzer...');
        } else {
          throw error;
        }
      } else {
        toast.success('Email submitted! Redirecting to analyzer...');
      }

      // Show success message briefly
      setShowSuccessMessage(true);
      
      // Store access permission locally
      localStorage.setItem('portfolio_analyzer_access', 'granted');
      localStorage.setItem('portfolio_analyzer_email', email);
      
      // Redirect to analyzer after brief delay
      globalThis.setTimeout(() => {
        setHasAccess(true);
        setShowSuccessMessage(false);
        
        // Clean URL by removing any existing parameters and adding access indicator
        const newUrl = window.location.pathname + '?access=granted';
        window.history.replaceState({}, '', newUrl);
        
        // Show welcome message
        globalThis.setTimeout(() => {
          toast.success(`Welcome to the Portfolio Analyzer! 🚀`);
        }, 500);
      }, 1500);

    } catch (error) {
      console.error('Error submitting to waitlist:', error);
      toast.error('Failed to submit email - please try again');
    } finally {
      setIsSubmitting(false);
    }
  };

  const analyzePortfolio = async () => {
    setLoading(true);
    
    try {
      const payload = selectedAssets.length > 0 
        ? { symbols: selectedAssets }
        : {}; // Empty body for all assets

      const response = await fetch('https://portfolio-analyzer-web-182665799543.us-west1.run.app/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPortfolioData(data);
      toast.success('Portfolio analysis complete!');
    } catch (error) {
      console.error('Error analyzing portfolio:', error);
      toast.error('API unavailable – try later');
    } finally {
      setLoading(false);
    }
  };

  // Debounced analyze function
  const [analyzeTimeout, setAnalyzeTimeout] = useState<NodeJS.Timeout | null>(null);
  
  const debouncedAnalyze = () => {
    if (analyzeTimeout) {
      clearTimeout(analyzeTimeout);
    }
    
    const timeout = globalThis.setTimeout(() => {
      analyzePortfolio();
    }, 300);
    
    setAnalyzeTimeout(timeout);
  };

  // Show success transition screen
  if (showSuccessMessage) {
    return (
      <>
        <Helmet>
          <title>Portfolio Analyzer | ReFi.Trading</title>
          <meta name="description" content="Analyze your portfolio performance with institutional-grade metrics and AI-powered insights." />
        </Helmet>

        <div className="min-h-screen bg-[#0b0d10] relative overflow-hidden flex items-center justify-center">
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 64px), repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 64px)'
          }}></div>

          {/* Background effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#43d4a0]/5 rounded-full filter blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#43d4a0]/5 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="relative z-10 text-center">
            <div className="w-20 h-20 bg-[#43d4a0]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-[#43d4a0]" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Access Granted!</h2>
            <p className="text-xl text-gray-300 mb-8">
              Redirecting you to the Portfolio Analyzer...
            </p>
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-[#43d4a0]" />
              <span className="text-[#43d4a0]">Loading analyzer...</span>
            </div>
          </div>
        </div>

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1b1f24',
              color: '#ffffff',
              border: '1px solid #374151',
            },
          }}
        />
      </>
    );
  }

  if (!hasAccess) {
    return (
      <>
        <Helmet>
          <title>Portfolio Analyzer | ReFi.Trading</title>
          <meta name="description" content="Analyze your portfolio performance with institutional-grade metrics and AI-powered insights." />
        </Helmet>

        <div className="min-h-screen bg-[#0b0d10] relative overflow-hidden">
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 64px), repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 64px)'
          }}></div>

          {/* Background effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#43d4a0]/5 rounded-full filter blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#43d4a0]/5 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="relative z-10 pt-24 pb-16">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-4xl mx-auto text-center">
                {/* Hero Section */}
                <div className="mb-16">
                  <div className="inline-flex items-center gap-2 bg-[#43d4a0]/10 border border-[#43d4a0]/20 rounded-full px-6 py-2 mb-8">
                    <BarChart3 className="h-5 w-5 text-[#43d4a0]" />
                    <span className="text-[#43d4a0] font-medium">Portfolio Analyzer</span>
                  </div>
                  
                  <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">
                    <span className="bg-gradient-to-r from-white via-[#43d4a0] to-white bg-clip-text text-transparent">
                      Institutional-Grade
                    </span>
                    <br />
                    Portfolio Analysis
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                    Analyze your portfolio with advanced metrics used by hedge funds and institutional investors.
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                  <div className="bg-[#101417]/70 ring-1 ring-[#1b1f24] rounded-2xl p-6">
                    <TrendingUp className="h-8 w-8 text-[#43d4a0] mb-4 mx-auto" />
                    <h3 className="text-lg font-semibold text-white mb-2">Advanced Metrics</h3>
                    <p className="text-gray-400">CAGR, Sharpe Ratio, VaR, Expected Shortfall, and Maximum Drawdown analysis.</p>
                  </div>
                  
                  <div className="bg-[#101417]/70 ring-1 ring-[#1b1f24] rounded-2xl p-6">
                    <BarChart3 className="h-8 w-8 text-[#43d4a0] mb-4 mx-auto" />
                    <h3 className="text-lg font-semibold text-white mb-2">Interactive Charts</h3>
                    <p className="text-gray-400">Visualize performance with S&P 500 benchmarking and downloadable data.</p>
                  </div>
                  
                  <div className="bg-[#101417]/70 ring-1 ring-[#1b1f24] rounded-2xl p-6">
                    <Shield className="h-8 w-8 text-[#43d4a0] mb-4 mx-auto" />
                    <h3 className="text-lg font-semibold text-white mb-2">Risk Analysis</h3>
                    <p className="text-gray-400">Comprehensive risk assessment with institutional-grade calculations.</p>
                  </div>
                </div>

                {/* Email Access Form */}
                <div className="max-w-md mx-auto">
                  <div className="bg-[#101417]/70 ring-1 ring-[#1b1f24] rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Join Early Access List</h2>
                    <p className="text-gray-400 mb-6">
                      Early access to execution automation workflows and proof-gated risk controls. Portfolio analytics features available during early access.
                    </p>
                    
                    <form onSubmit={handleWaitlistSubmission} className="space-y-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 bg-[#1b1f24] border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#43d4a0] focus:border-[#43d4a0] transition-colors text-white"
                        required
                        disabled={isSubmitting}
                      />
                      
                      <button
                        type="submit"
                        disabled={isSubmitting || !email}
                        className="w-full bg-[#43d4a0] hover:bg-[#43d4a0]/90 text-black font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            Access Analyzer
                            <ArrowRight className="h-5 w-5" />
                          </>
                        )}
                      </button>
                    </form>
                    
                    <div className="mt-6 text-center text-sm text-gray-400">
                      <p>
                        By submitting, you agree to receive emails about execution automation, product updates, and platform documentation.
                        We respect your privacy and will never share your information.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1b1f24',
              color: '#ffffff',
              border: '1px solid #374151',
            },
          }}
        />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Portfolio Analyzer | ReFi.Trading</title>
        <meta name="description" content="Analyze your portfolio performance with institutional-grade metrics and AI-powered insights." />
      </Helmet>

      <div className="min-h-screen bg-[#0b0d10] relative overflow-hidden">
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 64px), repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 64px)'
        }}></div>

        <div className="relative z-10 pt-24 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                <span className="bg-gradient-to-r from-white via-[#43d4a0] to-white bg-clip-text text-transparent">
                  Portfolio Analyzer
                </span>
              </h1>
              <p className="text-xl text-gray-300">
                Institutional-grade portfolio analysis and risk metrics
              </p>
              {localStorage.getItem('portfolio_analyzer_email') && (
                <p className="text-sm text-gray-400 mt-2">
                  Welcome back, {localStorage.getItem('portfolio_analyzer_email')}!
                </p>
              )}
            </div>

            {/* Main Layout */}
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Asset Selector */}
              <div className="lg:col-span-1">
                <AssetSelector />
                
                {/* Analyze Button */}
                <div className="mt-6">
                  <button
                    onClick={debouncedAnalyze}
                    disabled={isLoading}
                    className="w-full bg-[#43d4a0] hover:bg-[#43d4a0]/90 text-black font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <BarChart3 className="h-5 w-5" />
                        Analyze Portfolio
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Results */}
              <div className="lg:col-span-3 space-y-8">
                {/* Metrics Grid */}
                <MetricsGrid />

                {/* Equity Chart */}
                <EquityChart />
              </div>
            </div>
          </div>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#101417] rounded-lg p-8 flex items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-[#43d4a0]" />
              <span className="text-white text-lg">Analyzing portfolio...</span>
            </div>
          </div>
        )}
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1b1f24',
            color: '#ffffff',
            border: '1px solid #374151',
          },
        }}
      />
    </>
  );
};

export default PortfolioAnalyzer;