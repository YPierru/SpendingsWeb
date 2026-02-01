import { useExpenses } from './context/ExpenseContext';
import { CSVLoader } from './components/data/CSVLoader';
import { DataSummary } from './components/data/DataSummary';

function App() {
  const { expenses, loading, errors, summary, loadFromCSV, clearData } = useExpenses();

  const hasData = expenses.length > 0;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">SpendingsWeb</h1>
          <p className="mt-1 text-sm text-gray-600">Personal Finance Tracking Application</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!hasData && !loading && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold text-blue-900 mb-2">Welcome to SpendingsWeb</h2>
              <p className="text-blue-700">
                No data loaded yet. Load your CSV file to get started.
              </p>
            </div>
            <CSVLoader onLoadCSV={loadFromCSV} loading={loading} errors={errors} />
          </div>
        )}

        {loading && !hasData && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <svg
                className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="text-lg font-semibold text-gray-700">Loading CSV data...</p>
            </div>
          </div>
        )}

        {errors.length > 0 && hasData && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="text-yellow-800 font-semibold mb-2">
              Warning: Some records had errors
            </h3>
            <p className="text-sm text-yellow-700">
              {errors.length} row(s) could not be parsed. See details in the loader component.
            </p>
          </div>
        )}

        {hasData && summary && (
          <div className="space-y-6">
            <DataSummary summary={summary} onClearData={clearData} />
            {errors.length > 0 && (
              <CSVLoader onLoadCSV={loadFromCSV} loading={loading} errors={errors} />
            )}
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            SpendingsWeb - Phase 1: CSV Loading Infrastructure
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
