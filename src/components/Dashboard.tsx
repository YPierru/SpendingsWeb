import { useMemo } from 'react';
import { Expense } from '../types/expense.types';
import {
  prepareTimeSeriesData,
  prepareCategoryData,
  prepareMonthlyData,
  prepareIncomeVsExpenses,
} from '../utils/chartDataProcessing';
import { TimeSeriesChart } from './charts/TimeSeriesChart';
import { CategoryPieChart } from './charts/CategoryPieChart';
import { CategoryBarChart } from './charts/CategoryBarChart';
import { MonthlyBarChart } from './charts/MonthlyBarChart';
import { IncomeExpenseComparison } from './charts/IncomeExpenseComparison';

interface DashboardProps {
  expenses: Expense[];
}

export function Dashboard({ expenses }: DashboardProps) {
  const timeSeriesData = useMemo(() => prepareTimeSeriesData(expenses), [expenses]);
  const categoryData = useMemo(() => prepareCategoryData(expenses), [expenses]);
  const monthlyData = useMemo(() => prepareMonthlyData(expenses), [expenses]);
  const incomeVsExpenses = useMemo(() => prepareIncomeVsExpenses(expenses), [expenses]);

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h2 className="text-xl font-semibold text-blue-900 mb-2">Data Visualizations</h2>
        <p className="text-blue-700 text-sm">
          Interactive charts showing your spending patterns and trends
        </p>
      </div>

      {/* Overall Summary */}
      <IncomeExpenseComparison
        income={incomeVsExpenses.income}
        expenses={incomeVsExpenses.expenses}
      />

      {/* Monthly Trends */}
      {monthlyData.length > 0 && <MonthlyBarChart data={monthlyData} />}

      {/* Time Series */}
      {timeSeriesData.length > 0 && <TimeSeriesChart data={timeSeriesData} />}

      {/* Category Breakdown - Show both pie and bar charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {categoryData.length > 0 && <CategoryPieChart data={categoryData} />}
        {categoryData.length > 0 && <CategoryBarChart data={categoryData} />}
      </div>

      {/* Category Details Table */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transactions
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg per Transaction
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categoryData.map((cat) => (
                <tr key={cat.category}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {cat.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                    €{cat.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                    {cat.count}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">
                    €{(cat.amount / cat.count).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
