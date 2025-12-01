import React, { useState } from 'react';
import SectionHeader from './ui/SectionHeader';
import { DollarSign, Lock, Server, Link, Vote } from 'lucide-react';

interface TokenUtility {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const TokenSection: React.FC = () => {
  const [activeUtility, setActiveUtility] = useState('rebates');

  const utilities: TokenUtility[] = [
    {
      id: 'rebates',
      title: 'Execution Rebates',
      description: 'Reduced transaction costs for frequent traders. The more you trade through our platform, the more $REFIN tokens you earn, which can be used to offset future trading costs.',
      icon: <DollarSign className="h-6 w-6" />
    },
    {
      id: 'zkproof',
      title: 'zk-Proof Subsidies',
      description: 'Incentivizing the use of provable risk management. Traders who opt for zk-proven risk limits receive subsidies in $REFIN tokens, encouraging responsible trading behaviors.',
      icon: <Lock className="h-6 w-6" />
    },
    {
      id: 'node',
      title: 'DePIN Node Rewards',
      description: 'Incentivizing node operators for infrastructure contributions. GPU and data node operators earn $REFIN tokens for providing compute resources to the network.',
      icon: <Server className="h-6 w-6" />
    },
    {
      id: 'bonding',
      title: 'Agent Bonding',
      description: 'Ensuring quality control and performance reliability. Developers who contribute RL agents to the platform must bond $REFIN tokens as a quality assurance mechanism.',
      icon: <Link className="h-6 w-6" />
    },
    {
      id: 'governance',
      title: 'Governance Access',
      description: 'Stakeholders influence key protocol decisions. $REFIN token holders can vote on protocol upgrades, parameter changes, and treasury allocations.',
      icon: <Vote className="h-6 w-6" />
    }
  ];

  const activeUtilityData = utilities.find(u => u.id === activeUtility) || utilities[0];

  return (
    <section id="token" className="section-spacing relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-lighter via-charcoal to-charcoal opacity-30"></div>
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-mint/5 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-mint/5 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeader 
          title="$REFIN Token Utility" 
          subtitle="Our native token powers the entire ecosystem with multiple utility functions"
        />

        <div className="grid md:grid-cols-5 gap-8">
          {utilities.map((utility) => (
            <div 
              key={utility.id}
              className={`card cursor-pointer ${
                activeUtility === utility.id 
                  ? 'bg-mint text-charcoal' 
                  : 'bg-charcoal-light hover:bg-charcoal-lighter text-white'
              }`}
              onClick={() => setActiveUtility(utility.id)}
            >
              <div className={activeUtility === utility.id ? 'text-charcoal' : 'text-mint'}>
                {utility.icon}
              </div>
              <h3 className="font-bold text-lg mb-2 mt-4">{utility.title}</h3>
            </div>
          ))}
        </div>

        <div className="mt-12 card">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/3">
              <div className="relative">
                <div className="w-48 h-48 rounded-full bg-mint/10 flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full bg-mint/20 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-mint flex items-center justify-center text-charcoal">
                      <div className="text-center">
                        <div className="text-xl font-bold">$REFIN</div>
                        <div className="text-xs">Utility Token</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold mb-6">{activeUtilityData.title}</h3>
              <p className="text-gray-300 text-lg leading-relaxed">{activeUtilityData.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TokenSection;