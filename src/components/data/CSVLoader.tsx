import { ParseError } from '../../types/expense.types';

interface CSVLoaderProps {
  onLoadCSV: () => void;
  loading: boolean;
  errors: ParseError[];
}

export function CSVLoader({ onLoadCSV, loading, errors }: CSVLoaderProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Load CSV Data</h2>

      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded p-4">
          <h3 className="text-red-800 font-semibold mb-2">Parsing Errors:</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {errors.map((error, index) => (
              <div key={index} className="text-sm">
                <span className="font-medium text-red-700">
                  Row {error.row} ({error.field}):
                </span>{' '}
                <span className="text-red-600">{error.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <p className="text-gray-600">
          Click the button below to load expense data from the CSV file located in the /data
          folder.
        </p>

        <button
          onClick={onLoadCSV}
          disabled={loading}
          className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
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
              Loading CSV...
            </span>
          ) : (
            'Load CSV Data'
          )}
        </button>

        {errors.length > 0 && (
          <button
            onClick={onLoadCSV}
            disabled={loading}
            className="w-full px-6 py-2 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors disabled:bg-gray-400"
          >
            Retry Loading
          </button>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded p-4">
        <h3 className="text-blue-800 font-semibold mb-2">Expected CSV Format:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>Delimiter: Semicolon (;)</li>
          <li>Date format: DD/MM/YYYY</li>
          <li>Amount format: Comma as decimal separator (e.g., -15,25)</li>
          <li>Required columns: Date, Category, Label, Amount</li>
        </ul>
      </div>
    </div>
  );
}
