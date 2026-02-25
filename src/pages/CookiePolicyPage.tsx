import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const CookiePolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-charcoal-deep text-white">
      <Helmet>
        <title>Cookie Policy | ReFi.Trading</title>
        <meta name="description" content="ReFi.Trading cookie policy. Learn about how we use cookies and similar tracking technologies in accordance with GDPR and CCPA." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://refi.trading/legal/cookies" />
      </Helmet>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-mint hover:text-mint/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-gray-400 mb-8">Last Updated: February 25, 2026</p>

          <div className="space-y-8 text-gray-300 leading-relaxed">
            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">What Are Cookies?</h2>
              <p>
                Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They help websites remember your preferences, improve functionality, and provide analytics about how visitors interact with the site.
              </p>
            </section>

            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">How We Use Cookies</h2>
              <p className="mb-4">
                ReFi.Trading uses cookies and similar tracking technologies in accordance with the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA). We use cookies to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Analyze website traffic and understand how visitors use our site</li>
                <li>Improve user experience and website functionality</li>
                <li>Remember your preferences and settings</li>
                <li>Provide personalized content</li>
                <li>Monitor and analyze the performance of our services</li>
              </ul>
            </section>

            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">Types of Cookies We Use</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Essential Cookies</h3>
                  <p>
                    These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website. The website cannot function properly without these cookies.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Analytics Cookies</h3>
                  <p className="mb-2">
                    We use analytics cookies to understand how visitors interact with our website. These cookies help us improve our site by collecting and reporting information anonymously.
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li><strong>Google Analytics:</strong> Tracks page views, session duration, and user behavior</li>
                    <li><strong>Performance metrics:</strong> Monitors load times and technical performance</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Functionality Cookies</h3>
                  <p>
                    These cookies enable the website to remember choices you make (such as language preferences) and provide enhanced, personalized features.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Marketing Cookies</h3>
                  <p>
                    We may use marketing cookies to track visitors across websites and deliver relevant advertisements. These cookies are used with your consent.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Cookies</h2>
              <p className="mb-4">
                We may use third-party services that set cookies on your device. These include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Google Analytics:</strong> Used for website analytics and performance monitoring</li>
                <li><strong>Content Delivery Networks (CDN):</strong> Used to deliver images and static content efficiently</li>
              </ul>
              <p className="mt-4">
                These third-party services have their own privacy policies and cookie policies. We recommend reviewing their policies to understand how they use cookies.
              </p>
            </section>

            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">No Personally Identifiable Information</h2>
              <p>
                The cookies we use do not store personally identifiable information such as your name, email address, or payment information. Analytics cookies collect aggregated, anonymous data about website usage patterns.
              </p>
            </section>

            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">Managing Cookie Preferences</h2>
              <p className="mb-4">
                You have the right to control and manage cookies. You can:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Browser Settings:</strong> Configure your browser to block or delete cookies</li>
                <li><strong>Cookie Banner:</strong> Use our cookie consent banner to manage preferences</li>
                <li><strong>Opt-Out Tools:</strong> Use opt-out tools provided by third-party services</li>
              </ul>

              <div className="mt-6 bg-charcoal-deep rounded-lg p-6 border border-charcoal-border">
                <h4 className="font-semibold text-white mb-3">How to Manage Cookies in Different Browsers:</h4>
                <ul className="space-y-2">
                  <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                  <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
                  <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                  <li><strong>Edge:</strong> Settings → Cookies and site permissions → Manage and delete cookies</li>
                </ul>
              </div>

              <p className="mt-4 text-yellow-400">
                <strong>Note:</strong> Blocking or deleting cookies may affect the functionality of our website and your user experience.
              </p>
            </section>

            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">Google Analytics Opt-Out</h2>
              <p className="mb-4">
                If you wish to opt out of Google Analytics tracking, you can:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Install the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-mint hover:underline">Google Analytics Opt-out Browser Add-on</a></li>
                <li>Configure your browser to block third-party cookies</li>
                <li>Use privacy-focused browser extensions</li>
              </ul>
            </section>

            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">Consent and Continued Use</h2>
              <p>
                By continuing to use our website, you consent to our use of cookies as described in this Cookie Policy. If you do not agree to our use of cookies, you should discontinue use of the website or adjust your browser settings to block cookies.
              </p>
            </section>

            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time to reflect changes in our practices or applicable laws. We will post any changes on this page with an updated "Last Updated" date.
              </p>
            </section>

            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">More Information</h2>
              <p className="mb-4">
                For more information about how we handle your personal data, please review our <Link to="/legal/privacy" className="text-mint hover:underline">Privacy Policy</Link>.
              </p>
              <p>
                If you have questions about our use of cookies, please contact us at <a href="mailto:hello@refi.trading" className="text-mint hover:underline">hello@refi.trading</a>.
              </p>
            </section>

            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
              <div className="bg-charcoal-deep rounded-lg p-6 border border-charcoal-border">
                <p className="mb-2"><strong>ReFi.Trading Inc.</strong></p>
                <p className="mb-2">Email: <a href="mailto:hello@refi.trading" className="text-mint hover:underline">hello@refi.trading</a></p>
                <p>Website: <a href="https://refi.trading" className="text-mint hover:underline">refi.trading</a></p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyPage;
