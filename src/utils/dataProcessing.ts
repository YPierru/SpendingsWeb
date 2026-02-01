import { Expense, DataSummary } from '../types/expense.types';

export function calculateSummary(expenses: Expense[]): DataSummary {
  if (expenses.length === 0) {
    return {
      totalRecords: 0,
      dateRange: null,
      categories: [],
      totalAmount: 0,
      positiveAmount: 0,
      negativeAmount: 0,
      categoryCounts: {},
    };
  }

  const dateRange = getDateRange(expenses);
  const categories = getUniqueCategories(expenses);
  const totalAmount = getTotalAmount(expenses);
  const positiveAmount = expenses
    .filter((e) => e.amount > 0)
    .reduce((sum, e) => sum + e.amount, 0);
  const negativeAmount = expenses
    .filter((e) => e.amount < 0)
    .reduce((sum, e) => sum + e.amount, 0);

  const categoryCounts: Record<string, number> = {};
  expenses.forEach((expense) => {
    categoryCounts[expense.category] = (categoryCounts[expense.category] || 0) + 1;
  });

  return {
    totalRecords: expenses.length,
    dateRange,
    categories,
    totalAmount,
    positiveAmount,
    negativeAmount,
    categoryCounts,
  };
}

export function getDateRange(expenses: Expense[]): { start: Date; end: Date } | null {
  if (expenses.length === 0) return null;

  const dates = expenses.map((e) => e.date.getTime());
  const minDate = Math.min(...dates);
  const maxDate = Math.max(...dates);

  return {
    start: new Date(minDate),
    end: new Date(maxDate),
  };
}

export function getUniqueCategories(expenses: Expense[]): string[] {
  const categories = new Set(expenses.map((e) => e.category));
  return Array.from(categories).sort();
}

export function getTotalAmount(expenses: Expense[]): number {
  return expenses.reduce((sum, e) => sum + e.amount, 0);
}
