import { Expense } from '../types/expense.types';

export interface TimeSeriesData {
  date: string;
  income: number;
  expenses: number;
  net: number;
}

export interface CategoryData {
  category: string;
  amount: number;
  count: number;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  net: number;
}

export function prepareTimeSeriesData(expenses: Expense[]): TimeSeriesData[] {
  const dailyMap = new Map<string, { income: number; expenses: number }>();

  expenses.forEach((expense) => {
    const dateKey = expense.date.toISOString().split('T')[0];
    const current = dailyMap.get(dateKey) || { income: 0, expenses: 0 };

    if (expense.amount > 0) {
      current.income += expense.amount;
    } else {
      current.expenses += Math.abs(expense.amount);
    }

    dailyMap.set(dateKey, current);
  });

  const sortedDates = Array.from(dailyMap.keys()).sort();

  return sortedDates.map((dateKey) => {
    const data = dailyMap.get(dateKey)!;
    return {
      date: new Date(dateKey).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
      }),
      income: parseFloat(data.income.toFixed(2)),
      expenses: parseFloat(data.expenses.toFixed(2)),
      net: parseFloat((data.income - data.expenses).toFixed(2)),
    };
  });
}

export function prepareCategoryData(expenses: Expense[]): CategoryData[] {
  const categoryMap = new Map<string, { amount: number; count: number }>();

  expenses.forEach((expense) => {
    const current = categoryMap.get(expense.category) || { amount: 0, count: 0 };
    current.amount += Math.abs(expense.amount);
    current.count += 1;
    categoryMap.set(expense.category, current);
  });

  return Array.from(categoryMap.entries())
    .map(([category, data]) => ({
      category,
      amount: parseFloat(data.amount.toFixed(2)),
      count: data.count,
    }))
    .sort((a, b) => b.amount - a.amount);
}

export function prepareMonthlyData(expenses: Expense[]): MonthlyData[] {
  const monthlyMap = new Map<string, { income: number; expenses: number }>();

  expenses.forEach((expense) => {
    const monthKey = expense.date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
    });

    const current = monthlyMap.get(monthKey) || { income: 0, expenses: 0 };

    if (expense.amount > 0) {
      current.income += expense.amount;
    } else {
      current.expenses += Math.abs(expense.amount);
    }

    monthlyMap.set(monthKey, current);
  });

  const sortedMonths = Array.from(monthlyMap.keys()).sort((a, b) => {
    const [monthA, yearA] = a.split('/');
    const [monthB, yearB] = b.split('/');
    return new Date(parseInt(yearA), parseInt(monthA) - 1).getTime() -
           new Date(parseInt(yearB), parseInt(monthB) - 1).getTime();
  });

  return sortedMonths.map((monthKey) => {
    const data = monthlyMap.get(monthKey)!;
    return {
      month: monthKey,
      income: parseFloat(data.income.toFixed(2)),
      expenses: parseFloat(data.expenses.toFixed(2)),
      net: parseFloat((data.income - data.expenses).toFixed(2)),
    };
  });
}

export function prepareIncomeVsExpenses(expenses: Expense[]): {
  income: number;
  expenses: number;
} {
  let income = 0;
  let expensesTotal = 0;

  expenses.forEach((expense) => {
    if (expense.amount > 0) {
      income += expense.amount;
    } else {
      expensesTotal += Math.abs(expense.amount);
    }
  });

  return {
    income: parseFloat(income.toFixed(2)),
    expenses: parseFloat(expensesTotal.toFixed(2)),
  };
}
