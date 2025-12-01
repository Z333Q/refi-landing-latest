import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeader from './ui/SectionHeader';
import LazyImage from './ui/LazyImage';

interface Partner {
  name: string;
  logo: string;
  website?: string;
  description?: string;
  fullName?: string;
  scale?: number;
  className?: string;
}

const partners: Partner[] = [
  {
    name: 'Edmonton Unlimited',
    logo: '/Edmonton-Unlimited-Logo.webp',
    description: 'Edmonton\'s economic development corporation',
    fullName: 'Edmonton Unlimited',
    scale: 1.1
  },
  {
    name: 'Alberta Innovates',
    logo: '/Alberta_Innovates_logo.svg.png',
    description: 'Alberta\'s innovation agency',
    fullName: 'Alberta Innovates',
    scale: 1.0
  },
  {
    name: 'Alberta Machine Intelligence Institute',
    logo: '/amii.webp',
    description: 'Leading AI research institute',
    fullName: 'Alberta Machine Intelligence Institute (Amii)',
    scale: 1.265
  },
  {
    name: 'ventureLAB',
    logo: '/ventureLAB logo-colour-with-grey.png',
    description: 'Supporting tech companies in York Region',
    fullName: 'ventureLAB Innovation Hub',
    scale: 1.4,
    className: 'scale-140'
  },
  {
    name: 'MongoDB',
    logo: '/kuyjf3vea2hg34taa-horizontal_default_slate_blue.svg',
    description: 'Modern database for developers',
    fullName: 'MongoDB for Startups Program',
    scale: 1.0
  },
  {
    name: 'Google for Startups',
    logo: '/Google_for_Startups_logo.png',
    description: 'Supporting innovative startups worldwide',
    fullName: 'Google for Startups Accelerator',
    scale: 1.265
  },
  {
    name: 'Chainlink Labs',
    logo: '/chainlink-labs.png',
    description: 'Decentralized oracle networks',
    fullName: 'Chainlink Labs',
    scale: 1.3225
  },
  {
    name: 'Alpaca',
    logo: '/2a85a89-black-alpaca-logo.svg',
    description: 'Commission-free trading API',
    fullName: 'Alpaca Markets',
    scale: 1.0
  },
  {
    name: 'Tradier',
    logo: '/tradier.png',
    description: 'Brokerage API platform',
    fullName: 'Tradier Brokerage',
    scale: 0.935
  },
  {
    name: 'Interactive Brokers',
    logo: '/interactive-brokers.png',
    description: 'Global electronic broker',
    fullName: 'Interactive Brokers',
    scale: 1.5,
    className: 'scale-150'
  }
];

interface PartnerLogosSectionProps {
  variant?: 'default' | 'compact';
}

const PartnerLogosSection: React.FC<PartnerLogosSectionProps> = ({ variant = 'default' }) => {
  const isCompact = variant === 'compact';

  return (
    <section
      className={`relative ${isCompact ? 'py-12' : 'py-16 md:py-24'}`}
      aria-label="Our Partners"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className={`max-w-6xl mx-auto ${isCompact ? '' : 'text-center'}`}>
          {!isCompact && (
            <SectionHeader
              title="Trusted Partners"
              subtitle="Collaborating with industry leaders to build the future of AI trading"
              centered
            />
          )}

          {isCompact && (
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">Our Partners</h3>
              <p className="text-gray-400">
                Backed and supported by leading organizations in AI, blockchain, and technology
              </p>
            </div>
          )}

          <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 ${isCompact ? 'mt-8' : 'mt-12'}`}>
            {partners.map((partner, index) => (
              <div
                key={partner.name}
                className="group relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link
                  to="/partners"
                  className="block relative rounded-lg p-6 transition-all duration-[250ms] ease-in-out flex items-center justify-center h-[140px] border border-gray-300/40 hover:border-mint/60 hover:-translate-y-[3px] hover:shadow-[0_8px_16px_rgba(0,0,0,0.4)] bg-gray-100 overflow-hidden"
                  aria-label={`Learn more about our partnership with ${partner.name}`}
                  title={partner.fullName || partner.name}
                >
                  <LazyImage
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className={`object-contain transition-all duration-[250ms] ease-in-out partner-logo-glow group-hover:brightness-115 ${partner.className || ''}`}
                    style={{
                      maxHeight: '90px',
                      maxWidth: '100%',
                      width: 'auto',
                      height: 'auto',
                      transform: partner.scale ? `scale(${partner.scale})` : undefined
                    }}
                  />
                </Link>

                {partner.fullName && !isCompact && (
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 opacity-0 group-hover:opacity-100 transition-all duration-[250ms] transform translate-y-0 group-hover:translate-y-2 pointer-events-none z-10 whitespace-nowrap">
                    <div className="bg-[#1E2630] border border-mint/30 rounded-lg px-3 py-2 shadow-xl">
                      <p className="text-xs text-gray-200 font-medium">{partner.fullName}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {!isCompact && (
            <div className="mt-12 text-center">
              <p className="text-gray-400 text-sm">
                Interested in partnering with us?{' '}
                <a
                  href="/partners"
                  className="text-mint hover:text-mint-light transition-colors duration-200 font-medium"
                >
                  Get in touch
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PartnerLogosSection;
