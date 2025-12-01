import React from 'react';

const CompactRoadmapSection: React.FC = () => {
  const roadmapItems = [
    {
      quarter: 'Q4 2025',
      status: 'COMPLETED',
      title: 'Foundation & Validation',
      description: 'Interviews with traders, fund managers & regulators. North star metrics defined. RL benchmarks established with walk-forward validation.'
    },
    {
      quarter: 'Q1 2026',
      status: 'IN PROGRESS',
      title: 'Alpha Platform Launch',
      description: 'Private alpha with select institutional partners. Real-money testing. SDK release for developers. Integration with major brokers.'
    },
    {
      quarter: 'Q2 2026',
      status: 'UPCOMING',
      title: 'Public Beta & Market Entry',
      description: 'Open beta launch. US & Canada market entry. Regulatory approvals. Governance token launch. Community onboarding programs.'
    },
    {
      quarter: 'Q3 2026',
      status: 'UPCOMING',
      title: 'Scale & Global Expansion',
      description: 'European market entry. Advanced RL strategies. Mobile apps. Strategic partnerships with exchanges. Institutional custody integration.'
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