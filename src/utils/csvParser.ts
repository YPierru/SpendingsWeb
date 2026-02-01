import Papa from 'papaparse';
import { Expense, ParseError, ParseResult } from '../types/expense.types';
import { validateDate, validateAmount, validateCategory, validateCSVStructure } from './validators';
import { calculateSummary } from './dataProcessing';

export async function parseCSVFile(file: string): Promise<ParseResult> {
  const errors: ParseError[] = [];
  const expenses: Expense[] = [];

  try {
    const response = await fetch(file);
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV file: ${response.statusText}`);
    }

    const csvText = await response.text();

    const parseResult = Papa.parse(csvText, {
      header: true,
      delimiter: ';',
      skipEmptyLines: true,
      transformHeader: (header: string) => header.trim(),
    });

    if (parseResult.errors.length > 0) {
      parseResult.errors.forEach((error) => {
        errors.push({
          row: error.row || 0,
          field: 'parse',
          message: error.message,
        });
      });
    }

    const structureErrors = validateCSVStructure(parseResult.data);
    if (structureErrors.length > 0) {
      structureErrors.forEach((error) => {
        errors.push({
          row: 0,
          field: 'structure',
          message: error,
        });
      });
      return {
        data: [],
        errors,
        summary: null,
      };
    }

    parseResult.data.forEach((row: any, index: number) => {
      const rowNumber = index + 2;

      const date = validateDate(row.Date);
      if (!date) {
        errors.push({
          row: rowNumber,
          field: 'Date',
          message: `Cannot parse date '${row.Date}'`,
        });
        return;
      }

      if (!validateCategory(row.Category)) {
        errors.push({
          row: rowNumber,
          field: 'Category',
          message: 'Category is required',
        });
        return;
      }

      if (!row.Label || typeof row.Label !== 'string' || row.Label.trim().length === 0) {
        errors.push({
          row: rowNumber,
          field: 'Label',
          message: 'Label is required',
        });
        return;
      }

      const amount = validateAmount(row.Amount);
      if (amount === null) {
        errors.push({
          row: rowNumber,
          field: 'Amount',
          message: `Invalid amount '${row.Amount}'`,
        });
        return;
      }

      expenses.push({
        id: `${date.getTime()}-${index}`,
        date,
        category: row.Category.trim(),
        label: row.Label.trim(),
        amount,
        originalRow: rowNumber,
      });
    });

    const summary = expenses.length > 0 ? calculateSummary(expenses) : null;

    return {
      data: expenses,
      errors,
      summary,
    };
  } catch (error) {
    errors.push({
      row: 0,
      field: 'file',
      message: error instanceof Error ? error.message : 'Unknown error occurred',
    });

    return {
      data: [],
      errors,
      summary: null,
    };
  }
}
