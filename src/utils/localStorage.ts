import { Expense } from '../types/expense.types';

const STORAGE_KEY = 'spendingsweb_expenses';

export function saveExpenses(expenses: Expense[]): void {
  try {
    const serialized = JSON.stringify(expenses, (key, value) => {
      if (key === 'date' && value instanceof Date) {
        return value.toISOString();
      }
      return value;
    });
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (error) {
    if (error instanceof Error && error.name === 'QuotaExceededError') {
      console.error('LocalStorage quota exceeded');
      throw new Error('Storage quota exceeded. Please clear some data.');
    }
    throw error;
  }
}

export function loadExpenses(): Expense[] | null {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (!serialized) return null;

    const parsed = JSON.parse(serialized);

    return parsed.map((expense: any) => ({
      ...expense,
      date: new Date(expense.date),
    }));
  } catch (error) {
    console.error('Failed to load expenses from localStorage:', error);
    return null;
  }
}

export function clearExpenses(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear expenses from localStorage:', error);
  }
}
