import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface IncomeExpenseComparisonProps {
  income: number;
  expenses: number;
}

export function IncomeExpenseComparison({ income, expenses }: IncomeExpenseComparisonProps) {
  const data = [
    { name: 'Income', value: income, color: '#10b981' },
    { name: 'Expenses', value: expenses, color: '#ef4444' },
    { name: 'Net', value: income - expenses, color: income - expenses >= 0 ? '#3b82f6' : '#f59e0b' },
  ];

  const formatCurrency = (value: any) =>
    value !== undefined ? `€${Number(value).toFixed(2)}` : '';

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Overall Summary</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" tick={{ fontSize: 12 }} />
          <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={80} />
          <Tooltip
            formatter={formatCurrency}
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
          />
          <Bar dataKey="value" label={{ position: 'right', formatter: (val: any) => formatCurrency(val) }}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">Total Income</p>
          <p className="text-xl font-bold text-green-600">{formatCurrency(income)}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Total Expenses</p>
          <p className="text-xl font-bold text-red-600">{formatCurrency(expenses)}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Net Balance</p>
          <p className={`text-xl font-bold ${income - expenses >= 0 ? 'text-blue-600' : 'text-amber-600'}`}>
            {formatCurrency(income - expenses)}
          </p>
        </div>
      </div>
    </div>
  );
}
