import { DataSummary as DataSummaryType } from '../../types/expense.types';

interface DataSummaryProps {
  summary: DataSummaryType;
  onClearData: () => void;
}

export function DataSummary({ summary, onClearData }: DataSummaryProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Data Summary</h2>
        <button
          onClick={onClearData}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Clear Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded">
          <h3 className="text-sm font-semibold text-gray-600 mb-1">Total Records</h3>
          <p className="text-2xl font-bold text-blue-600">{summary.totalRecords}</p>
        </div>

        {summary.dateRange && (
          <div className="bg-green-50 p-4 rounded">
            <h3 className="text-sm font-semibold text-gray-600 mb-1">Date Range</h3>
            <p className="text-sm font-medium text-green-600">
              {formatDate(summary.dateRange.start)} - {formatDate(summary.dateRange.end)}
            </p>
          </div>
        )}

        <div className="bg-purple-50 p-4 rounded">
          <h3 className="text-sm font-semibold text-gray-600 mb-1">Total Amount</h3>
          <p className="text-2xl font-bold text-purple-600">{formatAmount(summary.totalAmount)}</p>
        </div>

        <div className="bg-emerald-50 p-4 rounded">
          <h3 className="text-sm font-semibold text-gray-600 mb-1">Income</h3>
          <p className="text-2xl font-bold text-emerald-600">
            {formatAmount(summary.positiveAmount)}
          </p>
        </div>

        <div className="bg-red-50 p-4 rounded">
          <h3 className="text-sm font-semibold text-gray-600 mb-1">Expenses</h3>
          <p className="text-2xl font-bold text-red-600">
            {formatAmount(summary.negativeAmount)}
          </p>
        </div>

        <div className="bg-amber-50 p-4 rounded">
          <h3 className="text-sm font-semibold text-gray-600 mb-1">Categories</h3>
          <p className="text-2xl font-bold text-amber-600">{summary.categories.length}</p>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Categories Breakdown</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {summary.categories.map((category) => (
            <div key={category} className="bg-white p-3 rounded shadow-sm">
              <p className="text-sm font-medium text-gray-700">{category}</p>
              <p className="text-xs text-gray-500">{summary.categoryCounts[category]} records</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
