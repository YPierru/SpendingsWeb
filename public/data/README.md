# CSV Data Directory

This directory contains CSV files for the SpendingsWeb application.

## Files

### `sample-data.csv`
Demo data included in the repository. Contains fictional expense data for demonstration purposes.

### Your Personal Data
You can add your own CSV files here (e.g., `Spendings Export.csv`).

**Important**: Personal CSV files are automatically excluded from git by `.gitignore` to keep your financial data private.

## CSV Format

Your CSV files must follow this format:
- **Delimiter**: Semicolon (`;`)
- **Date Format**: DD/MM/YYYY
- **Columns**: Date, Category, Label, Amount

Example:
```csv
Date;Category;Label;Amount
15/01/2026;Salaire;Monthly Salary;2500.00
14/01/2026;Variable;Grocery Store;-45.50
```

## Using Your Own Data

1. Place your CSV file in this directory
2. Update the file path in `src/context/ExpenseContext.tsx`
3. Reload the application
