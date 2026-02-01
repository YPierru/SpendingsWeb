import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CategoryData } from '../../utils/chartDataProcessing';

interface CategoryBarChartProps {
  data: CategoryData[];
}

const COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
  '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1',
];

export function CategoryBarChart({ data }: CategoryBarChartProps) {
  const formatCurrency = (value: any) =>
    value !== undefined ? `€${Number(value).toFixed(2)}` : '';

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Breakdown</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" tick={{ fontSize: 12 }} />
          <YAxis
            dataKey="category"
            type="category"
            tick={{ fontSize: 12 }}
            width={100}
          />
          <Tooltip
            formatter={formatCurrency}
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
          />
          <Bar dataKey="amount" label={{ position: 'right', formatter: (val: any) => formatCurrency(val) }}>
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
