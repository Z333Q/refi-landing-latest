import React from 'react';
import { Twitter as TwitterIcon, Github as GithubIcon, Linkedin as LinkedinIcon, Mail as MailIcon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../lib/l10n';
import { imageUrls } from '../lib/imageUrls';

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const l10n = useLocalization(i18n.language);
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Platform',
      links: [
        { label: 'Innovations', href: '#innovations' },
        { label: 'Architecture', href: '#architecture' },
        { label: 'Roadmap', href: '#roadmap' },
        { label: 'Portfolio Analyzer', href: '/analyzer/index.html', external: true },
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Blog', href: '/blog', route: true },
        { label: 'Documentation', href: '#', disabled: true },
        { label: 'API Reference', href: '#', disabled: true },
        { label: 'Whitepaper', href: '#', disabled: true },
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Team', href: '#team' },
        { label: 'Careers', href: '/careers', route: true },
        { label: 'Partners', href: '/partners', route: true },
        { label: 'Contact', href: '#contact' },
      ]
    },
    {
      title: 'Get Started',
      links: [
        { label: 'Join Waitlist', href: '/waitlist', route: true, highlight: true },
        { label: 'Book Demo', href: '/demo', route: true },
        { label: 'Investor Form', href: '/investor-form', route: true },
        { label: 'Request Access', href: '#contact' },
      ]
    }
  ];
  return (
    <footer 
      className="bg-charcoal-light border-t border-gray-800 relative overflow-hidden"
      role="contentinfo"
      itemScope 
      itemType="https://schema.org/WPFooter"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-lighter via-charcoal to-charcoal opacity-30"></div>
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-mint/5 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-mint/5 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2" itemScope itemType="https://schema.org/Organization">
            <div className="font-display text-2xl font-bold tracking-tight text-white flex items-center gap-2 mb-4">
              <img
                src={imageUrls.logo}
                alt="ReFi Logo"
                className="w-8 h-8"
                itemProp="logo"
              />
              <span itemProp="name">
                <span className="text-gradient">ReFi</span>.Trading
              </span>
            </div>
            <p className="text-gray-400 max-w-md mb-6" itemProp="description">
              OpenFi for Trading Agents. Pre-proved orders. Enforced limits
            </p>
            
            {/* Newsletter Signup */}
            <div className="mb-6" role="form" aria-label="Newsletter signup">
              <h3 className="text-white font-semibold mb-3">Stay Updated</h3>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  aria-label="Email address for newsletter subscription"
                  className="flex-1 px-3 py-2 bg-charcoal border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:ring-mint focus:border-mint"
                  required
                />
                <button 
                  className="bg-mint hover:bg-mint-dark text-charcoal px-4 py-2 rounded-md transition-colors duration-200 flex items-center gap-1 text-sm font-medium"
                  aria-label="Subscribe to newsletter"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a 
                href="https://x.com/refitrading" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-mint transition-all duration-300 transform hover:scale-110" 
                aria-label="Twitter/X"
                itemProp="sameAs"
              >
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a 
                href="https://bsky.app/profile/refi.trading" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-mint transition-all duration-300 transform hover:scale-110" 
                aria-label="Bluesky"
                itemProp="sameAs"
              >
                <GithubIcon className="h-5 w-5" />
              </a>
              <a 
                href="https://www.linkedin.com/company/refi-trading/?viewAsMember=true" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-mint transition-all duration-300 transform hover:scale-110" 
                aria-label="LinkedIn"
                itemProp="sameAs"
              >
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a 
                href="mailto:hello@refi.trading" 
                className="text-gray-400 hover:text-mint transition-all duration-300 transform hover:scale-110" 
                aria-label="Email"
                itemProp="email"
              >
                <MailIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Navigation Sections */}
          {footerSections.map((section) => (
            <nav key={section.title} className="lg:col-span-1" role="navigation" aria-label={section.title}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3" role="list">
                {section.links.map((link) => (
                  <li key={link.label} role="listitem">
                    {link.disabled ? (
                      <span className="text-gray-600 text-sm cursor-not-allowed">
                        {link.label}
                        <span className="ml-2 text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">Soon</span>
                      </span>
                    ) : link.route ? (
                      <Link
                        to={link.href}
                        className={`text-sm transition-colors duration-200 ${
                          link.highlight 
                            ? 'text-mint hover:text-mint-light font-medium' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ) : link.external ? (
                      <a
                        href={link.href}
                        target="_self"
                        className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Compliance Disclaimer */}
        <div className="mt-12 mb-8 p-6 bg-charcoal-lighter/50 border border-gray-700 rounded-lg">
          <p className="text-xs text-gray-400 leading-relaxed text-center max-w-5xl mx-auto">
            ReFi.Trading Inc. provides software for trade execution automation. ReFi.Trading Inc. does not act as a financial advisor, investment advisor, broker-dealer, or portfolio manager. ReFi.Trading Inc. does not provide investment advice, recommendations, or discretionary management. Users define all rules, parameters, and risk limits, and retain full responsibility for trading decisions. Assets remain at the user's broker. Orders execute in the user's brokerage account.
          </p>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8" role="contentinfo">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-gray-500 text-sm" itemProp="copyrightNotice">
                &copy; {currentYear} ReFi.Trading. All rights reserved.
              </p>
              
              <div className="flex items-center space-x-1 text-xs text-gray-600">
                <span>Built with</span>
                <span className="text-mint">♥</span>
                <span>for traders worldwide</span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                to="/legal/privacy"
                className="text-gray-500 hover:text-mint text-sm transition-all duration-300"
                aria-label="View privacy policy"
              >
                Privacy Policy
              </Link>
              <Link
                to="/legal/terms"
                className="text-gray-500 hover:text-mint text-sm transition-all duration-300"
                aria-label="View terms of service"
              >
                Terms of Service
              </Link>
              <Link
                to="/legal/cookies"
                className="text-gray-500 hover:text-mint text-sm transition-all duration-300"
                aria-label="View cookie policy"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;