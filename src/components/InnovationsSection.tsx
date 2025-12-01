import React, { useState, useMemo } from 'react';
import { Lock, Brain, TrendingDown, Shield } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';
import { AnimatedCounter } from './ui/AnimatedCounter';

interface Innovation {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  stats?: { value: number; label: string }[];
  features: string[];
  techStack: string[];
}

const InnovationsSection: React.FC = () => {
  const [activeInnovation, setActiveInnovation] = useState('self-custodied');

  // Memoize innovations to prevent recreations
  const innovations: Innovation[] = useMemo(() => [
    {
      id: 'self-custodied',
      title: 'Self-Custodied Agents',
      description: 'ERC-4337 wallets securely execute FIX/REST trades without relinquishing custody, ensuring maximum security and control over your trading activities.',
      icon: <Lock className="w-6 h-6 text-mint" />,
      stats: [
        { value: 100, label: '% Self-Custodied' },
        { value: 0, label: 'Counterparty Risk' }
      ],
      features: [
        'Account abstraction via ERC-4337',
        'Multi-signature support',
        'Hardware wallet integration',
        'Real-time audit trails'
      ],
      techStack: ['ERC-4337', 'FIX Protocol', 'REST APIs', 'Hardware Security']
    },
    {
      id: 'refinity',
      title: 'ReFinity© RL Agents',
      description: 'Ensemble PPO, TD3, RVI-Q agents optimized for average-reward, volatility responsiveness, and centered returns via MetaOptimize tuning.',
      icon: <Brain className="w-6 h-6 text-mint" />,
      stats: [
        { value: 3, label: 'RL Algorithms' },
        { value: 95, label: '% Task Automation' }
      ],
      features: [
        'Ensemble learning architecture',
        'Adaptive reward centering',
        'MetaOptimize hyperparameter tuning',
        'Multi-agent coordination'
      ],
      techStack: ['PPO', 'TD3', 'RVI-Q', 'PyTorch']
    },
    {
      id: 'zk-proofed',
      title: 'zk-Proofed Risk Limits',
      description: 'Groth16/PLONK-based pre-trade proofs enforcing Value-at-Risk (VaR) caps with CID-traced audit trails aligned dynamically to market volatility.',
      icon: <TrendingDown className="w-6 h-6 text-mint" />,
      stats: [
        { value: 100, label: '% Verified Trades' },
        { value: 0, label: 'Unverified Risk' }
      ],
      features: [
        'Real-time VaR calculation',
        'Dynamic proof generation',
        'CID-traced verification',
        'Volatility-adjusted limits'
      ],
      techStack: ['Groth16', 'PLONK', 'Circom', 'SnarkJS']
    },
    {
      id: 'mev-shielded',
      title: 'MEV-Shielded Execution',
      description: 'A privacy-preserving commit-and-reveal pipeline that routes every on-chain order through encrypted bundles and fair-sequencing relays, eliminating front-running and sandwich attacks while preserving sub-150 ms P95 latency.',
      icon: <Shield className="w-6 h-6 text-mint" />,
      stats: [
        { value: 0, label: 'bps Sandwich MEV' },
        { value: 1, label: 'bps Avg. Slippage' }
      ],
      features: [
        'Private mempool encryption',
        'Commit-reveal fair sequencing',
        'Atomic batch bundling',
        'Slippage-aware routing',
        'Auditable MEV dashboard'
      ],
      techStack: ['Flashbots SUAVE', 'EigenLayer AVS', 'SGX Enclaves', 'Prysm Relays', 'Rust-Wasm']
    }
  ], []);

  const activeInnovationData = useMemo(() => innovations.find(i => i.id === activeInnovation) || innovations[0], [innovations, activeInnovation]);

  return (
    <section id="innovations" className="section-spacing relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-lighter via-charcoal to-charcoal opacity-30"></div>
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-mint/5 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-mint/5 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeader 
          title="Key Innovations" 
          subtitle="Our platform combines cutting-edge technologies to deliver institutional-grade AI trading capabilities"
        />

        <div className="grid md:grid-cols-4 gap-8">
          {innovations.map((innovation) => (
            <div 
              key={innovation.id}
              className={`transform transition-all duration-300 hover:scale-[1.02] cursor-pointer ${
                activeInnovation === innovation.id 
                  ? 'bg-gradient-to-br from-charcoal-lighter to-charcoal border-l-2 border-mint shadow-[0_0_25px_rgba(12,212,160,0.1)]' 
                  : 'bg-charcoal-light hover:bg-gradient-to-br hover:from-charcoal-lighter hover:to-charcoal'
              } rounded-lg p-6`}
              onClick={() => setActiveInnovation(innovation.id)}
            >
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-lg ${activeInnovation === innovation.id ? 'bg-mint/20' : 'bg-charcoal-lighter'}`}>
                  {innovation.icon}
                </div>
                <h3 className="ml-4 font-bold text-lg">{innovation.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 transform transition-all duration-500">
          <div className="bg-gradient-to-br from-charcoal-lighter to-charcoal rounded-lg p-8 shadow-lg border border-gray-700">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center mb-6">
                  <div className="p-3 rounded-lg bg-mint/20">
                    {activeInnovationData.icon}
                  </div>
                  <h3 className="ml-4 text-2xl font-bold text-mint">{activeInnovationData.title}</h3>
                </div>
                
                <p className="text-gray-300 text-lg leading-relaxed mb-8">{activeInnovationData.description}</p>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-mint font-semibold mb-3">Key Features</h4>
                    <ul className="grid grid-cols-1 gap-3">
                      {activeInnovationData.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-300">
                          <div className="h-2 w-2 bg-mint rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-mint font-semibold mb-3">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeInnovationData.techStack.map((tech, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-charcoal rounded-full text-sm text-gray-300 border border-gray-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* MEV-Shielded specific performance metrics */}
                  {activeInnovation === 'mev-shielded' && (
                    <div>
                      <h4 className="text-mint font-semibold mb-3">Performance Metrics</h4>
                      <div className="bg-charcoal p-4 rounded-md">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-mint font-medium">Detectable sandwich MEV:</span>
                            <div className="text-gray-300">0 bps</div>
                          </div>
                          <div>
                            <span className="text-mint font-medium">Avg. trade slippage:</span>
                            <div className="text-gray-300">≤ 1 bps</div>
                          </div>
                          <div className="col-span-2">
                            <span className="text-mint font-medium">Added latency (P95):</span>
                            <div className="text-gray-300">&lt; 10 ms</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col justify-center">
                {activeInnovationData.stats && (
                  <div className="grid grid-cols-2 gap-6">
                    {activeInnovationData.stats.map((stat, index) => (
                      <div 
                        key={index} 
                        className="bg-gradient-to-br from-charcoal to-charcoal-lighter p-6 rounded-lg text-center transform transition-all duration-300 hover:scale-[1.02]"
                      >
                        <div className="text-3xl font-bold text-mint mb-2">
                          <AnimatedCounter value={stat.value} duration={2000} />
                          {stat.label.includes('bps') ? ' bps' : stat.value === 100 || stat.value === 0 ? '%' : stat.value > 100 ? '+' : ''}
                        </div>
                        <div className="text-gray-400">{stat.label.replace(' bps', '').replace('bps ', '')}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InnovationsSection;