export interface CsvData {
  dates: string[];
  equity: number[];
}

export function downloadCsv(data: CsvData, filename: string = 'portfolio_data.csv'): void {
  if (!data.dates || !data.equity || data.dates.length !== data.equity.length) {
    throw new Error('Invalid data: dates and equity arrays must have the same length');
  }

  // Create CSV content
  const headers = ['Date', 'Portfolio Value'];
  const rows = data.dates.map((date, index) => [date, data.equity[index].toString()]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}