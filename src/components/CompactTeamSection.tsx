import React from 'react';
import { useTranslation } from 'react-i18next';
import { Linkedin as LinkedinIcon, Github as GithubIcon, Globe as GlobeIcon } from 'lucide-react';

const CompactTeamSection: React.FC = () => {
  const { t } = useTranslation();
  
  const teamMembers = [
    {
      name: 'Daniel Oosthuyzen',
      role: 'Chief Quant Engineer',
      bio: 'Quant systems architect with 10+ years in FX, equity and options infrastructure. Specializes in fast RL pipelines and market volatility modeling.',
      credibility: 'Built production trading systems at tier-1 banks',
      image: '/blog-images/dan-refi-trading.jpg',
      socialLinks: {
        linkedin: 'https://hail-shear-aa1.notion.site/Portfolio-FinTech-Quant-1ebcb6ac39a68024a654ffc186edd8bc',
        github: 'https://github.com/thinkquant/quant-portfolio',
        website: 'http://thinkquant.com'
      }
    },
    {
      name: 'Zeshan Ahmad',
      role: 'Chief Product & Strategy',
      bio: 'Professor of Blockchain, Cryptography, and Software Design. Has scaled multiple Web3 and DTC ventures, leads product development and governance architecture.',
      credibility: 'Former blockchain professor, scaled 3 Web3 startups',
      image: '/blog-images/zeshan-refi-trading.jpg',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/zeshan',
        github: 'https://github.com/z333q',
        website: 'https://natureofcommerce.com'
      }
    }
  ];

  return (
    <section id="team" className="py-16 bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">{t('team.title')}</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-charcoal-lighter rounded-lg p-6 border border-gray-700">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      width={64}
                      height={64}
                      loading="lazy"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                    <p className="text-mint text-sm font-medium mb-2">{member.role}</p>
                    <p className="text-gray-300 text-sm mb-2 leading-relaxed">{member.bio}</p>
                    <p className="text-xs text-gray-400 mb-3 italic">{member.credibility}</p>
                    
                    <div className="flex space-x-3">
                      {member.socialLinks.linkedin && (
                        <a href={member.socialLinks.linkedin} className="text-gray-400 hover:text-mint transition-colors" aria-label="LinkedIn">
                          <LinkedinIcon className="h-4 w-4" />
                        </a>
                      )}
                      {member.socialLinks.github && (
                        <a href={member.socialLinks.github} className="text-gray-400 hover:text-mint transition-colors" aria-label="GitHub">
                          <GithubIcon className="h-4 w-4" />
                        </a>
                      )}
                      {member.socialLinks.website && (
                        <a href={member.socialLinks.website} className="text-gray-400 hover:text-mint transition-colors" aria-label="Website">
                          <GlobeIcon className="h-4 w-4" />
                        </a>
                      )}
                    </div>
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

export default CompactTeamSection;