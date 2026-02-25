import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, FileCheck } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface FormData {
  full_name: string;
  email: string;
  phone: string;
  company: string;
  investor_type: string;
  investment_range: string;
  interest_level: string;
  funding_timeline: string;
  areas_of_interest: string[];
  how_heard: string;
  additional_notes: string;
  accredited_investor: boolean;
  consent_data_processing: boolean;
  consent_communications: boolean;
}

const InvestorFormPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    email: '',
    phone: '',
    company: '',
    investor_type: '',
    investment_range: '',
    interest_level: '',
    funding_timeline: '',
    areas_of_interest: [],
    how_heard: '',
    additional_notes: '',
    accredited_investor: false,
    consent_data_processing: false,
    consent_communications: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxGroupChange = (value: string) => {
    setFormData((prev) => {
      const current = prev.areas_of_interest;
      if (current.includes(value)) {
        return { ...prev, areas_of_interest: current.filter((v) => v !== value) };
      } else {
        return { ...prev, areas_of_interest: [...current, value] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.consent_data_processing) {
      toast.error('You must consent to data processing to submit the form');
      return;
    }

    if (!formData.accredited_investor) {
      toast.error('This opportunity is currently limited to accredited investors');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('investor_forms').insert([
        {
          ...formData,
          ip_address: null,
        },
      ]);

      if (error) throw error;

      setIsSubmitted(true);
      toast.success('Thank you for your interest! We will be in touch soon.');

      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-charcoal-deep flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-charcoal-light border border-mint/20 rounded-2xl p-8 text-center"
        >
          <CheckCircle2 className="w-16 h-16 text-mint mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Thank You!</h2>
          <p className="text-gray-400 mb-4">
            Your information has been submitted successfully. We'll review your details and be in touch soon.
          </p>
          <button
            onClick={() => navigate('/')}
            className="text-mint hover:text-mint/80 transition-colors text-sm font-medium"
          >
            Return to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal-deep text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">Investor Information Form</h1>
          <p className="text-gray-400 text-lg">
            Thank you for your interest in ReFi Trading. Please complete this form to help us understand your investment interests and eligibility.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-yellow-900/20 border border-yellow-600/40 rounded-xl p-6 mb-8"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-200/90 space-y-3">
              <div>
                <strong className="block mb-1">NOTICE</strong>
                <p>All ReFi Trading Inc materials are preliminary and for evaluation only. Content may change without notice. This is not an offer to sell or a solicitation to buy any security. No financial, legal, or tax advice is provided. You receive a limited, revocable, non-transferable right to review for internal evaluation. Do not copy, forward, or publish without prior written consent. Some statements are forward-looking and involve risks and uncertainties. We do not undertake to update these materials. By proceeding you agree to these terms.</p>
              </div>

              <div>
                <strong className="block mb-1">DATA AND CONTACT</strong>
                <p>By submitting this form you consent to ReFi Trading Inc storing and processing your information for investor outreach and communications by email or phone. See our Privacy Policy at <a href="https://refi.trading/legal/privacy" className="text-mint hover:underline">refi.trading/legal/privacy</a>. You can withdraw consent at any time.</p>
              </div>

              <div>
                <strong className="block mb-1">ELIGIBILITY</strong>
                <p>Access is permitted only where lawful. Detailed materials or offering documents will be shared only after eligibility checks where required.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-charcoal-light border border-charcoal-border rounded-2xl p-8 space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-charcoal-deep border border-charcoal-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-mint/50 focus:border-mint transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-charcoal-deep border border-charcoal-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-mint/50 focus:border-mint transition-colors"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-charcoal-deep border border-charcoal-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-mint/50 focus:border-mint transition-colors"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Company/Organization
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-charcoal-deep border border-charcoal-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-mint/50 focus:border-mint transition-colors"
                placeholder="Acme Ventures"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Investor Type <span className="text-red-400">*</span>
            </label>
            <select
              name="investor_type"
              value={formData.investor_type}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-charcoal-deep border border-charcoal-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-mint/50 focus:border-mint transition-colors"
            >
              <option value="">Select investor type</option>
              <option value="Angel Investor">Angel Investor</option>
              <option value="Venture Capital">Venture Capital</option>
              <option value="Family Office">Family Office</option>
              <option value="Institutional Investor">Institutional Investor</option>
              <option value="Corporate Investor">Corporate Investor</option>
              <option value="Private Equity">Private Equity</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Typical Investment Range <span className="text-red-400">*</span>
            </label>
            <select
              name="investment_range"
              value={formData.investment_range}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-charcoal-deep border border-charcoal-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-mint/50 focus:border-mint transition-colors"
            >
              <option value="">Select investment range</option>
              <option value="$25K - $100K">$25K - $100K</option>
              <option value="$100K - $250K">$100K - $250K</option>
              <option value="$250K - $500K">$250K - $500K</option>
              <option value="$500K - $1M">$500K - $1M</option>
              <option value="$1M - $5M">$1M - $5M</option>
              <option value="$5M+">$5M+</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Level of Interest <span className="text-red-400">*</span>
            </label>
            <select
              name="interest_level"
              value={formData.interest_level}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-charcoal-deep border border-charcoal-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-mint/50 focus:border-mint transition-colors"
            >
              <option value="">Select interest level</option>
              <option value="Just exploring">Just exploring</option>
              <option value="Moderately interested">Moderately interested</option>
              <option value="Very interested">Very interested</option>
              <option value="Ready to discuss terms">Ready to discuss terms</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Expected Funding Timeline
            </label>
            <select
              name="funding_timeline"
              value={formData.funding_timeline}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-charcoal-deep border border-charcoal-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-mint/50 focus:border-mint transition-colors"
            >
              <option value="">Select timeline</option>
              <option value="Immediate (1-3 months)">Immediate (1-3 months)</option>
              <option value="Near-term (3-6 months)">Near-term (3-6 months)</option>
              <option value="Mid-term (6-12 months)">Mid-term (6-12 months)</option>
              <option value="Long-term (12+ months)">Long-term (12+ months)</option>
              <option value="Flexible">Flexible</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Areas of Interest
            </label>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                'AI & Machine Learning',
                'Algorithmic Trading',
                'DeFi & Blockchain',
                'Risk Management',
                'Quantitative Finance',
                'RegTech & Compliance',
                'Market Infrastructure',
                'ESG & Sustainable Finance',
              ].map((area) => (
                <label key={area} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.areas_of_interest.includes(area)}
                    onChange={() => handleCheckboxGroupChange(area)}
                    className="w-4 h-4 bg-charcoal-deep border border-charcoal-border rounded text-mint focus:ring-2 focus:ring-mint/50"
                  />
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                    {area}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              How did you hear about ReFi Trading?
            </label>
            <select
              name="how_heard"
              value={formData.how_heard}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-charcoal-deep border border-charcoal-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-mint/50 focus:border-mint transition-colors"
            >
              <option value="">Select source</option>
              <option value="Referral">Referral</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Twitter/X">Twitter/X</option>
              <option value="Conference/Event">Conference/Event</option>
              <option value="News Article">News Article</option>
              <option value="Search Engine">Search Engine</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Additional Notes or Questions
            </label>
            <textarea
              name="additional_notes"
              value={formData.additional_notes}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 bg-charcoal-deep border border-charcoal-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-mint/50 focus:border-mint transition-colors resize-none"
              placeholder="Please share any specific questions or areas you'd like to discuss..."
            />
          </div>

          <div className="border-t border-charcoal-border pt-6 space-y-4">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name="accredited_investor"
                checked={formData.accredited_investor}
                onChange={handleInputChange}
                required
                className="w-5 h-5 bg-charcoal-deep border border-charcoal-border rounded text-mint focus:ring-2 focus:ring-mint/50 mt-0.5 flex-shrink-0"
              />
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                <span className="text-red-400">*</span> I confirm that I am an accredited investor as defined by applicable securities regulations
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name="consent_data_processing"
                checked={formData.consent_data_processing}
                onChange={handleInputChange}
                required
                className="w-5 h-5 bg-charcoal-deep border border-charcoal-border rounded text-mint focus:ring-2 focus:ring-mint/50 mt-0.5 flex-shrink-0"
              />
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                <span className="text-red-400">*</span> I consent to ReFi Trading Inc storing and processing my information as described in the notice above
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name="consent_communications"
                checked={formData.consent_communications}
                onChange={handleInputChange}
                className="w-5 h-5 bg-charcoal-deep border border-charcoal-border rounded text-mint focus:ring-2 focus:ring-mint/50 mt-0.5 flex-shrink-0"
              />
              <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                I would like to receive updates about ReFi Trading via email
              </span>
            </label>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-3 border border-charcoal-border rounded-lg text-gray-300 hover:text-white hover:border-gray-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-mint text-charcoal-deep rounded-lg font-semibold hover:bg-mint/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-charcoal-deep/30 border-t-charcoal-deep rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <FileCheck className="w-4 h-4" />
                  Submit Form
                </>
              )}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default InvestorFormPage;
