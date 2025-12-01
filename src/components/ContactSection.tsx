import React, { useState } from 'react';
import SectionHeader from './ui/SectionHeader';
import { ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    role: '',
    submitted: false,
    error: '',
    isSubmitting: false
  });

  const roles = [
    'Investor',
    'Researcher',
    'Partner',
    'Accelerator'
  ];

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset error state
    setFormState(prev => ({ ...prev, error: '' }));

    // Validate required fields
    if (!formState.name.trim()) {
      setFormState(prev => ({ ...prev, error: 'Please enter your name' }));
      return;
    }

    if (!formState.email.trim()) {
      setFormState(prev => ({ ...prev, error: 'Please enter your email' }));
      return;
    }

    if (!validateEmail(formState.email)) {
      setFormState(prev => ({ ...prev, error: 'Please enter a valid email address' }));
      return;
    }

    if (!formState.role) {
      setFormState(prev => ({ ...prev, error: 'Please select your role' }));
      return;
    }

    setFormState(prev => ({ ...prev, isSubmitting: true }));

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([{
          name: formState.name,
          email: formState.email,
          role: formState.role
        }]);

      if (error) throw error;

      setFormState(prev => ({
        ...prev,
        submitted: true,
        isSubmitting: false
      }));
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormState(prev => ({
        ...prev,
        error: 'Failed to submit form. Please try again later.',
        isSubmitting: false
      }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value,
      error: '' // Clear error when user starts typing
    }));
  };

  return (
    <section id="contact" className="section-spacing bg-charcoal-lighter relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-lighter via-charcoal to-charcoal opacity-30"></div>
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-mint/5 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-mint/5 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeader 
          title="Request Early Access" 
          subtitle="Join our exclusive early access program and be among the first to experience the future of AI trading" 
        />

        <div className="max-w-2xl mx-auto">
          <div className="card">
            {!formState.submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name <span className="text-mint">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-charcoal-light border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint focus:border-mint transition-colors duration-200 text-white"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address <span className="text-mint">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-charcoal-light border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint focus:border-mint transition-colors duration-200 text-white"
                    placeholder="name@company.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Role <span className="text-mint">*</span>
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formState.role}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-charcoal-light border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint focus:border-mint transition-colors duration-200 text-white"
                  >
                    <option value="">Select your role</option>
                    {roles.map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

                {formState.error && (
                  <div className="flex items-center gap-2 text-error">
                    <AlertCircle className="h-5 w-5" />
                    <span>{formState.error}</span>
                  </div>
                )}
                
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={formState.isSubmitting}
                    className="w-full bg-mint hover:bg-mint-dark text-charcoal font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center text-lg group disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(12,212,160,0.3)]"
                  >
                    {formState.isSubmitting ? (
                      'Submitting...'
                    ) : (
                      <>
                        Get Early Access
                        <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </button>
                </div>
                
                <div className="text-center text-sm text-gray-400 mt-6">
                  By submitting, you agree to receive occasional updates about our platform. We respect your privacy and will never share your information.
                </div>
              </form>
            ) : (
              <div className="text-center py-12">
                <div className="flex justify-center mb-6">
                  <CheckCircle className="h-16 w-16 text-mint" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
                <p className="text-gray-300 text-lg mb-8">
                  Your request for early access has been received. We'll be in touch shortly with more information about ReFi.Trading.
                </p>
                <div className="bg-charcoal-light p-6 rounded-lg text-gray-300">
                  <p>
                    In the meantime, check your email for our whitepaper and opportunities to schedule a personalized demo.
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-300">
              For general inquiries: {' '}
              <a href="mailto:hello@refi.trading" className="text-mint hover:underline">
                hello@refi.trading
              </a>
              {' '} | For partnerships: {' '}
              <a href="/partners" className="text-mint hover:underline">
                Request partner deck
              </a>
              {' '} | Join our team: {' '}
              <a href="/careers" className="text-mint hover:underline">
                View open roles
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;