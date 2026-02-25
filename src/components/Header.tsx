import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { imageUrls } from '../lib/imageUrls';
import { handleNavigation, observeSections } from '../lib/navigation';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      const sectionIds = ['how-it-works', 'technology', 'pricing', 'roadmap', 'team', 'faq'];
      return observeSections(sectionIds, setActiveSection);
    }
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { title: t('nav.howItWorks'), href: '#how-it-works', sectionId: 'how-it-works' },
    { title: t('nav.technology'), href: '#technology', sectionId: 'technology' },
    { title: t('nav.pricing'), href: '#pricing', sectionId: 'pricing' },
    { title: t('nav.roadmap'), href: '#roadmap', sectionId: 'roadmap' },
    { title: t('nav.team'), href: '#team', sectionId: 'team' },
    { title: t('nav.faq'), href: '#faq', sectionId: 'faq' },
    { title: t('nav.blog'), href: '/blog', isRoute: true },
    { title: t('nav.analyzer'), href: '/analyzer/index.html', isExternal: true }
  ];

  const isActiveLink = (link: typeof navLinks[0]) => {
    if (link.isRoute) {
      return location.pathname === link.href;
    }
    if (link.sectionId && location.pathname === '/') {
      return activeSection === link.sectionId;
    }
    return false;
  };

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    if (link.isRoute || link.isExternal) return;

    e.preventDefault();
    handleNavigation(link.href, location.pathname, navigate, () => setIsMenuOpen(false));
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-charcoal shadow-lg py-2' : 'bg-transparent py-4'}`}
      role="banner"
      itemScope 
      itemType="https://schema.org/WPHeader"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex-shrink-0 z-50 flex items-center gap-2"
            aria-label="ReFi.Trading homepage"
            itemProp="url"
          >
            <img
              src={imageUrls.logo}
              alt="ReFi Logo"
              className="w-8 h-8"
              itemProp="logo"
            />
            <span 
              className="font-display text-2xl font-bold tracking-tight text-white"
              itemProp="name"
            >
              <span className="text-mint">ReFi</span>.Trading
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-8"
            role="navigation"
            aria-label="Main navigation"
            itemScope
            itemType="https://schema.org/SiteNavigationElement"
          >
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.title}
                  to={link.href}
                  className={`transition-colors duration-200 font-medium whitespace-nowrap ${
                    isActiveLink(link)
                      ? 'text-mint'
                      : 'text-gray-300 hover:text-mint'
                  }`}
                  itemProp="url"
                >
                  {link.title}
                </Link>
              ) : link.isExternal ? (
                <a
                  key={link.title}
                  href={link.href}
                  className="text-gray-300 hover:text-mint transition-colors duration-200 font-medium whitespace-nowrap"
                  target="_self"
                  itemProp="url"
                >
                  {link.title}
                </a>
              ) : (
                <a
                  key={link.title}
                  href={link.href}
                  onClick={(e) => onNavClick(e, link)}
                  className={`transition-colors duration-200 font-medium whitespace-nowrap cursor-pointer ${
                    isActiveLink(link)
                      ? 'text-mint'
                      : 'text-gray-300 hover:text-mint'
                  }`}
                  itemProp="url"
                >
                  {link.title}
                </a>
              )
            ))}
            
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {/* CTA Dropdown */}
            <div className="relative group">
              <button className="bg-mint hover:bg-mint-dark text-charcoal font-semibold px-5 py-2 rounded-md transition-colors duration-200 whitespace-nowrap flex items-center gap-1">
                {t('nav.getStarted')}
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div
                className="absolute right-0 mt-2 w-56 bg-charcoal-light border border-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                role="menu"
                aria-label="Get started options"
              >
                <div className="py-2">
                  <a
                    href="https://forms.gle/rr74yAhAM2MiGTVi9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-3 text-white hover:bg-mint/10 hover:text-mint transition-colors border-b border-gray-700"
                    role="menuitem"
                  >
                    <div className="font-medium">{t('nav.joinWaitlist')}</div>
                    <div className="text-sm text-gray-400">Get early access to AI trading</div>
                  </a>

                  <a
                    href="/demo"
                    className="block px-4 py-3 text-white hover:bg-mint/10 hover:text-mint transition-colors border-b border-gray-700"
                    role="menuitem"
                  >
                    <div className="font-medium">{t('nav.bookDemo')}</div>
                    <div className="text-sm text-gray-400">15-min personalized demo</div>
                  </a>

                  <a
                    href="/investor-form"
                    className="block px-4 py-3 text-white hover:bg-mint/10 hover:text-mint transition-colors border-b border-gray-700"
                    role="menuitem"
                  >
                    <div className="font-medium">Investor Form</div>
                    <div className="text-sm text-gray-400">Investment opportunities</div>
                  </a>

                  <a
                    href="/partners"
                    className="block px-4 py-3 text-white hover:bg-mint/10 hover:text-mint transition-colors border-b border-gray-700"
                    role="menuitem"
                  >
                    <div className="font-medium">{t('nav.partners')}</div>
                    <div className="text-sm text-gray-400">Strategic partnerships</div>
                  </a>

                  <a
                    href="/careers"
                    className="block px-4 py-3 text-white hover:bg-mint/10 hover:text-mint transition-colors"
                    role="menuitem"
                  >
                    <div className="font-medium">{t('nav.careers')}</div>
                    <div className="text-sm text-gray-400">Open engineering roles</div>
                  </a>
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile Navigation Toggle */}
          <button 
            className="md:hidden z-50 text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Navigation Menu */}
          <div 
            className={`fixed inset-0 bg-charcoal-light md:hidden flex flex-col justify-center items-center transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <nav
              className="flex flex-col items-center space-y-6 max-h-screen overflow-y-auto py-8"
              role="navigation"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link) => (
                link.isRoute ? (
                  <Link
                    key={link.title}
                    to={link.href}
                    className={`text-xl transition-colors duration-200 font-medium ${
                      isActiveLink(link)
                        ? 'text-mint'
                        : 'text-gray-300 hover:text-mint'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.title}
                  </Link>
                ) : link.isExternal ? (
                  <a
                    key={link.title}
                    href={link.href}
                    className="text-xl text-gray-300 hover:text-mint transition-colors duration-200 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                    target="_self"
                  >
                    {link.title}
                  </a>
                ) : (
                  <a
                    key={link.title}
                    href={link.href}
                    onClick={(e) => onNavClick(e, link)}
                    className={`text-xl transition-colors duration-200 font-medium cursor-pointer ${
                      isActiveLink(link)
                        ? 'text-mint'
                        : 'text-gray-300 hover:text-mint'
                    }`}
                  >
                    {link.title}
                  </a>
                )
              ))}
              
              {/* Mobile CTA Links */}
              <div className="border-t border-gray-700 pt-6 mt-6 w-full max-w-xs">
                <div className="text-center text-gray-400 text-sm mb-4">{t('nav.getStarted')}</div>
                <div className="space-y-3">
                  <a
                    href="https://forms.gle/rr74yAhAM2MiGTVi9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-mint hover:bg-mint-dark text-charcoal font-semibold px-6 py-3 rounded-md transition-colors duration-200 text-center"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Join waitlist for early access"
                  >
                    {t('nav.joinWaitlist')}
                  </a>
                  <a
                    href="/demo"
                    className="block bg-transparent border-2 border-mint text-mint hover:bg-mint hover:text-charcoal font-semibold px-6 py-3 rounded-md transition-colors duration-200 text-center"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Book a demo"
                  >
                    {t('nav.bookDemo')}
                  </a>
                  <a
                    href="/investor-form"
                    className="block text-gray-300 hover:text-mint transition-colors duration-200 text-center py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Investor Form
                  </a>
                  <a
                    href="/partners"
                    className="block text-gray-300 hover:text-mint transition-colors duration-200 text-center py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.partners')}
                  </a>
                  <a
                    href="/careers"
                    className="block text-gray-300 hover:text-mint transition-colors duration-200 text-center py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.careers')}
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;