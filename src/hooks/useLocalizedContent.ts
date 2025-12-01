import { useTranslation } from 'react-i18next';
import { useLocalization } from '../lib/l10n';
import { useMemo } from 'react';

export const useLocalizedContent = () => {
  const { t, i18n } = useTranslation();
  const l10n = useLocalization(i18n.language);

  // Memoize localized content to prevent unnecessary recalculations
  const localizedContent = useMemo(() => ({
    // Navigation
    nav: {
      howItWorks: t('nav.howItWorks'),
      value: t('nav.value'),
      roadmap: t('nav.roadmap'),
      blog: t('nav.blog'),
      team: t('nav.team'),
      analyzer: t('nav.analyzer'),
      getStarted: t('nav.getStarted'),
      joinWaitlist: t('nav.joinWaitlist'),
      bookDemo: t('nav.bookDemo'),
      partners: t('nav.partners'),
      careers: t('nav.careers')
    },

    // Hero section
    hero: {
      badge: t('hero.badge'),
      title: t('hero.title'),
      subtitle: t('hero.subtitle'),
      requestAccess: t('hero.requestAccess'),
      watchDemo: t('hero.watchDemo')
    },

    // How it works
    howItWorks: {
      title: t('howItWorks.title'),
      steps: {
        connect: {
          title: t('howItWorks.steps.connect.title'),
          description: t('howItWorks.steps.connect.description')
        },
        setRisk: {
          title: t('howItWorks.steps.setRisk.title'),
          description: t('howItWorks.steps.setRisk.description')
        },
        launch: {
          title: t('howItWorks.steps.launch.title'),
          description: t('howItWorks.steps.launch.description')
        }
      },
      proofPoints: {
        title: t('howItWorks.proofPoints.title'),
        zkVerified: t('howItWorks.proofPoints.zkVerified'),
        selfCustodied: t('howItWorks.proofPoints.selfCustodied'),
        rlAgents: t('howItWorks.proofPoints.rlAgents')
      }
    },

    // Value context
    valueContext: {
      title: t('valueContext.title'),
      useCases: {
        retail: {
          title: t('valueContext.useCases.retail.title'),
          problem: t('valueContext.useCases.retail.problem'),
          solution: t('valueContext.useCases.retail.solution'),
          outcome: t('valueContext.useCases.retail.outcome')
        },
        quant: {
          title: t('valueContext.useCases.quant.title'),
          problem: t('valueContext.useCases.quant.problem'),
          solution: t('valueContext.useCases.quant.solution'),
          outcome: t('valueContext.useCases.quant.outcome')
        }
      },
      comparison: {
        title: t('valueContext.comparison.title'),
        features: {
          custody: t('valueContext.comparison.features.custody'),
          riskEnforcement: t('valueContext.comparison.features.riskEnforcement'),
          setupTime: t('valueContext.comparison.features.setupTime'),
          brokerControl: t('valueContext.comparison.features.brokerControl'),
          exitControl: t('valueContext.comparison.features.exitControl'),
          auditTrail: t('valueContext.comparison.features.auditTrail')
        },
        refi: {
          custody: t('valueContext.comparison.refi.custody'),
          riskEnforcement: t('valueContext.comparison.refi.riskEnforcement'),
          setupTime: t('valueContext.comparison.refi.setupTime'),
          brokerControl: t('valueContext.comparison.refi.brokerControl'),
          exitControl: t('valueContext.comparison.refi.exitControl'),
          auditTrail: t('valueContext.comparison.refi.auditTrail')
        },
        social: {
          custody: t('valueContext.comparison.social.custody'),
          riskEnforcement: t('valueContext.comparison.social.riskEnforcement'),
          setupTime: t('valueContext.comparison.social.setupTime'),
          brokerControl: t('valueContext.comparison.social.brokerControl'),
          exitControl: t('valueContext.comparison.social.exitControl'),
          auditTrail: t('valueContext.comparison.social.auditTrail')
        },
        custodial: {
          custody: t('valueContext.comparison.custodial.custody'),
          riskEnforcement: t('valueContext.comparison.custodial.riskEnforcement'),
          setupTime: t('valueContext.comparison.custodial.setupTime'),
          brokerControl: t('valueContext.comparison.custodial.brokerControl'),
          exitControl: t('valueContext.comparison.custodial.exitControl'),
          auditTrail: t('valueContext.comparison.custodial.auditTrail')
        }
      }
    },

    // FAQ
    faq: {
      title: t('faq.title'),
      questions: {
        custody: {
          question: t('faq.questions.custody.question'),
          answer: t('faq.questions.custody.answer')
        },
        brokers: {
          question: t('faq.questions.brokers.question'),
          answer: t('faq.questions.brokers.answer')
        },
        agents: {
          question: t('faq.questions.agents.question'),
          answer: t('faq.questions.agents.answer')
        },
        risk: {
          question: t('faq.questions.risk.question'),
          answer: t('faq.questions.risk.answer')
        }
      }
    },

    // Team
    team: {
      title: t('team.title'),
      subtitle: t('team.subtitle')
    },

    // Blog
    blog: {
      title: t('blog.title'),
      subtitle: t('blog.subtitle'),
      readMore: t('blog.readMore'),
      viewAll: t('blog.viewAll'),
      minRead: t('blog.minRead')
    },

    // Footer
    footer: {
      sections: {
        platform: t('footer.sections.platform'),
        resources: t('footer.sections.resources'),
        company: t('footer.sections.company'),
        getStarted: t('footer.sections.getStarted')
      },
      newsletter: {
        title: t('footer.newsletter.title'),
        placeholder: t('footer.newsletter.placeholder')
      },
      copyright: t('footer.copyright'),
      builtWith: t('footer.builtWith'),
      forTraders: t('footer.forTraders')
    },

    // Common
    common: {
      loading: t('common.loading'),
      error: t('common.error'),
      success: t('common.success'),
      submit: t('common.submit'),
      cancel: t('common.cancel'),
      close: t('common.close'),
      next: t('common.next'),
      previous: t('common.previous'),
      readMore: t('common.readMore'),
      learnMore: t('common.learnMore'),
      getStarted: t('common.getStarted'),
      comingSoon: t('common.comingSoon')
    }
  }), [t, i18n.language]);

  return {
    content: localizedContent,
    l10n,
    locale: i18n.language,
    isRTL: l10n.isRTL(),
    changeLanguage: i18n.changeLanguage
  };
};