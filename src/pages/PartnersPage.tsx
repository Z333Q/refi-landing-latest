import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, CheckCircle, Handshake, Building, Users, Download, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import PartnerLogosSection from '../components/PartnerLogosSection';

const PartnersPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    partnershipType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const partnershipTypes = [
    'Technology Integration',
    'Strategic Investment',
    'Distribution Partner',
    'Research Collaboration',
    'Infrastructure Provider',
    'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.company || !formData.partnershipType) {
      setError('Please fill in all required fields');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const { error: supabaseError } = await supabase
        .from('contact_submissions')
        .insert([{
          name: formData.name,
          email: formData.email,
          role: `${formData.role} at ${formData.company} - ${formData.partnershipType}`,
          status: 'partner_inquiry'
        }]);

      if (supabaseError) {
        throw supabaseError;
      }

      setIsSuccess(true);
    } catch (error) {
      console.error('Error submitting partner inquiry:', error);
      setError('Failed to submit inquiry. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Partner with Us | ReFi.Trading - Strategic Partnerships</title>
        <meta name="description" content="Partner with ReFi.Trading to build the future of AI trading. Explore strategic partnerships, technology integrations, and collaboration opportunities." />
        <meta property="og:title" content="Partner with Us | ReFi.Trading" />
        <meta property="og:description" content="Partner with ReFi.Trading to build the future of AI trading. Explore strategic partnerships, technology integrations, and collaboration opportunities." />
      </Helmet>

      <div className="min-h-screen bg-charcoal pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-mint/10 border border-mint/20 rounded-full px-6 py-2 mb-8">
                <Handshake className="h-5 w-5 text-mint" />
                <span className="text-mint font-medium">Strategic Partnerships</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Build the Future of <span className="text-gradient">AI Trading</span> Together
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                Join forces with ReFi.Trading to revolutionize financial markets through strategic partnerships, technology integrations, and collaborative innovation.
              </p>
            </div>

            <PartnerLogosSection variant="compact" />

            {!isSuccess ? (
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Partnership Information */}
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Partnership Opportunities</h2>
                    
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-mint/20 flex-shrink-0">
                          <Building className="h-6 w-6 text-mint" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Technology Integration</h3>
                          <p className="text-gray-300">Integrate your technology with our AI trading platform to create powerful synergies and expand market reach.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-mint/20 flex-shrink-0">
                          <Users className="h-6 w-6 text-mint" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Strategic Investment</h3>
                          <p className="text-gray-300">Join our funding rounds and become a strategic investor in the future of decentralized AI trading infrastructure.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-mint/20 flex-shrink-0">
                          <CheckCircle className="h-6 w-6 text-mint" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Distribution Partners</h3>
                          <p className="text-gray-300">Help us reach new markets and customer segments through your distribution channels and customer base.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-mint/20 flex-shrink-0">
                          <Handshake className="h-6 w-6 text-mint" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-2">Research Collaboration</h3>
                          <p className="text-gray-300">Collaborate on cutting-edge research in reinforcement learning, zero-knowledge proofs, and financial AI.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Partner Benefits */}
                  <div className="bg-charcoal-lighter rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">Partner Benefits</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-mint flex-shrink-0" />
                        <span className="text-gray-300">Early access to new features and APIs</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-mint flex-shrink-0" />
                        <span className="text-gray-300">Co-marketing and joint go-to-market opportunities</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-mint flex-shrink-0" />
                        <span className="text-gray-300">Technical support and integration assistance</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-mint flex-shrink-0" />
                        <span className="text-gray-300">Revenue sharing and partnership incentives</span>
                      </div>
                    </div>
                  </div>

                  {/* Download Partner Deck */}
                  <div className="bg-gradient-to-br from-charcoal-lighter to-charcoal rounded-lg p-6 border border-gray-700">
                    <div className="flex items-center gap-4 mb-4">
                      <Download className="h-8 w-8 text-mint" />
                      <div>
                        <h3 className="font-semibold text-lg">Partner Information Deck</h3>
                        <p className="text-gray-400">Comprehensive overview of partnership opportunities</p>
                      </div>
                    </div>
                    
                    <button className="w-full bg-mint/20 hover:bg-mint/30 text-mint border border-mint/30 hover:border-mint/50 font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                      <Download className="h-5 w-5" />
                      Download Partner Deck
                    </button>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="lg:sticky lg:top-24">
                  <div className="bg-charcoal-lighter rounded-lg p-8 border border-gray-700">
                    <div className="text-center mb-8">
                      <Handshake className="h-16 w-16 text-mint mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Start a Partnership</h3>
                      <p className="text-gray-300">Tell us about your partnership interest</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                            Full Name <span className="text-mint">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-charcoal border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint focus:border-mint transition-colors text-white"
                            required
                            disabled={isSubmitting}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                            Email <span className="text-mint">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-charcoal border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint focus:border-mint transition-colors text-white"
                            required
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                            Company <span className="text-mint">*</span>
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-charcoal border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint focus:border-mint transition-colors text-white"
                            required
                            disabled={isSubmitting}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
                            Your Role
                          </label>
                          <input
                            type="text"
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            placeholder="e.g., CEO, CTO, BD Director"
                            className="w-full px-4 py-3 bg-charcoal border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint focus:border-mint transition-colors text-white"
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="partnershipType" className="block text-sm font-medium text-gray-300 mb-2">
                          Partnership Type <span className="text-mint">*</span>
                        </label>
                        <select
                          id="partnershipType"
                          name="partnershipType"
                          value={formData.partnershipType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-charcoal border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint focus:border-mint transition-colors text-white"
                          required
                          disabled={isSubmitting}
                        >
                          <option value="">Select partnership type</option>
                          {partnershipTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={4}
                          placeholder="Tell us more about your partnership interest and how we can work together..."
                          className="w-full px-4 py-3 bg-charcoal border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-mint focus:border-mint transition-colors text-white resize-none"
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
                        disabled={isSubmitting}
                        className="w-full bg-mint hover:bg-mint-dark text-charcoal font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 text-lg hover:shadow-[0_0_20px_rgba(12,212,160,0.3)] transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isSubmitting ? (
                          'Submitting...'
                        ) : (
                          <>
                            Submit Partnership Inquiry
                            <ArrowRight className="h-5 w-5" />
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              /* Success State */
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-mint/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-mint" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Partnership Inquiry Received!</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Thank you for your interest in partnering with ReFi.Trading. Our business development team will review your inquiry and get back to you within 48 hours.
                </p>
                
                <div className="bg-charcoal-lighter rounded-lg p-6 max-w-md mx-auto">
                  <h3 className="font-semibold mb-3">What's Next?</h3>
                  <ul className="space-y-2 text-sm text-gray-300 text-left">
                    <li>• Our BD team will review your inquiry</li>
                    <li>• We'll schedule an initial discussion call</li>
                    <li>• Explore mutual partnership opportunities</li>
                    <li>• Develop a collaboration framework</li>
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

export default PartnersPage;