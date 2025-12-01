import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link2, Shield, Zap, X, ExternalLink } from 'lucide-react';

const HowItWorksSection: React.FC = () => {
  const { t } = useTranslation();
  const [showArchitectureModal, setShowArchitectureModal] = useState(false);

  const steps = [
    {
      icon: <Link2 className="h-8 w-8 text-mint" />,
      title: t('howItWorks.steps.connect.title'),
      description: t('howItWorks.steps.connect.description')
    },
    {
      icon: <Shield className="h-8 w-8 text-mint" />,
      title: t('howItWorks.steps.setRisk.title'),
      description: t('howItWorks.steps.setRisk.description')
    },
    {
      icon: <Zap className="h-8 w-8 text-mint" />,
      title: t('howItWorks.steps.launch.title'),
      description: t('howItWorks.steps.launch.description')
    }
  ];

  const proofPoints = [
    {
      icon: <Zap className="h-5 w-5 text-mint" />,
      text: t('howItWorks.proofPoints.rlAgents')
    },
    {
      icon: <Shield className="h-5 w-5 text-mint" />,
      text: t('howItWorks.proofPoints.zkVerified')
    },
    {
      icon: <Link2 className="h-5 w-5 text-mint" />,
      text: t('howItWorks.proofPoints.selfCustodied')
    }
  ];

  return (
    <>
      <section 
        id="how-it-works" 
        className="py-20 md:py-24 bg-charcoal relative overflow-hidden"
        itemScope 
        itemType="https://schema.org/HowTo"
      >
        <meta itemProp="name" content="How ReFi.Trading Works" />
        <meta itemProp="description" content="Learn how to use ReFi.Trading in three simple steps" />
        
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/Slide3.png)' }}
          role="img"
          aria-label="How ReFi.Trading works background"
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/60 to-charcoal/80"></div>
        
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 grid-pattern opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-lighter via-charcoal to-charcoal opacity-30"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <header className="text-center mb-16">
              <h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                itemProp="name"
              >
                {t('howItWorks.title')}
              </h2>
            </header>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Three Steps */}
              <div className="space-y-8" itemProp="supply" itemScope itemType="https://schema.org/HowToSupply">
                {steps.map((step, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-6"
                    itemProp="step"
                    itemScope 
                    itemType="https://schema.org/HowToStep"
                  >
                    <meta itemProp="position" content={String(index + 1)} />
                    <div className="flex-shrink-0 w-16 h-16 bg-charcoal-lighter rounded-full flex items-center justify-center border border-gray-700">
                      {step.icon}
                    </div>
                    <div>
                      <h3 
                        className="text-xl font-semibold mb-2"
                        itemProp="name"
                      >
                        {step.title}
                      </h3>
                      <p 
                        className="text-gray-300"
                        itemProp="text"
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Proof Block */}
              <aside className="bg-charcoal-lighter rounded-lg p-8 border border-gray-700">
                <h3 className="text-xl font-semibold mb-6 text-center">{t('howItWorks.proofPoints.title')}</h3>
                <div className="space-y-4">
                  {proofPoints.map((point, index) => (
                    <div key={index} className="flex items-center gap-3">
                      {point.icon}
                      <span className="text-gray-300">{point.text}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setShowArchitectureModal(true)}
                    className="text-mint hover:text-mint-light transition-colors duration-200 text-sm font-medium flex items-center gap-2 mx-auto"
                  >
                    Architecture Overview
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Modal */}
      {showArchitectureModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-charcoal-light rounded-lg border border-gray-700 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-xl font-bold">Architecture Overview</h3>
              <button
                onClick={() => setShowArchitectureModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="bg-charcoal rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-mint" />
                  Built on Proven Technology
                </h4>
                <p className="text-gray-300 text-sm">
                  Enterprise-grade infrastructure ensuring reliability and scalability for professional trading operations.
                </p>
              </div>

              <div className="bg-charcoal rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-mint" />
                  Reinforcement-learning agents
                </h4>
                <p className="text-gray-300 text-sm">
                  Ensemble PPO, TD3, RVI-Q agents with reward centering and MetaOptimize tuning for adaptive market response.
                </p>
              </div>

              <div className="bg-charcoal rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-mint" />
                  zk-verified risk and compliance enforcement
                </h4>
                <p className="text-gray-300 text-sm">
                  Pre-trade proofs using Groth16/PLONK enforce Value-at-Risk caps with CID-traced audit trails.
                </p>
              </div>

              <div className="bg-charcoal rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Link2 className="h-5 w-5 text-mint" />
                  Self-custodied execution
                </h4>
                <p className="text-gray-300 text-sm">
                  ERC-4337 account abstraction enables autonomous trading while maintaining full user control over assets.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HowItWorksSection;