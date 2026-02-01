import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Expense, ParseError, DataSummary } from '../types/expense.types';
import { parseCSVFile } from '../utils/csvParser';
import { saveExpenses, loadExpenses, clearExpenses as clearStoredExpenses } from '../utils/localStorage';
import { calculateSummary } from '../utils/dataProcessing';

interface ExpenseContextType {
  expenses: Expense[];
  loading: boolean;
  errors: ParseError[];
  summary: DataSummary | null;
  loadFromCSV: () => Promise<void>;
  clearData: () => void;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function useExpenses() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
}

interface ExpenseProviderProps {
  children: ReactNode;
}

export function ExpenseProvider({ children }: ExpenseProviderProps) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ParseError[]>([]);
  const [summary, setSummary] = useState<DataSummary | null>(null);

  useEffect(() => {
    const storedExpenses = loadExpenses();
    if (storedExpenses && storedExpenses.length > 0) {
      setExpenses(storedExpenses);
      setSummary(calculateSummary(storedExpenses));
    }
  }, []);

  const loadFromCSV = async () => {
    setLoading(true);
    setErrors([]);

    try {
      const result = await parseCSVFile('/data/Spendings Export.csv');

      setExpenses(result.data);
      setErrors(result.errors);
      setSummary(result.summary);

      if (result.data.length > 0) {
        saveExpenses(result.data);
      }
    } catch (error) {
      setErrors([
        {
          row: 0,
          field: 'general',
          message: error instanceof Error ? error.message : 'Failed to load CSV',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearData = () => {
    setExpenses([]);
    setErrors([]);
    setSummary(null);
    clearStoredExpenses();
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        loading,
        errors,
        summary,
        loadFromCSV,
        clearData,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}
