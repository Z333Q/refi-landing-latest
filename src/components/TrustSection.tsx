import React from 'react';
import { Shield, Sliders, FileCheck, TrendingUp, Power, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Shield,
    title: "Your Broker Supervises",
    description: "Assets stay at IBKR or Questrade. You keep custody. We execute via API."
  },
  {
    icon: Sliders,
    title: "You Control Risk",
    description: "Define your limits. The system optimizes within your specific constraints."
  },
  {
    icon: FileCheck,
    title: "Atomic Dual-Proof Gate",
    description: "Execution requires simultaneous success of zk-VaR (Math) and Chainlink ACE (Compliance) proofs."
  },
  {
    icon: TrendingUp,
    title: "Progressive Exposure Caps",
    description: "Start small. Scale limits only as you verify the system's performance."
  },
  {
    icon: Power,
    title: "Stop anytime with a kill switch",
    description: "Stop trading instantly. You always have the final override."
  },
  {
    icon: Globe,
    title: "Compliance by Design",
    description: "Region-by-region compliance verification through Chainlink ACE ensures adherence to local regulations and sanctions lists."
  }
];

const TrustSection: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-charcoal relative">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Trust and Safety</h2>
          <p className="text-gray-300 max-w-2xl">
            Six layers of protection ensuring safety and control.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-charcoal-light border border-gray-700 p-8 rounded group hover:border-mint/50 transition-colors"
            >
              <div className="w-12 h-12 bg-charcoal rounded flex items-center justify-center mb-6 border border-gray-700">
                <feature.icon size={20} className="text-mint" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-4 bg-charcoal-light/50 border border-gray-700 rounded text-center mx-auto max-w-4xl">
            <p className="text-xs text-gray-500 uppercase tracking-widest text-center">
                ReFi.Trading does not hold assets • ReFi.Trading does not provide advice
            </p>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
