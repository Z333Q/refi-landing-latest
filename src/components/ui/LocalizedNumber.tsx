import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../lib/l10n';

interface LocalizedNumberProps {
  value: number;
  type?: 'currency' | 'percentage' | 'number' | 'compact' | 'portfolio';
  className?: string;
  showSign?: boolean;
  precision?: number;
}

const LocalizedNumber: React.FC<LocalizedNumberProps> = ({
  value,
  type = 'number',
  className = '',
  showSign = false,
  precision
}) => {
  const { i18n } = useTranslation();
  const l10n = useLocalization(i18n.language);

  const formatValue = () => {
    const options: Intl.NumberFormatOptions = {};
    
    if (precision !== undefined) {
      options.minimumFractionDigits = precision;
      options.maximumFractionDigits = precision;
    }

    if (showSign) {
      options.signDisplay = 'always';
    }

    switch (type) {
      case 'currency':
        return l10n.formatCurrency(value, options);
      case 'percentage':
        return l10n.formatPercentage(value, options);
      case 'compact':
        return l10n.formatCompactNumber(value);
      case 'portfolio':
        return l10n.formatPortfolioValue(value);
      default:
        return l10n.formatNumber(value, options);
    }
  };

  const getColorClass = () => {
    if (type === 'percentage' || showSign) {
      if (value > 0) return 'text-green-400';
      if (value < 0) return 'text-red-400';
    }
    return '';
  };

  return (
    <span className={`${getColorClass()} ${className}`}>
      {formatValue()}
    </span>
  );
};

export default LocalizedNumber;