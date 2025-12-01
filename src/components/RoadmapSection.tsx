import React from 'react';
import SectionHeader from './ui/SectionHeader';
import { Check, Clock, ArrowRight } from 'lucide-react';

interface RoadmapItem {
  quarter: string;
  title: string;
  description: string;
  completed: boolean;
  key: string;
  features?: string[];
}

const RoadmapSection: React.FC = () => {
  const roadmapItems: RoadmapItem[] = [
    {
      quarter: 'Q4 2025',
      title: 'Product Validation',
      description: 'Validate core assumptions with real users through structured experiments and gather feedback.',
      completed: true,
      key: 'validation',
      features: [
        'Broker connection testing',
        'Risk system comprehension studies',
        'Paper-to-live conversion experiments',
        'User interview sessions'
      ]
    },
    {
      quarter: 'Q1 2026',
      title: 'Alpha Platform Launch',
      description: 'Build and launch alpha platform with core trading features for early adopters.',
      completed: false,
      key: 'alpha-launch',
      features: [
        'Broker integrations',
        'Paper trading environment',
        'Progressive risk caps',
        'Initial user onboarding'
      ]
    },
    {
      quarter: 'Q2 2026',
      title: 'Public Beta',
      description: 'Open platform to wider audience with enhanced features and proven performance track record.',
      completed: false,
      key: 'public-beta',
      features: [
        'Expanded broker support',
        'Advanced analytics',
        'Community features',
        'Mobile applications'
      ]
    },
    {
      quarter: 'Q3 2026',
      title: 'Scale & Optimize',
      description: 'Scale infrastructure and optimize for institutional adoption with advanced capabilities.',
      completed: false,
      key: 'scale',
      features: [
        'Institutional features',
        'API access',
        'Enhanced security',
        'Global expansion'
      ]
    }
  ];

  return (
    <section id="roadmap" className="section-spacing bg-charcoal-light relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-lighter via-charcoal to-charcoal opacity-30"></div>
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-mint/5 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-mint/5 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeader 
          title="Roadmap Highlights" 
          subtitle="Our journey to revolutionize AI trading" 
        />

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-mint/30 via-mint to-mint/30 transform md:-translate-x-1/2"></div>

            {/* Timeline Items */}
            {roadmapItems.map((item, index) => (
              <div 
                key={item.key}
                className={`relative mb-16 md:mb-32 ${
                  index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'
                }`}
              >
                {/* Status Indicator */}
                <div 
                  className={`absolute left-2 md:left-1/2 top-0 h-10 w-10 rounded-full flex items-center justify-center transform md:-translate-x-1/2 z-10 transition-all duration-300 ${
                    item.completed 
                      ? 'bg-mint shadow-[0_0_15px_rgba(12,212,160,0.5)]' 
                      : 'bg-charcoal border-2 border-mint/30'
                  }`}
                >
                  {item.completed ? (
                    <Check className="h-5 w-5 text-charcoal" />
                  ) : (
                    <Clock className="h-5 w-5 text-mint" />
                  )}
                </div>

                {/* Content Card */}
                <div 
                  className={`ml-12 md:ml-0 md:mx-8 transform transition-all duration-500 hover:translate-y-[-5px] ${
                    item.completed 
                      ? 'bg-gradient-to-br from-charcoal-lighter to-charcoal border-l-2 border-mint shadow-[0_0_25px_rgba(12,212,160,0.1)]' 
                      : 'bg-charcoal-lighter hover:bg-gradient-to-br hover:from-charcoal-lighter hover:to-charcoal border border-gray-700'
                  } rounded-lg p-8`}
                >
                  {/* Quarter Badge */}
                  <div className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-4 ${
                    item.completed ? 'bg-mint/20 text-mint' : 'bg-gray-700/50 text-gray-300'
                  }`}>
                    {item.quarter}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-300 leading-relaxed mb-6">{item.description}</p>

                  {/* Features List */}
                  <div className="space-y-3">
                    {item.features?.map((feature, featureIndex) => (
                      <div 
                        key={featureIndex}
                        className="flex items-start space-x-3"
                      >
                        <div className={`mt-1 h-2 w-2 rounded-full ${item.completed ? 'bg-mint' : 'bg-gray-500'}`} />
                        <span className="text-gray-400">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Learn More Button */}
                  <button className={`mt-6 group flex items-center text-sm font-medium ${
                    item.completed ? 'text-mint' : 'text-gray-400 hover:text-mint'
                  }`}>
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;