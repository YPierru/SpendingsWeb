export interface Expense {
  id: string;
  date: Date;
  category: string;
  label: string;
  amount: number;
  originalRow: number;
}

export interface ParseError {
  row: number;
  field: string;
  message: string;
}

export interface DataSummary {
  totalRecords: number;
  dateRange: { start: Date; end: Date } | null;
  categories: string[];
  totalAmount: number;
  positiveAmount: number;
  negativeAmount: number;
  categoryCounts: Record<string, number>;
}

export interface ParseResult {
  data: Expense[];
  errors: ParseError[];
  summary: DataSummary | null;
}
