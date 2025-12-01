import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, User, TrendingUp, CheckCircle, X } from 'lucide-react';

const ValueContextSection: React.FC = () => {
  const { t } = useTranslation();
  
  const useCases = [
    {
      title: t('valueContext.useCases.retail.title'),
      problem: t('valueContext.useCases.retail.problem'),
      solution: t('valueContext.useCases.retail.solution'),
      outcome: t('valueContext.useCases.retail.outcome'),
      icon: <User className="h-6 w-6 text-mint" />
    },
    {
      title: t('valueContext.useCases.quant.title'),
      problem: t('valueContext.useCases.quant.problem'),
      solution: t('valueContext.useCases.quant.solution'),
      outcome: t('valueContext.useCases.quant.outcome'),
      icon: <TrendingUp className="h-6 w-6 text-mint" />
    }
  ];

  const comparisonData = [
    {
      feature: t('valueContext.comparison.features.custody'),
      refi: t('valueContext.comparison.refi.custody'),
      social: t('valueContext.comparison.social.custody'),
      custodial: t('valueContext.comparison.custodial.custody')
    },
    {
      feature: t('valueContext.comparison.features.riskEnforcement'),
      refi: t('valueContext.comparison.refi.riskEnforcement'),
      social: t('valueContext.comparison.social.riskEnforcement'),
      custodial: t('valueContext.comparison.custodial.riskEnforcement')
    },
    {
      feature: t('valueContext.comparison.features.setupTime'),
      refi: t('valueContext.comparison.refi.setupTime'),
      social: t('valueContext.comparison.social.setupTime'),
      custodial: t('valueContext.comparison.custodial.setupTime')
    },
    {
      feature: t('valueContext.comparison.features.brokerControl'),
      refi: t('valueContext.comparison.refi.brokerControl'),
      social: t('valueContext.comparison.social.brokerControl'),
      custodial: t('valueContext.comparison.custodial.brokerControl')
    },
    {
      feature: t('valueContext.comparison.features.exitControl'),
      refi: t('valueContext.comparison.refi.exitControl'),
      social: t('valueContext.comparison.social.exitControl'),
      custodial: t('valueContext.comparison.custodial.exitControl')
    },
    {
      feature: t('valueContext.comparison.features.auditTrail'),
      refi: t('valueContext.comparison.refi.auditTrail'),
      social: t('valueContext.comparison.social.auditTrail'),
      custodial: t('valueContext.comparison.custodial.auditTrail')
    }
  ];

  return (
    <section 
      id="value-context" 
      className="py-20 md:py-24 bg-charcoal-light relative overflow-hidden"
      itemScope 
      itemType="https://schema.org/WebPageElement"
    >
      <meta itemProp="name" content="Value Proposition" />
      <meta itemProp="description" content="Why choose ReFi.Trading over other trading solutions" />
      
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/Slide10.png)' }}
        role="img"
        aria-label="Value proposition background"
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/60 to-charcoal/80"></div>
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-lighter via-charcoal to-charcoal opacity-30"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto space-y-16">
          
          {/* Use Cases */}
          <div>
            <h2 
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              itemProp="headline"
            >
              {t('valueContext.title')}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8" role="list">
              {useCases.map((useCase, index) => (
                <article 
                  key={index} 
                  className="bg-charcoal rounded-lg p-6 border border-gray-700"
                  role="listitem"
                  itemScope 
                  itemType="https://schema.org/Article"
                >
                  <div className="flex items-center gap-3 mb-4">
                    {useCase.icon}
                    <h3 
                      className="text-xl font-semibold"
                      itemProp="headline"
                    >
                      {useCase.title}
                    </h3>
                  </div>
                  
                  <div className="space-y-3 text-sm" itemProp="articleBody">
                    <div>
                      <span className="text-gray-400">Problem:</span>
                      <span className="text-gray-300 ml-2">{useCase.problem}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Solution:</span>
                      <span className="text-gray-300 ml-2">{useCase.solution}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Outcome:</span>
                      <span className="text-mint ml-2 font-medium">{useCase.outcome}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          <div>
            <h2 
              className="text-2xl md:text-3xl font-bold mb-8 text-center"
              id="comparison-table"
            >
              {t('valueContext.comparison.title')}
            </h2>
            
            <div 
              className="bg-charcoal rounded-lg border border-gray-700 overflow-hidden"
              role="region"
              aria-labelledby="comparison-table"
            >
              <div className="overflow-x-auto">
                <table className="w-full" role="table">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th scope="col" className="text-left p-4 font-semibold text-gray-300">{t('valueContext.comparison.features.custody').split(' ')[0]}</th>
                      <th scope="col" className="text-center p-4 font-semibold text-mint">ReFi.Trading</th>
                      <th scope="col" className="text-center p-4 font-semibold text-gray-300">Social-trading app</th>
                      <th scope="col" className="text-center p-4 font-semibold text-gray-300">Custodial bot</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, index) => (
                      <tr key={index} className="border-b border-gray-700/50">
                        <th scope="row" className="p-4 font-medium text-gray-300">{row.feature}</th>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <CheckCircle className="h-4 w-4 text-mint" />
                            <span className="text-mint font-medium">{row.refi}</span>
                          </div>
                        </td>
                        <td className="p-4 text-center text-gray-400">{row.social}</td>
                        <td className="p-4 text-center text-gray-400">{row.custodial}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Credibility Link */}
          <div className="text-center">
            <a 
              href="/blog/open-hackable-provable"
              className="inline-flex items-center gap-2 text-mint hover:text-mint-light transition-colors duration-200 font-medium"
             aria-label="Learn how agents enforce risk with zero-knowledge proofs"
            >
              How agents enforce risk with zero-knowledge proofs
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* CTA */}
          <aside className="text-center bg-charcoal rounded-lg p-8 border border-gray-700">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-gray-300 mb-6">Priority access and broker support list.</p>
            <a 
              href="https://forms.gle/rr74yAhAM2MiGTVi9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-mint hover:bg-mint-dark text-charcoal font-semibold px-8 py-4 rounded-lg transition-all duration-300 text-lg group hover:shadow-[0_0_20px_rgba(12,212,160,0.3)]"
              aria-label="Join the ReFi.Trading waitlist"
            >
              Join the Waitlist
              <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ValueContextSection;