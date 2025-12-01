/* /components/SeoFaq.tsx — exports FAQ schema data */

export const getFaqSchema = () => {
  return `{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "name": "ReFi.Trading Frequently Asked Questions",
  "description": "Common questions about ReFi.Trading AI trading platform, reinforcement learning agents, and zero-knowledge risk management",
  "url": "https://refi.trading/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do you take custody of my assets?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Your assets remain in your brokerage account at all times. ReFi.Trading agents execute trades through read-only API connections, ensuring you maintain full control and ownership of your funds."
      }
    },
    {
      "@type": "Question",
      "name": "Which brokers are supported?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We currently support Interactive Brokers, TD Ameritrade, E*TRADE, Charles Schwab, and Fidelity. Additional broker integrations are added based on user demand and technical compatibility."
      }
    },
    {
      "@type": "Question",
      "name": "How do AI agents decide when to trade?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our ReFinity© agents use ensemble reinforcement learning (PPO, TD3, RVI-Q) with reward centering and MetaOptimize tuning. They continuously adapt to market conditions while respecting your predefined risk parameters."
      }
    },
    {
      "@type": "Question",
      "name": "What risk controls are enforced?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Every trade must pass a zero-knowledge proof verification before execution. This includes Value-at-Risk (VaR) limits, position sizing constraints, and drawdown caps that you set. No trade can violate these mathematically proven limits."
      }
    },
    {
      "@type": "Question",
      "name": "Why use reinforcement learning instead of traditional algorithms?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Reinforcement learning adapts to changing market conditions in real-time, unlike static rule-based systems that break during regime shifts. Our RL agents continuously learn and optimize their strategies based on market feedback."
      }
    },
    {
      "@type": "Question",
      "name": "What are zero-knowledge proofs in trading?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Zero-knowledge proofs allow our system to verify that trades comply with your risk limits without revealing sensitive portfolio information. Before each trade, the agent generates a cryptographic proof that your Value-at-Risk stays within predefined caps."
      }
    },
    {
      "@type": "Question",
      "name": "How does performance compare to buy-and-hold?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In backtesting, our agents achieved 28% CAGR with a Sharpe ratio of 2.07 over a 3.1-year period, compared to buy-and-hold's 13.8% CAGR and 0.65 Sharpe ratio. Past performance does not guarantee future results."
      }
    },
    {
      "@type": "Question",
      "name": "What about transaction costs and slippage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our PPO-based algorithms account for real transaction costs and slippage in their optimization. The agents learn to minimize trading costs while maximizing risk-adjusted returns, outperforming static rebalancing methods in long-term backtests."
      }
    },
    {
      "@type": "Question",
      "name": "Is my data and trading strategy secure?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. All trading strategies and portfolio data are encrypted and never shared. Our zero-knowledge architecture ensures that even we cannot see your specific positions or trading patterns. Your privacy and security are fundamental to our design."
      }
    },
    {
      "@type": "Question",
      "name": "How quickly can I start trading with AI agents?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Once you have access to the platform, you can connect your broker, set risk parameters, and deploy an AI agent in under 20 minutes. The agents begin trading immediately while continuously learning and adapting to market conditions."
      }
    }
  ]
}`;
};