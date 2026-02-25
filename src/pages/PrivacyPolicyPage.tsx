import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-charcoal-deep text-white">
      <Helmet>
        <title>Privacy Policy | ReFi.Trading</title>
        <meta name="description" content="ReFi.Trading privacy policy. Learn how we collect, use, and protect your personal information in compliance with GDPR and CCPA." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://refi.trading/legal/privacy" />
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-400 mb-8">Last Updated: February 25, 2026</p>

          <div className="space-y-8 text-gray-300 leading-relaxed">
            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">Introduction</h2>
              <p className="mb-4">
                ReFi.Trading Inc. ("ReFi.Trading," "we," "our," or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or interact with us.
              </p>
              <p>
                We comply with the General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), and other applicable data protection laws.
              </p>
            </section>

            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
              <p className="mb-4">We collect only the information necessary to provide our services and communicate with you:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Personal Information:</strong> Name, email address, phone number, company name, and other contact details you provide when filling out forms or contacting us.</li>
                <li><strong>Investment Information:</strong> Information about your investor type, investment range, areas of interest, and accredited investor status when you submit an investor form.</li>
                <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent, and referring websites.</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information, and cookies.</li>
              </ul>
            </section>

            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
              <p className="mb-4">We use the collected information for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>To communicate with you about our services, updates, and opportunities</li>
                <li>To respond to your inquiries and provide customer support</li>
                <li>To evaluate investor interest and eligibility</li>
                <li>To improve our website and services</li>
                <li>To analyze usage patterns and optimize user experience</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">Data Sharing and Disclosure</h2>
              <p className="mb-4">
                <strong>We never sell your personal data.</strong> We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Service Providers:</strong> We may share data with trusted third-party service providers who assist us in operating our website and services (e.g., email providers, analytics services).</li>
                <li><strong>Legal Requirements:</strong> We may disclose information when required by law, regulation, or legal process.</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.</li>
              </ul>
            </section>

            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">Your Rights</h2>
              <p className="mb-4">Under GDPR and CCPA, you have the following rights:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Right to Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your personal information</li>
                <li><strong>Right to Restrict Processing:</strong> Request limitation on how we use your data</li>
                <li><strong>Right to Data Portability:</strong> Request transfer of your data to another service</li>
                <li><strong>Right to Object:</strong> Object to our processing of your personal information</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time where processing is based on consent</li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, please contact us at <a href="mailto:hello@refi.trading" className="text-mint hover:underline">hello@refi.trading</a>.
              </p>
            </section>

            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">Cookies and Tracking Technologies</h2>
              <p className="mb-4">
                We use cookies and similar tracking technologies to enhance your experience on our website. This includes analytics cookies from Google Analytics to understand how visitors interact with our site.
              </p>
              <p className="mb-4">
                You can control cookies through your browser settings. Note that disabling cookies may affect the functionality of our website.
              </p>
              <p>
                For more information, see our <Link to="/legal/cookies" className="text-mint hover:underline">Cookie Policy</Link>.
              </p>
            </section>

            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">Data Retention</h2>
              <p>
                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
              </p>
            </section>

            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Services</h2>
              <p className="mb-4">
                Our website may use third-party services and integrations, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Google Analytics for website analytics</li>
                <li>Supabase for data storage and processing</li>
                <li>Email service providers for communications</li>
              </ul>
              <p className="mt-4">
                These third-party services have their own privacy policies and may collect information independently. We recommend reviewing their privacy policies.
              </p>
            </section>

            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">Children's Privacy</h2>
              <p>
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </section>

            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically.
              </p>
            </section>

            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
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

export default PrivacyPolicyPage;
