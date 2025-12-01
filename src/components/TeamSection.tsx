import React from 'react';
import SectionHeader from './ui/SectionHeader';
import { LinkedinIcon, GithubIcon, GlobeIcon } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

const TeamSection: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: 'Daniel Oosthuyzen',
      role: 'Chief Quant Engineer',
      bio: 'Quant Engineer – Quant systems architect with 10+ years in FX, equity and options infrastructure. Daniel specializes in fast RL pipelines and market volatility modeling, leading ReFinity©\'s AI agent driven execution engine layer. He builds production-grade trading systems by fusing statistics, numerical finance, and machine learning, combining algorithmic trading expertise with live data infrastructure.',
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
      bio: 'Product & Strategy Lead – Professor of Blockchain, Cryptography, and Software Design, with a focus on mentoring the next generation of technical founders. Zeshan has scaled multiple Web3 and DTC ventures, and leads product development, go-to-market strategy, governance architecture, and $REFIN token utility design for ReFi.Trading.',
      image: '/blog-images/zeshan-refi-trading.jpg',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/zeshan',
        github: 'https://github.com/z333q',
        website: 'https://natureofcommerce.com'
      }
    }
  ];

  return (
    <section id="team" className="section-spacing relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-lighter via-charcoal to-charcoal opacity-30"></div>
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-mint/5 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-mint/5 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeader 
          title="Founding Team" 
          subtitle="Meet the visionaries behind ReFi.Trading" 
        />

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {teamMembers.map((member) => (
            <div 
              key={member.name}
              className="card group hover:shadow-[0_0_25px_rgba(12,212,160,0.15)]"
            >
              <div className="aspect-[1/1] overflow-hidden rounded-lg mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  width={400}
                  height={400}
                  loading="lazy"
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                  <p className="text-mint font-medium">{member.role}</p>
                </div>
                <p className="text-gray-300 leading-relaxed">{member.bio}</p>
                
                <div className="flex space-x-4 pt-2">
                  {member.socialLinks.linkedin && (
                    <a href={member.socialLinks.linkedin} className="text-gray-400 hover:text-mint transition-colors duration-200" aria-label="LinkedIn">
                      <LinkedinIcon className="h-5 w-5" />
                    </a>
                  )}
                  {member.socialLinks.github && (
                    <a href={member.socialLinks.github} className="text-gray-400 hover:text-mint transition-colors duration-200" aria-label="GitHub">
                      <GithubIcon className="h-5 w-5" />
                    </a>
                  )}
                  {member.socialLinks.website && (
                    <a href={member.socialLinks.website} className="text-gray-400 hover:text-mint transition-colors duration-200" aria-label="Website">
                      <GlobeIcon className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;