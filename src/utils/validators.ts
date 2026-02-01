export function validateDate(dateStr: string): Date | null {
  if (!dateStr || typeof dateStr !== 'string') return null;

  const parts = dateStr.trim().split('/');
  if (parts.length !== 3) return null;

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
  if (day < 1 || day > 31) return null;
  if (month < 1 || month > 12) return null;
  if (year < 1900 || year > 2100) return null;

  const date = new Date(year, month - 1, day);

  if (
    date.getDate() !== day ||
    date.getMonth() !== month - 1 ||
    date.getFullYear() !== year
  ) {
    return null;
  }

  return date;
}

export function validateAmount(amountStr: string): number | null {
  if (!amountStr || typeof amountStr !== 'string') return null;

  const normalized = amountStr.trim().replace(',', '.');
  const amount = parseFloat(normalized);

  if (isNaN(amount)) return null;

  return amount;
}

export function validateCategory(category: string): boolean {
  return typeof category === 'string' && category.trim().length > 0;
}

export function validateCSVStructure(rows: any[]): string[] {
  const errors: string[] = [];

  if (!rows || rows.length === 0) {
    errors.push('CSV file is empty');
    return errors;
  }

  const firstRow = rows[0];
  const requiredColumns = ['Date', 'Category', 'Label', 'Amount'];

  for (const column of requiredColumns) {
    if (!(column in firstRow)) {
      errors.push(`Missing required column: ${column}`);
    }
  }

  return errors;
}
