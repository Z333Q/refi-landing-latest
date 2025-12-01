import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalization } from '../../lib/l10n';

interface LocalizedDateProps {
  date: string | Date;
  format?: 'full' | 'short' | 'relative' | 'blog' | 'time';
  className?: string;
}

const LocalizedDate: React.FC<LocalizedDateProps> = ({
  date,
  format = 'short',
  className = ''
}) => {
  const { i18n } = useTranslation();
  const l10n = useLocalization(i18n.language);

  const formatDate = () => {
    switch (format) {
      case 'full':
        return l10n.formatDate(date, 'EEEE, MMMM d, yyyy');
      case 'short':
        return l10n.formatShortDate(date);
      case 'relative':
        return l10n.formatRelativeTime(date);
      case 'blog':
        return l10n.formatBlogDate(date.toString());
      case 'time':
        return l10n.formatTime(date);
      default:
        return l10n.formatShortDate(date);
    }
  };

  const getISOString = () => {
    if (typeof date === 'string') return date;
    return date.toISOString();
  };

  return (
    <time 
      dateTime={getISOString()} 
      className={className}
      title={l10n.formatDate(date, 'EEEE, MMMM d, yyyy')}
    >
      {formatDate()}
    </time>
  );
};

export default LocalizedDate;