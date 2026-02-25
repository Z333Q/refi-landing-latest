import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-charcoal-deep text-white">
      <Helmet>
        <title>Terms of Service | ReFi.Trading</title>
        <meta name="description" content="ReFi.Trading terms of service. Review the terms and conditions governing the use of our platform and services." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://refi.trading/legal/terms" />
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-gray-400 mb-8">Last Updated: February 25, 2026</p>

          <div className="space-y-8 text-gray-300 leading-relaxed">
            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">Agreement to Terms</h2>
              <p>
                By accessing or using ReFi.Trading's website, services, or platform (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Services.
              </p>
            </section>

            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">Nature of Services</h2>
              <p className="mb-4">
                ReFi.Trading Inc. provides software for trade execution automation. We do not:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Act as a financial advisor, investment advisor, broker-dealer, or portfolio manager</li>
                <li>Provide investment advice, recommendations, or discretionary management</li>
                <li>Hold, custody, or have access to user assets</li>
                <li>Execute trades on behalf of users without explicit user-defined rules and parameters</li>
              </ul>
              <p className="mt-4">
                Users define all trading rules, parameters, risk limits, and strategies. Users retain full responsibility for all trading decisions. Assets remain at the user's broker, and orders execute in the user's brokerage account.
              </p>
            </section>

            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">No Financial Advice</h2>
              <p className="mb-4">
                All content provided through the Services is for informational and educational purposes only. Nothing on our website or platform constitutes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Financial, investment, tax, or legal advice</li>
                <li>A recommendation or solicitation to buy, sell, or hold any security or financial instrument</li>
                <li>A guarantee of future performance or results</li>
              </ul>
              <p className="mt-4">
                You should consult with qualified professionals before making any financial decisions.
              </p>
            </section>

            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">Risk Disclosure</h2>
              <p className="mb-4">
                Trading and investing involve substantial risk of loss. By using our Services, you acknowledge and accept that:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Past performance is not indicative of future results</li>
                <li>Automated trading systems can malfunction or produce unexpected results</li>
                <li>You may lose some or all of your invested capital</li>
                <li>Market conditions can change rapidly and unpredictably</li>
                <li>You are solely responsible for evaluating the risks and merits of any trading strategy</li>
              </ul>
            </section>

            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">User Responsibilities</h2>
              <p className="mb-4">As a user of our Services, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Use the Services only for lawful purposes</li>
                <li>Not attempt to circumvent security measures or access unauthorized areas</li>
                <li>Not use the Services in any way that could harm, disable, or impair our systems</li>
                <li>Monitor your automated trading strategies and adjust as necessary</li>
              </ul>
            </section>

            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">Intellectual Property</h2>
              <p>
                All content, features, and functionality of the Services, including but not limited to text, graphics, logos, software, and algorithms, are owned by ReFi.Trading Inc. or its licensors and are protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of our Services without our express written permission.
              </p>
            </section>

            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">Service Availability</h2>
              <p className="mb-4">
                We strive to provide reliable and uninterrupted access to our Services. However, we do not guarantee:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Continuous, uninterrupted, or error-free operation</li>
                <li>That defects will be corrected</li>
                <li>That our Services are free from viruses or other harmful components</li>
                <li>The accuracy, completeness, or timeliness of any information</li>
              </ul>
              <p className="mt-4">
                We reserve the right to modify, suspend, or discontinue any part of the Services at any time without notice.
              </p>
            </section>

            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">Limitation of Liability</h2>
              <p className="mb-4">
                To the maximum extent permitted by law, ReFi.Trading Inc. and its officers, directors, employees, and agents shall not be liable for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Any indirect, incidental, special, consequential, or punitive damages</li>
                <li>Loss of profits, revenue, data, or use</li>
                <li>Trading losses or investment losses</li>
                <li>Interruption of business</li>
                <li>Any damages arising from your use of or inability to use the Services</li>
              </ul>
              <p className="mt-4">
                Use of ReFi.Trading is entirely at your own risk. All liability is limited to the maximum extent permitted by applicable law.
              </p>
            </section>

            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless ReFi.Trading Inc. and its affiliates from any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys' fees) arising from your use of the Services, violation of these Terms, or infringement of any rights of another party.
              </p>
            </section>

            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Services</h2>
              <p>
                Our Services may integrate with third-party platforms, brokers, and services. We are not responsible for the availability, accuracy, or content of third-party services. Your use of third-party services is governed by their respective terms and conditions.
              </p>
            </section>

            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">Compliance with Laws</h2>
              <p>
                You are responsible for complying with all applicable laws and regulations, including securities laws, tax laws, and regulations governing automated trading in your jurisdiction. It is your responsibility to determine whether you are legally permitted to use our Services.
              </p>
            </section>

            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">Termination</h2>
              <p>
                We reserve the right to suspend or terminate your access to the Services at any time, with or without cause, and with or without notice. Upon termination, your right to use the Services will immediately cease.
              </p>
            </section>

            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">Dispute Resolution</h2>
              <p className="mb-4">
                Any disputes arising from these Terms or your use of the Services shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association, except where prohibited by law.
              </p>
              <p>
                You waive any right to participate in a class action lawsuit or class-wide arbitration.
              </p>
            </section>

            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which ReFi.Trading Inc. is incorporated, without regard to conflict of law principles.
              </p>
            </section>

            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. Material changes will be effective upon posting to our website. Your continued use of the Services after changes are posted constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">Severability</h2>
              <p>
                If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
              </p>
            </section>

            <section className="bg-charcoal-light rounded-lg p-8 border border-charcoal-border">
              <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have any questions about these Terms of Service, please contact us:
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

export default TermsOfServicePage;
