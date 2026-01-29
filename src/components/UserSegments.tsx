import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const segments = {
  LEAN_FUNDS: {
    label: "Investment Managers",
    headline: "Institutional workflows.",
    copy: "Execution automation software for teams managing multiple portfolios. Users define all trading rules and risk limits. Show stakeholders cryptographic proof of compliance with user-configured constraints.",
    widget: "Allocation blocks rising",
    tag: "User-defined risk constraints"
  },
  FAMILY_OFFICES: {
    label: "Wealth Management",
    headline: "Transparent execution.",
    copy: "Broker-connected execution automation for sophisticated investors. Define your own rules and limits. Assets remain at your broker. Orders execute only within user-configured constraints verified by cryptographic proofs.",
    widget: "Risk bar tightening",
    tag: "Orders within user limits"
  }
};

const UserSegments: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'LEAN_FUNDS' | 'FAMILY_OFFICES'>('LEAN_FUNDS');

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

               {activeTab === 'FAMILY_OFFICES' && (
                 <div className="w-full px-8">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Risk</span>
                        <span>User Limit</span>
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
