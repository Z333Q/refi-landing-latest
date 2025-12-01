import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { enUS, es, fr, de, it, ptBR, ru, zhCN, ja, ko, ar, hi } from 'date-fns/locale';

// Locale mapping for date-fns
const dateLocales = {
  en: enUS,
  es: es,
  fr: fr,
  de: de,
  it: it,
  pt: ptBR,
  ru: ru,
  zh: zhCN,
  ja: ja,
  ko: ko,
  ar: ar,
  hi: hi
};

// Currency mapping for major regions
const currencyMap = {
  en: 'USD',
  es: 'EUR',
  fr: 'EUR',
  de: 'EUR',
  it: 'EUR',
  pt: 'BRL',
  ru: 'RUB',
  zh: 'CNY',
  ja: 'JPY',
  ko: 'KRW',
  ar: 'SAR',
  hi: 'INR'
};

// Number formatting styles by locale
const numberFormats = {
  en: { decimal: '.', thousands: ',' },
  es: { decimal: ',', thousands: '.' },
  fr: { decimal: ',', thousands: ' ' },
  de: { decimal: ',', thousands: '.' },
  it: { decimal: ',', thousands: '.' },
  pt: { decimal: ',', thousands: '.' },
  ru: { decimal: ',', thousands: ' ' },
  zh: { decimal: '.', thousands: ',' },
  ja: { decimal: '.', thousands: ',' },
  ko: { decimal: '.', thousands: ',' },
  ar: { decimal: '.', thousands: ',' },
  hi: { decimal: '.', thousands: ',' }
};

export class LocalizationService {
  private locale: string;
  private currency: string;
  private dateLocale: Locale;

  constructor(locale: string = 'en') {
    this.locale = locale;
    this.currency = currencyMap[locale as keyof typeof currencyMap] || 'USD';
    this.dateLocale = dateLocales[locale as keyof typeof dateLocales] || enUS;
  }

  // Format currency with proper locale
  formatCurrency(amount: number, options?: Intl.NumberFormatOptions): string {
    return new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency: this.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      ...options
    }).format(amount);
  }

  // Format percentage with locale
  formatPercentage(value: number, options?: Intl.NumberFormatOptions): string {
    return new Intl.NumberFormat(this.locale, {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      ...options
    }).format(value / 100);
  }

  // Format large numbers with compact notation
  formatCompactNumber(value: number): string {
    return new Intl.NumberFormat(this.locale, {
      notation: 'compact',
      compactDisplay: 'short',
      maximumFractionDigits: 1
    }).format(value);
  }

  // Format decimal numbers
  formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
    return new Intl.NumberFormat(this.locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      ...options
    }).format(value);
  }

  // Format dates with locale
  formatDate(date: string | Date, formatStr: string = 'PPP'): string {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatStr, { locale: this.dateLocale });
  }

  // Format relative time (e.g., "2 days ago")
  formatRelativeTime(date: string | Date): string {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return formatDistanceToNow(dateObj, { 
      addSuffix: true, 
      locale: this.dateLocale 
    });
  }

  // Format blog post date
  formatBlogDate(date: string): string {
    return this.formatDate(date, 'MMMM d, yyyy');
  }

  // Format short date for UI
  formatShortDate(date: string | Date): string {
    return this.formatDate(date, 'MMM dd, yyyy');
  }

  // Get localized currency symbol
  getCurrencySymbol(): string {
    return new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency: this.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(0).replace(/\d/g, '').trim();
  }

  // Format trading metrics
  formatTradingMetric(value: number, type: 'percentage' | 'ratio' | 'currency' | 'basis_points'): string {
    switch (type) {
      case 'percentage':
        return this.formatPercentage(value);
      case 'ratio':
        return this.formatNumber(value, { minimumFractionDigits: 2, maximumFractionDigits: 3 });
      case 'currency':
        return this.formatCurrency(value);
      case 'basis_points':
        return `${this.formatNumber(value * 10000)} bps`;
      default:
        return this.formatNumber(value);
    }
  }

  // Format file sizes
  formatFileSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${this.formatNumber(bytes / Math.pow(1024, i), { maximumFractionDigits: 1 })} ${sizes[i]}`;
  }

  // Get locale-specific decimal separator
  getDecimalSeparator(): string {
    return numberFormats[this.locale as keyof typeof numberFormats]?.decimal || '.';
  }

  // Get locale-specific thousands separator
  getThousandsSeparator(): string {
    return numberFormats[this.locale as keyof typeof numberFormats]?.thousands || ',';
  }

  // Check if locale uses RTL
  isRTL(): boolean {
    return this.locale === 'ar';
  }

  // Get locale-specific time format
  getTimeFormat(): '12h' | '24h' {
    // Most locales use 24h except US, UK, and some others
    const twelveHourLocales = ['en'];
    return twelveHourLocales.includes(this.locale) ? '12h' : '24h';
  }

  // Format time with locale preference
  formatTime(date: string | Date): string {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    const timeFormat = this.getTimeFormat();
    return format(dateObj, timeFormat === '12h' ? 'h:mm a' : 'HH:mm', { 
      locale: this.dateLocale 
    });
  }

  // Format portfolio metrics with proper locale
  formatPortfolioValue(value: number): string {
    if (value >= 1000000) {
      return this.formatCurrency(value / 1000000, { maximumFractionDigits: 1 }) + 'M';
    } else if (value >= 1000) {
      return this.formatCurrency(value / 1000, { maximumFractionDigits: 1 }) + 'K';
    }
    return this.formatCurrency(value);
  }
}

// React hook for using localization
export const useLocalization = (locale: string = 'en') => {
  return new LocalizationService(locale);
};

// Utility functions for common formatting needs
export const formatters = {
  currency: (amount: number, locale: string = 'en') => 
    new LocalizationService(locale).formatCurrency(amount),
  
  percentage: (value: number, locale: string = 'en') => 
    new LocalizationService(locale).formatPercentage(value),
  
  date: (date: string | Date, locale: string = 'en') => 
    new LocalizationService(locale).formatBlogDate(date.toString()),
  
  number: (value: number, locale: string = 'en') => 
    new LocalizationService(locale).formatNumber(value),
  
  compactNumber: (value: number, locale: string = 'en') => 
    new LocalizationService(locale).formatCompactNumber(value)
};