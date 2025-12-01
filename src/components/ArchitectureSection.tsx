import React, { useState } from 'react';
import SectionHeader from './ui/SectionHeader';
import { Brain, ShieldCheck, Clock, Network } from 'lucide-react';

interface ArchitectureComponent {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ArchitectureSection: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string>('agents');

  const components: ArchitectureComponent[] = [
    {
      id: 'agents',
      title: 'ReFinity© RL Agents',
      description: 'Ensemble reinforcement learning with reward centering and MetaOptimize hyperparameter tuning. Our agents continuously adapt to market conditions through distributed training and inference.',
      icon: <Brain className="h-6 w-6 text-mint" />
    },
    {
      id: 'zkvar',
      title: 'zk-VaR Engine',
      description: 'Event-driven proofing system adjusting cadence to market volatility. Pre-trade proofs enforce Value-at-Risk (VaR) caps with CID-traced audit trails to ensure risk compliance.',
      icon: <ShieldCheck className="h-6 w-6 text-mint" />
    },
    {
      id: 'latency',
      title: 'P95 Latency',
      description: 'Provable, real-time P95 latency across the entire trade pipeline—measured, enforced, and continuously optimized.',
      icon: <Clock className="h-6 w-6 text-mint" />
    },
    {
      id: 'governance',
      title: 'Governance',
      description: 'Ongoing evaluation between DAO and Foundation governance models. Our governance structure ensures all stakeholders have a voice in the protocol\'s development and future direction.',
      icon: <Network className="h-6 w-6 text-mint" />
    }
  ];

  const activeComponentData = components.find(c => c.id === activeComponent) || components[0];

  return (
    <section id="architecture" className="py-20 md:py-28 bg-charcoal-light relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-lighter via-charcoal to-charcoal opacity-30"></div>
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-mint/5 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-mint/5 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeader 
          title="Architecture Overview" 
          subtitle="A deep dive into our technical infrastructure" 
        />

        <div className="mt-16 relative">
          {/* Architecture Diagram */}
          <div className="hidden lg:block mx-auto max-w-4xl h-[400px] relative mb-12">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Central Hub */}
              <div className="w-40 h-40 bg-charcoal rounded-full border-2 border-mint flex items-center justify-center z-20">
                <div className="text-center">
                  <p className="text-mint font-bold">ReFi.Trading</p>
                  <p className="text-xs text-gray-400">Core Protocol</p>
                </div>
              </div>

              {/* Connecting Lines */}
              <div className="absolute inset-0">
                {/* Agent Line */}
                <div className="absolute top-[50%] left-[50%] w-[160px] h-1 bg-mint/30 transform -translate-y-[100px] -translate-x-[200px] rotate-[30deg] rounded-full"></div>
                {/* zkVaR Line */}
                <div className="absolute top-[50%] left-[50%] w-[160px] h-1 bg-mint/30 transform translate-y-[100px] -translate-x-[200px] -rotate-[30deg] rounded-full"></div>
                {/* Latency Line */}
                <div className="absolute top-[50%] left-[50%] w-[160px] h-1 bg-mint/30 transform translate-y-[100px] translate-x-[40px] rotate-[30deg] rounded-full"></div>
                {/* Governance Line */}
                <div className="absolute top-[50%] left-[50%] w-[160px] h-1 bg-mint/30 transform -translate-y-[100px] translate-x-[40px] -rotate-[30deg] rounded-full"></div>
              </div>

              {/* Component Nodes */}
              <div 
                className={`absolute top-[80px] left-[100px] w-32 h-32 bg-charcoal rounded-full border-2 ${activeComponent === 'agents' ? 'border-mint shadow-[0_0_15px_rgba(12,212,160,0.5)]' : 'border-gray-600'} flex items-center justify-center cursor-pointer transition-all duration-300 z-10`}
                onClick={() => setActiveComponent('agents')}
              >
                <div className="text-center p-2">
                  <Brain className={`h-6 w-6 ${activeComponent === 'agents' ? 'text-mint' : 'text-gray-400'} mx-auto mb-1`} />
                  <p className={`font-medium ${activeComponent === 'agents' ? 'text-mint' : 'text-gray-300'}`}>RL Agents</p>
                </div>
              </div>

              <div 
                className={`absolute top-[280px] left-[100px] w-32 h-32 bg-charcoal rounded-full border-2 ${activeComponent === 'zkvar' ? 'border-mint shadow-[0_0_15px_rgba(12,212,160,0.5)]' : 'border-gray-600'} flex items-center justify-center cursor-pointer transition-all duration-300 z-10`}
                onClick={() => setActiveComponent('zkvar')}
              >
                <div className="text-center p-2">
                  <ShieldCheck className={`h-6 w-6 ${activeComponent === 'zkvar' ? 'text-mint' : 'text-gray-400'} mx-auto mb-1`} />
                  <p className={`font-medium ${activeComponent === 'zkvar' ? 'text-mint' : 'text-gray-300'}`}>zk-VaR Engine</p>
                </div>
              </div>

