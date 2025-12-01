import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePortfolioStore, Stats } from '../stores/usePortfolioStore';
import LocalizedMetric from './ui/LocalizedMetric';
import { useLocalization } from '../lib/l10n';

const MetricsGrid: React.FC = () => {
  const { i18n } = useTranslation();
  const { portfolioData, isLoading } = usePortfolioStore();
  const l10n = useLocalization(i18n.language);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-[#101417]/70 ring-1 ring-[#1b1f24] rounded-2xl p-6">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-700 rounded mb-2"></div>
              <div className="h-8 bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { title: 'CAGR', type: 'percentage' },
          { title: 'Sharpe Ratio', type: 'ratio' },
          { title: 'Max Drawdown', type: 'percentage' },
          { title: '95% VaR', type: 'percentage' },
          { title: 'Expected Shortfall', type: 'percentage' },
        ].map((metric, i) => (
          <div key={i} className="bg-[#101417]/70 ring-1 ring-[#1b1f24] rounded-2xl p-6">
            <div className="flex flex-col">
              <h3 className="text-sm font-medium text-gray-400 mb-1">{metric.title}</h3>
              <div className="text-2xl font-bold text-gray-600">--</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const { stats } = portfolioData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <LocalizedMetric
        title="CAGR"
        value={stats.cagr}
        type="percentage"
        description="Compound Annual Growth Rate"
        trend={stats.cagr > 0 ? 'up' : 'down'}
      />
      <LocalizedMetric
        title="Sharpe Ratio"
        value={stats.sharpe}
        type="ratio"
        description="Risk-adjusted returns"
        trend={stats.sharpe > 1 ? 'up' : stats.sharpe > 0.5 ? 'neutral' : 'down'}
      />
      <LocalizedMetric
        title="Max Drawdown"
        value={stats.max_dd}
        type="percentage"
        description="Largest peak-to-trough decline"
        trend={stats.max_dd > -0.1 ? 'up' : stats.max_dd > -0.2 ? 'neutral' : 'down'}
      />
      <LocalizedMetric
        title="95% VaR"
        value={stats.var95}
        type="percentage"
        description="Value at Risk (95% confidence)"
        trend={stats.var95 > -0.05 ? 'up' : stats.var95 > -0.1 ? 'neutral' : 'down'}
      />
      <LocalizedMetric
        title="Expected Shortfall"
        value={stats.es95}
        type="percentage"
        description="Average loss beyond VaR"
        trend={stats.es95 > -0.1 ? 'up' : stats.es95 > -0.2 ? 'neutral' : 'down'}
      />
    </div>
  );
};

export default MetricsGrid;