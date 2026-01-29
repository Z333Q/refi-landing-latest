import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, Users, CheckCircle, ExternalLink, Play } from 'lucide-react';
import Breadcrumbs from '../components/ui/Breadcrumbs';

const DemoPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Schedule a Demo | ReFi.Trading - AI Execution Automation Platform</title>
        <meta name="description" content="Review broker-connected execution automation, proof-gated risk enforcement, and operator controls. Users define rules and limits. Orders submit through the user's broker account." />
        <meta property="og:title" content="Schedule a Demo | ReFi.Trading" />
        <meta property="og:description" content="Review broker-connected execution automation, proof-gated risk enforcement, and operator controls. Users define rules and limits." />
      </Helmet>

      <div className="min-h-screen bg-charcoal pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <Breadcrumbs items={[{ label: 'Demo' }]} />

            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-mint/10 border border-mint/20 rounded-full px-6 py-2 mb-8">
                <Calendar className="h-5 w-5 text-mint" />
                <span className="text-mint font-medium">Personalized Demo</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                See ReFi.Trading in Action
              </h1>
              
              {/* Embedded Video */}
              <div className="mb-8">
                <div className="relative w-full max-w-4xl mx-auto">
                  <a
                    href="https://drive.google.com/file/d/1vNloy5cfu6hJ6CE9Ly90x0X_I_5ScHhM/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative group"
                  >
                    <div className="relative bg-charcoal-lighter rounded-lg border border-gray-700 aspect-video flex items-center justify-center hover:border-mint/50 transition-colors duration-300">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-mint/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-mint/30 transition-colors duration-300">
                          <Play className="h-10 w-10 text-mint ml-1" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Watch ReFi.Trading Demo</h3>
                        <p className="text-gray-400">2-minute overview • Click to watch on Google Drive</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                Review broker-connected execution automation, proof-gated risk enforcement, and operator controls. Users define rules and limits. Orders submit through the user's broker account. No commitment required.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Demo Benefits */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">What You'll See in the Demo</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-mint/20 flex-shrink-0">
                        <CheckCircle className="h-6 w-6 text-mint" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Live Execution Automation Workflow</h3>
                        <p className="text-gray-300">See order creation, proof gating, and broker submission based on user-configured rules.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-mint/20 flex-shrink-0">
                        <CheckCircle className="h-6 w-6 text-mint" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">zk-VaR Risk Management</h3>
                        <p className="text-gray-300">See how zero-knowledge proofs block orders outside user-defined limits before execution.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-mint/20 flex-shrink-0">
                        <CheckCircle className="h-6 w-6 text-mint" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Non-Custodial Broker Execution</h3>
                        <p className="text-gray-300">Assets remain at broker. ReFi.Trading submits orders through broker APIs. User maintains full custody and control.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-mint/20 flex-shrink-0">
                        <CheckCircle className="h-6 w-6 text-mint" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Portfolio Analytics</h3>
                        <p className="text-gray-300">Explore portfolio analytics tools with performance metrics and risk monitoring.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Demo Details */}
                <div className="bg-charcoal-lighter rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Demo Details</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-mint" />
                      <span className="text-gray-300">30-45 minutes duration</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-mint" />
                      <span className="text-gray-300">1-on-1 with our technical team</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-mint" />
                      <span className="text-gray-300">Available Monday-Friday, 9 AM - 6 PM EST</span>
                    </div>
                  </div>
                </div>

                {/* Testimonial */}
                <div className="bg-gradient-to-br from-charcoal-lighter to-charcoal rounded-lg p-6 border border-gray-700">
                  <blockquote className="text-gray-300 italic mb-4">
                    "Seeing the proof gates, operator controls, and audit trail in the demo was impressive. The control layer architecture gives real transparency."
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-mint/20 rounded-full flex items-center justify-center">
                      <span className="text-mint font-semibold">JD</span>
                    </div>
                    <div>
                      <div className="font-semibold">John D.</div>
                      <div className="text-sm text-gray-400">Portfolio Manager</div>
                    </div>
                  </div>
                </div>

                {/* Disclosure */}
                <div className="bg-charcoal-light border border-gray-700 rounded-lg p-4">
                  <p className="text-xs text-gray-400 leading-relaxed">
                    <strong className="text-gray-300">Disclosure:</strong> ReFi.Trading provides software. No investment advice, no recommendations, no discretionary management. Users define all rules, parameters, and risk limits.
                  </p>
                </div>
              </div>

              {/* Calendar Scheduling */}
              <div className="lg:sticky lg:top-24">
                <div className="bg-charcoal-lighter rounded-lg p-8 border border-gray-700">
                  <div className="text-center mb-8">
                    <Calendar className="h-16 w-16 text-mint mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Schedule Your Demo</h3>
                    <p className="text-gray-300">Choose a time that works best for you</p>
                  </div>
                  
                  {/* Schedule Button */}
                  <div className="text-center space-y-6">
                    <a
                      href="https://calendar.app.google/B3wou3VjWenRouxm7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-mint hover:bg-mint-dark text-charcoal font-semibold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 text-lg hover:shadow-[0_0_20px_rgba(12,212,160,0.3)] transform hover:scale-[1.02]"
                    >
                      <Calendar className="h-6 w-6" />
                      Schedule Demo Now
                      <ExternalLink className="h-5 w-5" />
                    </a>
                    
                    <div className="text-sm text-gray-400">
                      <p>Opens in Google Calendar</p>
                    </div>
                  </div>

                  {/* Alternative Contact */}
                  <div className="mt-8 pt-6 border-t border-gray-600">
                    <div className="text-center">
                      <p className="text-gray-400 mb-4">Prefer to schedule via email?</p>
                      <a
                        href="mailto:demo@refi.trading?subject=Demo Request&body=Hi, I'd like to schedule a demo of ReFi.Trading. Please let me know your available times."
                        className="inline-flex items-center gap-2 text-mint hover:text-mint-light transition-colors"
                      >
                        <Users className="h-4 w-4" />
                        demo@refi.trading
                      </a>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 bg-charcoal rounded-lg p-6 border border-gray-700">
                  <h4 className="font-semibold mb-3">What to Expect</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>• Live demonstration of execution automation agents</li>
                    <li>• Q&A session with our technical team</li>
                    <li>• Discussion of your specific execution needs</li>
                    <li>• Next steps for getting started</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DemoPage;