import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
  Legend,
} from 'recharts';
import { Download } from 'lucide-react';
import { usePortfolioStore } from '../stores/usePortfolioStore';
import { downloadCsv } from '../lib/downloadCsv';
import { useLocalization } from '../lib/l10n';
import toast from 'react-hot-toast';

interface ChartDataPoint {
  date: string;
  portfolio: number;
  spy?: number;
}

const EquityChart: React.FC = () => {
  const { i18n } = useTranslation();
  const { portfolioData, spyData, setSpyData, isLoading } = usePortfolioStore();
  const l10n = useLocalization(i18n.language);

  // Fetch S&P 500 data for comparison
  useEffect(() => {
    if (!spyData) {
      fetchSpyData();
    }
  }, [spyData]);

  const fetchSpyData = async () => {
    try {
      const apiUrl = import.meta.env.VITE_PORTFOLIO_API_URL || 'https://portfolio-analyzer-web-182665799543.us-west1.run.app';
      const response = await fetch(`${apiUrl}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symbols: ['^GSPC'] }),
      });

      if (!response.ok) throw new Error('Failed to fetch S&P 500 data');
      const data = await response.json();
      setSpyData(data);
    } catch (error) {
      console.error('Error fetching S&P 500 data:', error);
      // Don't show error toast for benchmark data
    }
  };

  const handleDownloadCsv = () => {
    if (!portfolioData) {
      toast.error('No portfolio data to download');
      return;
    }

    try {
      downloadCsv({
        dates: portfolioData.dates,
        equity: portfolioData.equity,
      }, 'portfolio_analysis.csv');
      toast.success('CSV downloaded successfully');
    } catch (error) {
      console.error('Error downloading CSV:', error);
      toast.error('Failed to download CSV');
    }
  };

  // Prepare chart data
  const chartData: ChartDataPoint[] = React.useMemo(() => {
    if (!portfolioData) return [];

    return portfolioData.dates.map((date, index) => {
      const dataPoint: ChartDataPoint = {
        date,
        portfolio: portfolioData.equity[index],
      };

      // Add S&P 500 data if available and same length
      if (spyData && spyData.equity.length === portfolioData.equity.length) {
        dataPoint.spy = spyData.equity[index];
      }

      return dataPoint;
    });
  }, [portfolioData, spyData]);

  const formatTooltipValue = (value: number) => {
    return l10n.formatCurrency(value);
  };

  const formatXAxisLabel = (tickItem: string) => {
    return l10n.formatDate(tickItem, 'MMM yy');
  };

  if (isLoading) {
    return (
      <div className="bg-[#101417]/70 ring-1 ring-[#1b1f24] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Portfolio Performance</h3>
        </div>
        <div className="h-96 flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Loading chart...</div>
        </div>
      </div>
    );
  }

  if (!portfolioData || chartData.length === 0) {
    return (
      <div className="bg-[#101417]/70 ring-1 ring-[#1b1f24] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Portfolio Performance</h3>
        </div>
        <div className="h-96 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <div className="text-lg mb-2">No data to display</div>
            <div className="text-sm">Select assets and click "Analyze Portfolio" to see results</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#101417]/70 ring-1 ring-[#1b1f24] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Portfolio Performance</h3>
        <button
          onClick={handleDownloadCsv}
          className="flex items-center gap-2 px-4 py-2 bg-[#43d4a0] text-black rounded-lg hover:bg-[#43d4a0]/90 transition-colors text-sm font-medium"
        >
          <Download className="h-4 w-4" />
          Download CSV
        </button>
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1b1f24" />
            <XAxis
              dataKey="date"
              tickFormatter={formatXAxisLabel}
              stroke="#6b7280"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis
              tickFormatter={(value) => `$${value.toFixed(0)}`}
              stroke="#6b7280"
              fontSize={12}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1b1f24',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#ffffff',
              }}
              formatter={(value: number, name: string) => [
                formatTooltipValue(value),
                name === 'portfolio' ? 'Portfolio' : 'S&P 500'
              ]}
              labelFormatter={(label) => new Date(label).toLocaleDateString()}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="portfolio"
              stroke="#43d4a0"
              strokeWidth={2}
              dot={false}
              name="Portfolio"
            />
            {spyData && (
              <Line
                type="monotone"
                dataKey="spy"
                stroke="#666666"
                strokeWidth={2}
                dot={false}
                name="S&P 500"
                strokeDasharray="5 5"
              />
            )}
            <Brush
              dataKey="date"
              height={30}
              stroke="#43d4a0"
              fill="#43d4a0"
              fillOpacity={0.1}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EquityChart;