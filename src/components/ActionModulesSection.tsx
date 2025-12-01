import React, { useState } from 'react';
import { Calendar, BarChart3, ArrowRight, Clock, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import LocalizedNumber from './ui/LocalizedNumber';

const ActionModulesSection: React.FC = () => {
  const [demoForm, setDemoForm] = useState({
    name: '',
    email: '',
    broker: '',
    role: '',
    timePreference: ''
  });
  const [isSubmittingDemo, setIsSubmittingDemo] = useState(false);
  const [demoSuccess, setDemoSuccess] = useState(false);
  const [demoError, setDemoError] = useState('');

  const brokers = [
    'Interactive Brokers',
    'TD Ameritrade',
    'E*TRADE',
    'Charles Schwab',
    'Fidelity',
    'Other'
  ];

  const roles = [
    'Individual Trader',
    'Portfolio Manager',
    'Hedge Fund',
    'Family Office',
    'RIA',
    'Other'
  ];

  const timePreferences = [
    'Morning (9-12 EST)',
    'Afternoon (12-5 EST)',
    'Evening (5-8 EST)',
    'Flexible'
  ];

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!demoForm.name || !demoForm.email || !demoForm.broker || !demoForm.role) {
      setDemoError('Please fill in all required fields');
      return;
    }

    if (!demoForm.email.includes('@')) {
      setDemoError('Please enter a valid email address');
      return;
    }

    setIsSubmittingDemo(true);
    setDemoError('');

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([{
          name: demoForm.name,
          email: demoForm.email,
          role: `${demoForm.role} - ${demoForm.broker} - ${demoForm.timePreference}`,
          status: 'demo_request'
        }]);

      if (error) throw error;

      setDemoSuccess(true);
    } catch (error) {
      console.error('Error submitting demo request:', error);
      setDemoError('Failed to submit demo request. Please try again later.');
    } finally {
      setIsSubmittingDemo(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDemoForm(prev => ({
      ...prev,
      [name]: value
    }));
    setDemoError('');
  };

  return (
    <section className="py-20 md:py-24 bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-lighter via-charcoal to-charcoal opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Schedule a Demo */}
            <div className="bg-charcoal-lighter rounded-lg p-8 border border-gray-700">
              <div className="text-center mb-6">
                <Calendar className="h-12 w-12 text-mint mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">See it live in 15 minutes</h3>
                <p className="text-gray-300">For retail and pro workflows</p>
              </div>

              {!demoSuccess ? (
                <form onSubmit={handleDemoSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      value={demoForm.name}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      className="w-full px-4 py-3 bg-charcoal border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint focus:border-mint transition-colors text-white"
                      required
                      disabled={isSubmittingDemo}
                    />
                    <input
                      type="email"
                      name="email"
                      value={demoForm.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      className="w-full px-4 py-3 bg-charcoal border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint focus:border-mint transition-colors text-white"
                      required
                      disabled={isSubmittingDemo}
                    />
                  </div>

                  <select
                    name="broker"
                    value={demoForm.broker}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-charcoal border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint focus:border-mint transition-colors text-white"
                    required
                    disabled={isSubmittingDemo}
                  >
                    <option value="">Select your broker</option>
                    {brokers.map((broker) => (
                      <option key={broker} value={broker}>{broker}</option>
                    ))}
                  </select>

                  <select
                    name="role"
                    value={demoForm.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-charcoal border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint focus:border-mint transition-colors text-white"
                    required
                    disabled={isSubmittingDemo}
                  >
                    <option value="">Select your role</option>
                    {roles.map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>

                  <select
                    name="timePreference"
                    value={demoForm.timePreference}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-charcoal border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint focus:border-mint transition-colors text-white"
                    disabled={isSubmittingDemo}
                  >
                    <option value="">Time preference (optional)</option>
                    {timePreferences.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>

                  {demoError && (
                    <div className="flex items-center gap-2 text-error bg-error/10 border border-error/20 rounded-lg p-3">
                      <AlertCircle className="h-5 w-5 flex-shrink-0" />
                      <span className="text-sm">{demoError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmittingDemo}
                    className="w-full bg-mint hover:bg-mint-dark text-charcoal font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmittingDemo ? (
                      'Booking Demo...'
                    ) : (
                      <>
                        Book a Demo
                        <Calendar className="h-5 w-5" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-mint/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-mint" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Demo Requested!</h4>
                  <p className="text-gray-300">We'll contact you within 24 hours to schedule your personalized demo.</p>
                </div>
              )}
            </div>

            {/* Portfolio Analyzer Teaser */}
            <div className="bg-charcoal-lighter rounded-lg p-8 border border-gray-700">
              <div className="text-center mb-6">
                <BarChart3 className="h-12 w-12 text-mint mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Stress-test your portfolio in 30 seconds</h3>
                <p className="text-gray-300">Read-only, no custody</p>
              </div>

              <div className="space-y-4">
                <div className="bg-charcoal rounded-lg p-4">
                  <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    <div>
                      <div className="text-mint font-bold text-lg">
                        <LocalizedNumber value={28.06} type="percentage" />
                      </div>
                      <div className="text-gray-400">CAGR</div>
                    </div>
                    <div>
                      <div className="text-mint font-bold text-lg">
                        <LocalizedNumber value={2.07} type="number" precision={2} />
                      </div>
                      <div className="text-gray-400">Sharpe</div>
                    </div>
                    <div>
                      <div className="text-red-400 font-bold text-lg">
                        <LocalizedNumber value={-7.6} type="percentage" showSign />
                      </div>
                      <div className="text-gray-400">Max DD</div>
                    </div>
                  </div>
                </div>

                <a
                  href="/analyzer/index.html"
                  className="w-full bg-mint/20 hover:bg-mint/30 text-mint border border-mint/30 hover:border-mint/50 font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Run Free Test
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActionModulesSection;