import React from 'react';

const CompactRoadmapSection: React.FC = () => {
  const roadmapItems = [
    {
      quarter: 'Q4 2025',
      status: 'COMPLETED',
      title: 'Foundation & Validation',
      description: 'Interviews with traders, fund managers & regulators (CIRO, SEC, ADGM). North star metrics defined. RL benchmarks established with walk-forward validation. Compliance framework validated.'
    },
    {
      quarter: 'Q1 2026',
      status: 'IN PROGRESS',
      title: 'UAE/GCC Alpha Launch',
      description: 'ADGM RegLab sandbox approval. Private alpha in UAE/GCC with institutional partners. Real-money testing. SDK release. Integration with major brokers (IBKR, Alpaca).'
    },
    {
      quarter: 'Q2 2026',
      status: 'UPCOMING',
      title: 'Canada Beta & Market Entry',
      description: 'CIRO sandbox approval. Canada beta launch. Human-in-the-loop validation. Explainable AI features. Progressive caps & risk controls. Community onboarding.'
    },
    {
      quarter: 'Q3 2026',
      status: 'UPCOMING',
      title: 'Scale & Advanced Features',
      description: 'Advanced RL strategies. Mobile apps (iOS/Android). Enhanced zk-proof VaR system. Strategic exchange partnerships. Institutional-grade audit trails.'
    },
    {
      quarter: 'Q4 2026',
      status: 'UPCOMING',
      title: 'USA Market Entry & Global Expansion',
      description: 'SEC FinHub approval. USA beta launch. European expansion planning. Multi-jurisdiction compliance validated. Preparation for Series A & token framework (2027).'
    }
  ];

  return (
    <section id="roadmap" className="py-16 bg-charcoal-light relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Roadmap</h2>

          <div className="space-y-4">
            {roadmapItems.map((item, index) => (
              <div key={index} className="bg-charcoal rounded-lg p-5 border border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      item.status === 'COMPLETED' ? 'bg-mint/20 text-mint' :
                      item.status === 'IN PROGRESS' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-gray-700 text-gray-400'
                    }`}>
                      {item.quarter}
                    </div>
                    {item.status === 'COMPLETED' && (
                      <div className="mt-2 text-xs text-mint font-semibold">✓ DONE</div>
                    )}
                    {item.status === 'IN PROGRESS' && (
                      <div className="mt-2 text-xs text-blue-400 font-semibold">● ACTIVE</div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompactRoadmapSection;