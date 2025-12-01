import React, { useState } from 'react';
import { ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const FinalActionSection: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    broker: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const brokers = [
    'Interactive Brokers',
    'TD Ameritrade', 
    'E*TRADE',
    'Charles Schwab',
    'Fidelity',
    'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (!formData.broker) {
      setError('Please select your broker');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const { error: supabaseError } = await supabase
        .from('contact_submissions')
        .insert([{
          name: 'Early Access Request',
          email: formData.email,
          role: `Broker: ${formData.broker}`,
          status: 'early_access'
        }]);

      if (supabaseError) {
        throw supabaseError;
      }

      setIsSuccess(true);
    } catch (error) {
      console.error('Error submitting early access request:', error);
      setError('Failed to submit request. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-charcoal-light relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-lighter via-charcoal to-charcoal opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {!isSuccess ? (
            <>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Trading?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join the early access program and be among the first to experience Wall-Street AI.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-charcoal border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint focus:border-mint transition-colors text-white"
                    required
                    disabled={isSubmitting}
                  />
                  
                  <select
                    name="broker"
                    value={formData.broker}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-charcoal border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint focus:border-mint transition-colors text-white min-w-[200px]"
                    required
                    disabled={isSubmitting}
                  >
                    <option value="">Select broker</option>
                    {brokers.map((broker) => (
                      <option key={broker} value={broker}>{broker}</option>
                    ))}
                  </select>
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-error bg-error/10 border border-error/20 rounded-lg p-3">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={() => window.open('https://forms.gle/rr74yAhAM2MiGTVi9', '_blank')}
                  className="w-full bg-mint hover:bg-mint-dark text-charcoal font-semibold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 text-lg hover:shadow-[0_0_20px_rgba(12,212,160,0.3)] transform hover:scale-[1.02]"
                >
                  Request Early Access
                  <ArrowRight className="h-5 w-5" />
                </button>
              </form>

              <div className="mt-6 space-y-2 text-sm text-gray-400">
                <p>We respect your privacy and will never share your information.</p>
                <p className="text-xs">
                  Risk Disclosure: Trading involves substantial risk of loss. Past performance does not guarantee future results. 
                  AI agents may not perform as expected in all market conditions.
                </p>
              </div>
            </>
          ) : (
            <div className="py-12">
              <div className="w-20 h-20 bg-mint/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-mint" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Request Received!</h3>
              <p className="text-xl text-gray-300 mb-8">
                Thank you for your interest in ReFi.Trading. We'll be in touch soon with early access details.
              </p>
              <div className="bg-charcoal rounded-lg p-6">
                <h4 className="font-semibold mb-3">What's Next?</h4>
                <ul className="space-y-2 text-sm text-gray-300 text-left max-w-md mx-auto">
                  <li>• Priority access to beta platform</li>
                  <li>• Broker integration setup assistance</li>
                  <li>• Personalized onboarding session</li>
                  <li>• Early adopter benefits and pricing</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FinalActionSection;