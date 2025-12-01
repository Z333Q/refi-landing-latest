import React from 'react';
import { motion } from 'framer-motion';

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-24 px-6 bg-charcoal">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-display font-bold text-white text-center mb-16">Pricing Paths</h2>

        <div className="grid lg:grid-cols-3 gap-8">

            <motion.div
                whileHover={{ y: -5 }}
                className="bg-charcoal-light p-8 rounded-lg border border-gray-700"
            >
                <h3 className="text-lg font-bold text-white mb-2">Paper Trading</h3>
                <div className="text-3xl font-bold text-white mb-4">Free <span className="text-sm font-normal text-gray-500">/ alpha</span></div>
                <p className="text-gray-300 text-sm mb-8 min-h-[40px]">Run full logic engine. Inspect all proofs.</p>
                <a
                    href="https://forms.gle/rr74yAhAM2MiGTVi9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 border border-gray-700 rounded text-white hover:bg-charcoal transition-colors font-medium text-sm block text-center"
                >
                    Start Paper Trading
                </a>
            </motion.div>

            <motion.div
                whileHover={{ y: -5 }}
                className="bg-charcoal-light p-8 rounded-lg border border-mint shadow-[0_0_20px_rgba(12,212,160,0.05)] relative"
            >
                <div className="absolute top-0 left-0 right-0 h-1 bg-mint rounded-t-lg" />
                <h3 className="text-lg font-bold text-white mb-2">Limited Exposure</h3>
                <div className="text-3xl font-bold text-white mb-4">$150 - $995 <span className="text-sm font-normal text-gray-500">/ mo</span></div>
                <p className="text-gray-300 text-sm mb-8 min-h-[40px]">For prosumers. Strict caps. Human review.</p>
                <a
                    href="https://forms.gle/rr74yAhAM2MiGTVi9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-mint text-charcoal rounded font-bold hover:bg-mint-light transition-colors block text-center"
                >
                    Apply for Waitlist
                </a>
            </motion.div>

            <motion.div
                whileHover={{ y: -5 }}
                className="bg-charcoal-light p-8 rounded-lg border border-gray-700"
            >
                <h3 className="text-lg font-bold text-white mb-2">Institutional License</h3>
                <div className="text-3xl font-bold text-white mb-4">Custom <span className="text-sm font-normal text-gray-500">/ year</span></div>
                <p className="text-gray-300 text-sm mb-8 min-h-[40px]">Complete setup. Audit support.</p>
                <a
                    href="https://forms.gle/rr74yAhAM2MiGTVi9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 border border-gray-700 rounded text-white hover:bg-charcoal transition-colors font-medium text-sm block text-center"
                >
                    Contact Sales
                </a>
            </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Pricing;
