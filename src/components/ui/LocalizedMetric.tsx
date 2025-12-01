import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../lib/l10n';

interface LocalizedMetricProps {
  title: string;
  value: number;
  type: 'percentage' | 'ratio' | 'currency' | 'basis_points';
  description?: string;
  className?: string;
  trend?: 'up' | 'down' | 'neutral';
}

const LocalizedMetric: React.FC<LocalizedMetricProps> = ({
  title,
  value,
  type,
  description,
  className = '',
  trend = 'neutral'
}) => {
  const { i18n } = useTranslation();
  const l10n = useLocalization(i18n.language);

  const formatValue = () => {
    return l10n.formatTradingMetric(value, type);
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-400';
      case 'down':
        return 'text-red-400';
      default:
        return 'text-white';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return '↗';
      case 'down':
        return '↘';
      default:
        return '';
    }
  };

  return (
    <div className={`bg-[#101417]/70 ring-1 ring-[#1b1f24] rounded-2xl p-6 ${className}`}>
      <div className="flex flex-col">
        <h3 className="text-sm font-medium text-gray-400 mb-1">{title}</h3>
        <div className={`text-2xl font-bold flex items-center gap-2 ${getTrendColor()}`}>
          <span>{formatValue()}</span>
          {trend !== 'neutral' && (
            <span className="text-lg">{getTrendIcon()}</span>
          )}
        </div>
        {description && (
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        )}
      </div>
    </div>
  );
};

export default LocalizedMetric;