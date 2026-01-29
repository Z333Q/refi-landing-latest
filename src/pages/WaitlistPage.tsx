import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, CheckCircle, Users, Sparkles, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const WaitlistPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

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
          setError('This email is already on our waitlist. Thank you for your interest!');
        } else {
          throw supabaseError;
        }
      } else {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error('Error submitting to waitlist:', error);
      setError('Failed to join waitlist. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Join the Waitlist | ReFi.Trading - AI Trading Platform</title>
        <meta name="description" content="Join the ReFi.Trading waitlist to get early access to our revolutionary AI trading platform with reinforcement learning agents and zero-knowledge risk management." />
        <meta property="og:title" content="Join the Waitlist | ReFi.Trading" />
        <meta property="og:description" content="Join the ReFi.Trading waitlist to get early access to our revolutionary AI trading platform with reinforcement learning agents and zero-knowledge risk management." />
      </Helmet>

      <div className="min-h-screen bg-charcoal pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-mint/10 border border-mint/20 rounded-full px-6 py-2 mb-8">
                <Sparkles className="h-5 w-5 text-mint" />
                <span className="text-mint font-medium">Early Access</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Join the <span className="text-gradient">AI Trading</span> Revolution
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                Be among the first to experience institutional-grade AI trading with self-custodied execution, zero-knowledge risk proofs, and reinforcement learning agents.
              </p>
            </div>

            {!isSuccess ? (
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Benefits */}
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-6">What You'll Get</h2>
                    
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-mint/20 flex-shrink-0">
                          <CheckCircle className="h-6 w-6 text-mint" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Priority Access</h3>
                          <p className="text-gray-300">Be the first to access our AI trading platform when it launches, ahead of the general public.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-mint/20 flex-shrink-0">
                          <CheckCircle className="h-6 w-6 text-mint" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Exclusive Updates</h3>
                          <p className="text-gray-300">Receive insider updates on development progress, new features, and beta testing opportunities.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-mint/20 flex-shrink-0">
                          <CheckCircle className="h-6 w-6 text-mint" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Special Pricing</h3>
                          <p className="text-gray-300">Lock in early adopter pricing and exclusive discounts on platform fees and premium features.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-mint/20 flex-shrink-0">
                          <CheckCircle className="h-6 w-6 text-mint" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Direct Feedback Channel</h3>
                          <p className="text-gray-300">Shape the platform's development with direct access to our team and influence on new features.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="bg-charcoal-lighter rounded-lg p-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-mint mb-2">1,100+</div>
                        <div className="text-gray-400">Traders Waiting</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-mint mb-2">Q4 2025</div>
                        <div className="text-gray-400">Expected Launch</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Signup Form */}
                <div className="lg:sticky lg:top-24">
                  <div className="bg-charcoal-lighter rounded-lg p-8 border border-gray-700">
                    <div className="text-center mb-8">
                      <Users className="h-16 w-16 text-mint mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Join the Waitlist</h3>
                      <p className="text-gray-300">Get notified when we launch</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          className="w-full px-4 py-3 bg-charcoal border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint focus:border-mint transition-colors text-white"
                          required
                          disabled={isSubmitting}
                        />
                      </div>

                      {error && (
                        <div className="flex items-center gap-2 text-error bg-error/10 border border-error/20 rounded-lg p-3">
                          <AlertCircle className="h-5 w-5 flex-shrink-0" />
                          <span className="text-sm">{error}</span>
                        </div>
                      )}
                      
                      <button
                        type="submit"
                        disabled={isSubmitting || !email}
                        className="w-full bg-mint hover:bg-mint-dark text-charcoal font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 text-lg hover:shadow-[0_0_20px_rgba(12,212,160,0.3)] transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isSubmitting ? (
                          'Joining Waitlist...'
                        ) : (
                          <>
                            Join Waitlist
                            <ArrowRight className="h-5 w-5" />
                          </>
                        )}
                      </button>
                    </form>
                    
                    <div className="mt-6 text-center text-sm text-gray-400">
                      <p>
                        By joining, you agree to receive updates about ReFi.Trading. 
                        We respect your privacy and will never share your information.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Success State */
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-mint/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-mint" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Welcome to the Waitlist!</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Thank you for joining the ReFi.Trading waitlist. You'll be among the first to know when we launch our revolutionary AI trading platform.
                </p>
                
                <div className="bg-charcoal-lighter rounded-lg p-6 max-w-md mx-auto">
                  <h3 className="font-semibold mb-3">What's Next?</h3>
                  <ul className="space-y-2 text-sm text-gray-300 text-left">
                    <li>• Check your email for a confirmation message</li>
                    <li>• Follow us on social media for updates</li>
                    <li>• Refer friends to move up in the queue</li>
                    <li>• Watch for beta testing invitations</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WaitlistPage;