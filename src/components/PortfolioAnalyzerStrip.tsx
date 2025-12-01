import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, TrendingUp, Shield, BarChart3, Zap, Sparkles, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import LocalizedNumber from './ui/LocalizedNumber';
import { useLocalization } from '../lib/l10n';
import { imageUrls } from '../lib/imageUrls';

const PortfolioAnalyzerStrip: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const l10n = useLocalization(i18n.language);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const { error: supabaseError } = await supabase
        .from('waitlist')
        .insert([{ email }]);

      if (supabaseError) {
        if (supabaseError.code === '23505') {
          // Email already exists, but still redirect to analyzer
          window.location.href = '/analyzer/';
          return;
        } else {
          throw supabaseError;
        }
      }

      setIsSuccess(true);
      
      // Store access permission and redirect
      localStorage.setItem('portfolio_analyzer_access', 'granted');
      localStorage.setItem('portfolio_analyzer_email', email);
      
      setTimeout(() => {
        window.location.href = '/analyzer/index.html';
      }, 1500);

    } catch (error) {
      console.error('Error submitting to waitlist:', error);
      // For demo purposes, still allow access
      localStorage.setItem('portfolio_analyzer_access', 'granted');
      localStorage.setItem('portfolio_analyzer_email', email);
      window.location.href = '/analyzer/';
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="analyzer-strip" className="relative z-10 bg-charcoal-light overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-lighter via-charcoal to-charcoal opacity-30"></div>
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-mint/5 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-mint/5 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-20 md:py-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Content Section */}
          <div className="max-w-2xl lg:max-w-xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-4 text-sm font-medium bg-zinc-800 text-mint px-3 py-1.5 rounded-full">
              <Sparkles className="h-4 w-4" />
              Early-Access Beta
            </div>
            
            {/* Headline */}
            <h2 className="font-semibold tracking-tight text-3xl md:text-4xl mb-4 leading-tight">
              Sign up for <span className="text-mint">ReFi.Trading&nbsp;AI Agents</span><br/>
              and receive instant Analyzer access.
            </h2>
            
            {/* Sub-headline */}
            <p className="text-gray-400 text-lg md:text-xl mb-8">
              Join the wait-list today to unlock our institutional Portfolio Analyzer <em>free while in beta</em>.  
              Get risk diagnostics, performance insights and cryptographic proof of every metric in under a minute.
            </p>

            {/* Benefit card */}
            <div className="bg-zinc-900/60 border border-zinc-700 rounded-2xl p-5 mb-10">
              <p className="flex items-start gap-3 text-sm text-zinc-300">
                <CheckCircle className="h-5 w-5 text-mint flex-shrink-0 mt-0.5" />
                <span>
                  <strong>What you'll see instantly:</strong>
                  draw-down maps, volatility spikes, exposure overlaps and VaR / ES scores,
                  presented in a single, zero-custody view.
                </span>
              </p>
            </div>

            {/* Outcome-framed bullets */}
            <ul className="grid grid-cols-2 gap-6 text-sm mb-10">
              <li className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-mint flex-shrink-0" />
                <span><strong>Zero-custody safety</strong> assets stay at your broker</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-mint flex-shrink-0" />
                <span><strong>Proof-locked metrics</strong> every number is cryptographically verified</span>
              </li>
              <li className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-mint flex-shrink-0" />
                <span><strong>3 yrs of history</strong> deep context behind every chart</span>
              </li>
              <li className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-mint flex-shrink-0" />
                <span><strong>Realtime refresh</strong> updates with each market tick</span>
              </li>
            </ul>

            {/* CTA */}
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  required
                  disabled={isSubmitting}
                  className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl p-4 text-sm text-white focus:border-mint outline-none transition"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-mint hover:bg-mint-dark text-charcoal font-medium rounded-xl px-6 py-4 transition whitespace-nowrap"
                >
                  {isSubmitting ? 'Processing...' : (
                    <>
                      Get Instant Access <ArrowRight className="inline h-4 w-4 ml-1" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="bg-mint/10 border border-mint/20 rounded-xl p-4 max-w-md">
                <div className="flex items-center gap-2 text-mint font-medium">
                  <CheckCircle className="w-5 h-5" />
                  Added to AI waitlist! Opening analyzer...
                </div>
              </div>
            )}

            {error && (
              <div className="mt-3 text-red-400 text-sm">{error}</div>
            )}

            {/* Social proof & disclaimer */}
            <p className="text-xs text-zinc-500 mt-3">
              1,100&nbsp;+ traders already on the early-access list.
            </p>
            <p className="text-[10px] text-zinc-500 mt-1">
              Analyzer outputs are for educational purposes and do not constitute investment advice.
              Back-tested results are hypothetical and not indicative of future performance.
            </p>
          </div>

          {/* Realistic Portfolio Analyzer Preview */}
          <div className="w-full max-w-md lg:max-w-2xl">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-mint/20 to-mint/10 rounded-2xl filter blur-xl"></div>
              <div className="relative bg-[#101820] rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
                
                {/* Header Bar */}
                <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-[#101820]">
                  <div className="flex items-center gap-3">
                    <img src={imageUrls.logo} alt="ReFi Logo" className="w-6 h-6" />
                    <span className="text-white font-semibold text-lg">Portfolio Analyzer</span>
                  </div>
                </div>

                <div className="p-6">
                  {/* Main Chart Area */}
                  <div className="bg-[#1e1e1e] rounded-lg p-4 mb-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-semibold">Portfolio Performance</h3>
                      <button className="bg-[#0CD4A0] text-black px-3 py-1 rounded text-sm font-medium">
                        Download CSV
                      </button>
                    </div>
                    
                    {/* Realistic Chart */}
                    <div className="h-48 relative">
                      <svg className="w-full h-full" viewBox="0 0 400 180" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="portfolioGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#0CD4A0" stopOpacity="0.4"/>
                            <stop offset="100%" stopColor="#0CD4A0" stopOpacity="0"/>
                          </linearGradient>
                        </defs>
                        
                        {/* Grid lines */}
                        <defs>
                          <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#333" strokeWidth="0.5" opacity="0.3"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                        
                        {/* Enhanced equity curve showing stronger performance with controlled drawdown */}
                        <path
                          d="M0,140 L20,138 L40,135 L60,132 L80,130 L100,125 L120,120 L140,115 L160,110 L180,105 L200,95 L220,85 L240,75 L260,65 L280,55 L300,45 L320,40 L340,35 L360,30 L380,25 L400,20"
                          stroke="#0CD4A0"
                          strokeWidth="2"
                          fill="none"
                        />
                        <path
                          d="M0,140 L20,138 L40,135 L60,132 L80,130 L100,125 L120,120 L140,115 L160,110 L180,105 L200,95 L220,85 L240,75 L260,65 L280,55 L300,45 L320,40 L340,35 L360,30 L380,25 L400,20 L400,180 L0,180 Z"
                          fill="url(#portfolioGradient)"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Performance Metrics Grid - Updated with correct values */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-[#1e1e1e] rounded-lg p-3 border border-gray-700">
                      <div className="text-gray-400 text-xs mb-1">CAGR</div>
                      <div className="text-mint font-bold text-lg">
                        <LocalizedNumber value={22.47} type="percentage" />
                      </div>
                    </div>
                    <div className="bg-[#1e1e1e] rounded-lg p-3 border border-gray-700">
                      <div className="text-gray-400 text-xs mb-1">Sharpe Ratio</div>
                      <div className="text-mint font-bold text-lg">
                        <LocalizedNumber value={4.38} type="number" precision={2} />
                      </div>
                    </div>
                    <div className="bg-[#1e1e1e] rounded-lg p-3 border border-gray-700">
                      <div className="text-gray-400 text-xs mb-1">Max Drawdown</div>
                      <div className="text-red-400 font-bold text-lg">
                        <LocalizedNumber value={-1.08} type="percentage" showSign />
                      </div>
                    </div>
                  </div>

                  {/* Selected Assets Preview */}
                  <div className="mt-4 bg-[#1e1e1e] rounded-lg p-3 border border-gray-700">
                    <div className="text-gray-400 text-xs mb-2">Selected Assets</div>
                    <div className="flex flex-wrap gap-2">
                      {['Airbnb Inc', 'Bank Of America', 'Ford Motor', 'Intel', 'Lululemon'].map((asset, index) => (
                        <span key={index} className="bg-[#0CD4A0]/20 text-[#0CD4A0] px-2 py-1 rounded text-xs">
                          {asset}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioAnalyzerStrip;