import React from 'react';

const CompactRoadmapSection: React.FC = () => {
  const roadmapItems = [
    {
      quarter: 'Q4 2025',
      title: 'SDK alpha & smart-ETF integration'
    },
    {
      quarter: 'Q2 2026', 
      title: 'Public beta & governance features'
    },
    {
      quarter: 'Q4 2026',
      title: 'Wallet launch & exchange integration'
    }
  ];

  return (
    <section id="roadmap" className="py-16 bg-charcoal-light relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Roadmap</h2>
          
          <div className="space-y-4">
            {roadmapItems.map((item, index) => (
              <div key={index} className="flex items-center gap-6 bg-charcoal rounded-lg p-4 border border-gray-700">
                <div className="bg-mint/20 text-mint px-3 py-1 rounded-full text-sm font-medium min-w-fit">
                  {item.quarter}
                </div>
                <div className="text-gray-300 font-medium">
                  {item.title}
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