import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const segments = {
  POWER_TRADERS: {
    label: "Power Traders",
    headline: "Verified execution.",
    copy: "Automate execution 24/7 without waking up for markets. Keep full control of your strategy.",
    widget: "Line chart drawing",
    tag: "Live strategy with verified limits"
  },
  LEAN_FUNDS: {
    label: "Lean Funds",
    headline: "Institutional strategies.",
    copy: "Scale beyond spreadsheet limitations. Show investors cryptographic proof of risk compliance.",
    widget: "Allocation blocks rising",
    tag: "Risk within limits"
  },
  FAMILY_OFFICES: {
    label: "Family Offices",
    headline: "Transparent optimization.",
    copy: "Stop overpaying for opaque black boxes. Get clear, provable portfolio optimization.",
    widget: "Risk bar tightening",
    tag: "Within set risk level"
  }
};

const UserSegments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'POWER_TRADERS' | 'LEAN_FUNDS' | 'FAMILY_OFFICES'>('POWER_TRADERS');

  return (
    <section id="technology" className="py-24 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-display font-bold text-white mb-12">User Segments</h2>

      <div className="flex flex-col md:flex-row gap-2 mb-12 p-1 bg-charcoal-light rounded-lg border border-gray-700 inline-flex">
        {(Object.keys(segments) as Array<keyof typeof segments>).map((key) => {
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-6 py-3 rounded text-sm font-medium transition-all ${
                isActive
                  ? 'bg-charcoal text-white border border-gray-700 shadow-sm'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {segments[key].label}
            </button>
          );
        })}
      </div>

      <div className="bg-charcoal-light border border-gray-700 rounded-lg p-8 md:p-12 min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">
                {segments[activeTab].headline}
              </h3>
              <p className="text-gray-300 text-lg mb-6">
                {segments[activeTab].copy}
              </p>
              <div className="inline-block px-3 py-1 rounded bg-mint/10 border border-mint/20 text-mint text-xs font-medium">
                {segments[activeTab].tag}
              </div>
            </div>

            <div className="bg-charcoal border border-gray-700 rounded p-6 h-48 flex items-center justify-center relative overflow-hidden">

               {activeTab === 'LEAN_FUNDS' && (
                 <div className="flex items-end gap-2 h-24">
                   <motion.div initial={{ height: 0 }} animate={{ height: 60 }} className="w-8 bg-gray-600 rounded-t" />
                   <motion.div initial={{ height: 0 }} animate={{ height: 90 }} transition={{ delay: 0.1 }} className="w-8 bg-mint rounded-t" />
                   <motion.div initial={{ height: 0 }} animate={{ height: 40 }} transition={{ delay: 0.2 }} className="w-8 bg-gray-600 rounded-t" />
                 </div>
               )}

               {activeTab === 'POWER_TRADERS' && (
                 <svg className="w-full h-full text-mint" viewBox="0 0 100 50" preserveAspectRatio="none">
                   <motion.path
                      d="M0,50 L20,40 L40,45 L60,20 L80,30 L100,10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1 }}
                   />
                 </svg>
               )}

               {activeTab === 'FAMILY_OFFICES' && (
                 <div className="w-full px-8">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Risk</span>
                        <span>Limit</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: '10%' }}
                            animate={{ width: '75%' }}
                            transition={{ duration: 1 }}
                            className="h-full bg-mint"
                        />
                    </div>
                 </div>
               )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default UserSegments;
