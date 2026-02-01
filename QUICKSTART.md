# Quick Start Guide

Get SpendingsWeb Phase 1 up and running in 3 simple steps.

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

## Installation & Running

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including React, TypeScript, Vite, Tailwind CSS, and PapaParse.

### 2. Start Development Server

```bash
npm run dev
```

The application will be available at: **http://localhost:5173**

### 3. Load Your Data

1. Open http://localhost:5173 in your browser
2. Click the **"Load CSV Data"** button
3. View your expense summary!

## That's It!

Your data is automatically loaded from `public/data/Spendings Export.csv` and saved to LocalStorage for future visits.

## Additional Commands

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

### Type Check

```bash
npx tsc --noEmit
```

## Using Your Own Data

The app includes `sample-data.csv` for demonstration. To use your own data:

1. Place your CSV file in `public/data/`
2. Update the file path in `src/context/ExpenseContext.tsx` (line 51):
   ```typescript
   const result = await parseCSVFile('/data/YOUR_FILENAME.csv');
   ```
3. Ensure your CSV follows this format:

```csv
Date;Category;Label;Amount
29/01/2026;Variable;vinted pull;-15.25
28/01/2026;Salaire;Monthly salary;2500.00
```

Required:
- Delimiter: Semicolon (`;`)
- Date format: `DD/MM/YYYY`
- Columns: `Date`, `Category`, `Label`, `Amount`

## Troubleshooting

**Problem**: CSV doesn't load
- Check browser console for errors
- Verify CSV file is in `public/data/` folder
- Check CSV format matches requirements

**Problem**: Build fails
- Run `npm install` again
- Delete `node_modules` and run `npm install`
- Check Node.js version (should be v18+)

**Problem**: Data doesn't persist after refresh
- Check browser LocalStorage is enabled
- Check browser console for quota errors
- Try clearing browser data and reloading

## Next Steps

- See **README.md** for detailed documentation
- See **VERIFICATION.md** for testing checklist
- See **PHASE1_SUMMARY.md** for implementation details

## Support

For issues or questions, please check the documentation files or create an issue in the project repository.

---

**Enjoy tracking your expenses!** 💰
