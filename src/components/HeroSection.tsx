import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Link, Globe, Brain, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const HeroSection: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>ReFi.Trading | AI Execution Automation Platform</title>
        <meta name="description" content="Non-custodial execution automation with broker connectivity, cryptographic risk proofs, and reinforcement-learning automation. Execute user-defined trading rules through an existing broker account. Assets remain in user custody." />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "ReFi.Trading - AI Execution Automation Platform",
            "description": "Non-custodial execution automation with broker connectivity, cryptographic risk proofs, and reinforcement-learning automation.",
            "url": "https://refi.trading",
            "mainEntity": {
              "@type": "SoftwareApplication",
              "name": "ReFi.Trading Platform",
              "applicationCategory": "FinanceApplication",
              "description": "Non-custodial execution automation with zero-knowledge risk enforcement",
              "featureList": [
                "Reinforcement Learning Automation",
                "Zero-Knowledge Risk Proofs",
                "Non-Custodial Broker Execution",
                "Portfolio Analysis Tools",
                "Real-time Risk Verification"
              ]
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://refi.trading"
                }
              ]
            }
          })}
        </script>
      </Helmet>

      <section
        id="hero"
        className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden"
        itemScope
        itemType="https://schema.org/WebPageElement"
      >
        <meta itemProp="name" content="Hero Section" />
        <meta itemProp="description" content="Introduction to ReFi.Trading AI trading platform" />

        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/Slide8.png)' }}
          role="img"
          aria-label="ReFi.Trading platform background"
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/60 to-charcoal/80"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-mint text-sm font-semibold tracking-[0.25em] uppercase mb-4"
            >
              Non-Custodial AI Trading
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-7xl font-bold leading-tight mb-6"
              itemProp="headline"
            >
              <span className="text-mint">Wall Street AI</span>
              <br />
              Radically Accessible
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-300 max-w-xl leading-relaxed mb-10"
              itemProp="description"
            >
              Institutional-grade algorithmic strategies with self-custodied execution and Reinforcement Learning Agents.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              <FeaturePill icon={<Shield size={16} />} text="Self-Custodial" />
              <FeaturePill icon={<Brain size={16} />} text="Reinforcement Learning Agent" />
              <FeaturePill icon={<Globe size={16} />} text="Global Access" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4 text-sm text-gray-400 bg-charcoal-deep/50 px-8 py-4 rounded-2xl border border-charcoal-border backdrop-blur-sm"
            >
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <ProcessStep icon={<Shield size={14} />} text="Set risk limits" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, type: 'spring' }}
              >
                <ChevronRight size={14} className="text-gray-600" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                <ProcessStep icon={<Link size={14} />} text="Connect broker" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.9, type: 'spring' }}
              >
                <ChevronRight size={14} className="text-gray-600" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.3, duration: 0.5 }}
              >
                <ProcessStep icon={<Zap size={14} />} text="Deploy agent" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

const FeaturePill: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-2 bg-charcoal-lighter border border-charcoal-border px-5 py-2.5 rounded-full text-gray-200 shadow-sm hover:border-mint/30 transition-colors">
    <span className="text-mint">{icon}</span>
    <span className="text-sm font-medium">{text}</span>
  </div>
);

const ProcessStep: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-2">
    <span className="text-mint">{icon}</span>
    <span className="font-mono tracking-tight uppercase text-xs font-bold">{text}</span>
  </div>
);

export default HeroSection;