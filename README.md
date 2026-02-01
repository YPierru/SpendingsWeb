# SpendingsWeb

Personal finance and spending tracking web application built with React, TypeScript, and Vite.

## Current Status: Phase 1 - CSV Loading Infrastructure

This project is currently in Phase 1, focusing on the foundational CSV loading and data processing infrastructure.

## Features (Phase 1)

- ✅ CSV file parsing with French format support (semicolon delimiter, DD/MM/YYYY dates)
- ✅ Data validation and error reporting
- ✅ LocalStorage persistence
- ✅ Data summary dashboard showing:
  - Total records count
  - Date range
  - Category breakdown
  - Income vs. Expenses
  - Total amounts

## Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **CSV Parsing**: PapaParse
- **Charts**: Recharts (ready for Phase 2)

## Project Structure

```
/
├── public/
│   └── data/
│       └── Spendings Export.csv    # Sample spending data
├── src/
│   ├── components/
│   │   └── data/
│   │       ├── CSVLoader.tsx       # CSV loading UI
│   │       └── DataSummary.tsx     # Data summary display
│   ├── context/
│   │   └── ExpenseContext.tsx      # Global state management
│   ├── types/
│   │   └── expense.types.ts        # TypeScript interfaces
│   ├── utils/
│   │   ├── csvParser.ts            # CSV parsing logic
│   │   ├── dataProcessing.ts       # Data calculations
│   │   ├── localStorage.ts         # LocalStorage utilities
│   │   └── validators.ts           # Data validation
│   ├── App.tsx                     # Main app component
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Global styles
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173/`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## CSV Data Format

The application expects CSV files with the following format:

- **Delimiter**: Semicolon (`;`)
- **Date Format**: DD/MM/YYYY (e.g., `29/01/2026`)
- **Amount Format**: Decimal with period or comma (e.g., `-15.25` or `-15,25`)
- **Required Columns**:
  - `Date` - Transaction date
  - `Category` - Expense category
  - `Label` - Transaction description
  - `Amount` - Transaction amount (negative for expenses, positive for income)

### Example CSV

```csv
Date;Category;Label;Amount
29/01/2026;Variable;vinted pull;-15.25
28/01/2026;Salaire;Monthly salary;2500.00
28/01/2026;Variable;franprix;-5.08
```

## Categories

The following categories are supported (from the sample data):

- **Variable** - Day-to-day expenses
- **Salaire** - Salary income
- **Economies** - Savings/investments
- **Cpt Joint** - Joint account contributions
- **LMNP** - Rental property management
- **Subscriptions** - Amazon, Sport, Téléphone, Navigo, Spotify, Loto, Adyen

## Usage

### Using the Demo Data

1. The app comes with sample data in `public/data/sample-data.csv`
2. Click "Load CSV Data" button in the application
3. View the data summary with statistics and category breakdown
4. Data is automatically saved to LocalStorage for persistence
5. Use "Clear Data" to remove all data and start fresh

### Using Your Own Data

1. Place your CSV file in the `public/data/` folder (e.g., `Spendings Export.csv`)
2. Update the file path in `src/context/ExpenseContext.tsx` (line 51):
   ```typescript
   const result = await parseCSVFile('/data/YOUR_FILENAME.csv');
   ```
3. Your personal CSV files are automatically ignored by git (add them to `.gitignore` if needed)

## Error Handling

The application provides detailed error messages for:

- Invalid date formats
- Invalid amount values
- Missing required columns
- Empty or malformed CSV files
- Row-level parsing errors with specific line numbers

## Next Steps (Future Phases)

- Phase 2: Basic visualizations (charts and graphs)
- Phase 3: Filtering and search capabilities
- Phase 4: Advanced analytics and insights

## License

ISC
