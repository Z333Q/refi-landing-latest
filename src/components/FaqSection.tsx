import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FaqSection: React.FC = () => {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: t('faq.questions.custody.question'),
      answer: t('faq.questions.custody.answer')
    },
    {
      question: t('faq.questions.brokers.question'),
      answer: t('faq.questions.brokers.answer')
    },
    {
      question: t('faq.questions.agents.question'),
      answer: t('faq.questions.agents.answer')
    },
    {
      question: t('faq.questions.risk.question'),
      answer: t('faq.questions.risk.answer')
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section 
      className="py-16 bg-charcoal relative overflow-hidden"
      itemScope 
      itemType="https://schema.org/FAQPage"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <h2 
            className="text-2xl md:text-3xl font-bold mb-12 text-center"
            itemProp="name"
          >
            {t('faq.title')}
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-charcoal-lighter rounded-lg border border-gray-700 overflow-hidden"
                itemScope 
                itemType="https://schema.org/Question"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-charcoal transition-colors duration-200"
                  aria-expanded={openFaq === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 
                    className="font-semibold text-lg"
                    itemProp="name"
                  >
                    {faq.question}
                  </h3>
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-mint flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                
                {openFaq === index && (
                  <div 
                    className="px-6 pb-6"
                    id={`faq-answer-${index}`}
                    itemScope 
                    itemType="https://schema.org/Answer"
                  >
                    <p 
                      className="text-gray-300 leading-relaxed"
                      itemProp="text"
                    >
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;