              <div 
                className={`absolute top-[280px] right-[100px] w-32 h-32 bg-charcoal rounded-full border-2 ${activeComponent === 'latency' ? 'border-mint shadow-[0_0_15px_rgba(12,212,160,0.5)]' : 'border-gray-600'} flex items-center justify-center cursor-pointer transition-all duration-300 z-10`}
                onClick={() => setActiveComponent('latency')}
              >
                <div className="text-center p-2">
                  <Clock className={`h-6 w-6 ${activeComponent === 'latency' ? 'text-mint' : 'text-gray-400'} mx-auto mb-1`} />
                  <p className={`font-medium ${activeComponent === 'latency' ? 'text-mint' : 'text-gray-300'}`}>P95 Latency</p>
                </div>
              </div>

              <div 
                className={`absolute top-[80px] right-[100px] w-32 h-32 bg-charcoal rounded-full border-2 ${activeComponent === 'governance' ? 'border-mint shadow-[0_0_15px_rgba(12,212,160,0.5)]' : 'border-gray-600'} flex items-center justify-center cursor-pointer transition-all duration-300 z-10`}
                onClick={() => setActiveComponent('governance')}
              >
                <div className="text-center p-2">
                  <Network className={`h-6 w-6 ${activeComponent === 'governance' ? 'text-mint' : 'text-gray-400'} mx-auto mb-1`} />
                  <p className={`font-medium ${activeComponent === 'governance' ? 'text-mint' : 'text-gray-300'}`}>Governance</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Component Selection */}
          <div className="lg:hidden grid grid-cols-2 gap-4 mb-8">
            {components.map((component) => (
              <div
                key={component.id}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                  activeComponent === component.id 
                    ? 'bg-charcoal border-l-2 border-mint shadow-lg' 
                    : 'bg-charcoal-lighter hover:bg-charcoal'
                }`}
                onClick={() => setActiveComponent(component.id)}
              >
                <div className="flex items-center">
                  <div className={`p-2 rounded ${activeComponent === component.id ? 'bg-mint/20' : 'bg-charcoal'}`}>
                    {component.icon}
                  </div>
                  <h3 className="ml-2 font-medium text-sm">{component.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Component Details */}
          <div className="bg-charcoal p-6 md:p-8 rounded-lg shadow-lg border border-gray-700 max-w-4xl mx-auto">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded bg-mint/20">
                {activeComponentData.icon}
              </div>
              <h3 className="ml-3 font-bold text-xl md:text-2xl">{activeComponentData.title}</h3>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">{activeComponentData.description}</p>
            
            {/* Component-specific details */}
            <div className="bg-charcoal-lighter p-4 rounded-md">
              {activeComponent === 'agents' && (
                <div className="text-sm text-gray-300">
                  <div className="mb-2"><span className="text-mint font-medium">Algorithms:</span> PPO, TD3, RVI-Q</div>
                  <div className="mb-2"><span className="text-mint font-medium">Training:</span> Ensemble with reward centering</div>
                  <div><span className="text-mint font-medium">Optimization:</span> MetaOptimize hyperparameter tuning</div>
                </div>
              )}
              
              {activeComponent === 'zkvar' && (
                <div className="text-sm text-gray-300">
                  <div className="mb-2"><span className="text-mint font-medium">Proof Systems:</span> Groth16, PLONK</div>
                  <div className="mb-2"><span className="text-mint font-medium">Risk Metrics:</span> Value-at-Risk (VaR), CVaR</div>
                  <div><span className="text-mint font-medium">Audit Trail:</span> CID-traced on-chain verification</div>
                </div>
              )}
              
              {activeComponent === 'latency' && (
                <div className="text-sm text-gray-300">
                  <div className="mb-3">
                    <span className="text-mint font-medium">Latency Target:</span>
                    <div className="mt-1 text-xs">
                      <div>Full-pipeline P95 &lt; 150 ms (launch) → 100 ms → 40 ms</div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <span className="text-mint font-medium">Key Contributors:</span>
                    <div className="mt-1 text-xs">
                      <div>RL inference ≤ 20 ms • zk-VaR proof ≤ 80 ms • Broker loop ≤ 45 ms</div>
                    </div>
                  </div>
                  <div>
                    <span className="text-mint font-medium">Optimization Roadmap:</span>
                    <div className="mt-1 text-xs">
                      <div>Proof batching & recursion • Broker co-location • Geo-routed inference</div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeComponent === 'governance' && (
                <div className="text-sm text-gray-300">
                  <div className="mb-2"><span className="text-mint font-medium">Models:</span> DAO vs. Foundation (hybrid approach)</div>
                  <div className="mb-2"><span className="text-mint font-medium">Voting:</span> Token-weighted with delegation</div>
                  <div><span className="text-mint font-medium">Proposals:</span> Protocol parameters, treasury allocation</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;