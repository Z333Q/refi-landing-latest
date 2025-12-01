import React from 'react';
import { Globe, Lock, FileText, Scale } from 'lucide-react';

const Regulatory: React.FC = () => {
  return (
    <section className="py-24 px-6 bg-charcoal-light border-y border-gray-700">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
            <h2 className="text-3xl font-display font-bold text-white mb-2">Regulatory and Compliance</h2>
            <p className="text-gray-body max-w-2xl">
                Designed to meet regulatory standards in the UAE and global financial hubs.
                We provide the technology; licensed brokers provide the custody and execution.
            </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-charcoal-deep p-6 rounded border border-gray-700">
                <Globe className="text-mint mb-4" size={24} />
                <h3 className="text-white font-bold mb-2">Non-Custodial Model</h3>
                <p className="text-sm text-gray-body">Assets stay with licensed brokers in approved regions. We never hold funds.</p>
            </div>
            <div className="bg-charcoal-deep p-6 rounded border border-gray-700">
                <Scale className="text-mint mb-4" size={24} />
                <h3 className="text-white font-bold mb-2">MPT Based</h3>
                <p className="text-sm text-gray-body">Portfolio math based on Modern Portfolio Theory. Not speculation.</p>
            </div>
            <div className="bg-charcoal-deep p-6 rounded border border-gray-700">
                <Lock className="text-mint mb-4" size={24} />
                <h3 className="text-white font-bold mb-2">AI as Tool</h3>
                <p className="text-sm text-gray-body">AI detects market regimes but does not make final advisory decisions.</p>
            </div>
            <div className="bg-charcoal-deep p-6 rounded border border-gray-700">
                <FileText className="text-mint mb-4" size={24} />
                <h3 className="text-white font-bold mb-2">Audit Trail</h3>
                <p className="text-sm text-gray-body">Every decision produces a cryptographic proof log for full auditability.</p>
            </div>
        </div>

        <div className="mt-8 text-xs text-gray-600">
            <p>The tool does not provide advice. The user defines all constraints. Execution remains supervised by licensed brokers.</p>
        </div>
      </div>
    </section>
  );
};

export default Regulatory;
