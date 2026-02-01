# Personal Expense Tracking Application - Development Plan

## Project Overview
Build a web-based personal expense tracking application that reads expense data from CSV files and visualizes spending patterns through interactive charts and analytics. No data entry functionality - purely visualization and analysis of existing data.

## Tech Stack
- Frontend: React with TypeScript
- Charting: Recharts (for React-native data visualizations)
- Styling: Tailwind CSS
- State Management: React Context API or simple useState
- CSV Parsing: PapaParse or csv-parser
- Build Tool: Vite

## Core Features to Implement

### 1. Data Model
- Expected CSV format: read the csv file at the root of the project.
- Expense object structure after parsing:
  - id (auto-generated from row index)
  - amount (number)
  - category (string: food, transport, entertainment, housing, utilities, shopping, health, other)
  - description (string)
  - date (parsed timestamp)
  - paymentMethod (optional: cash, card, transfer)

### 2. CSV Data Loading
- No File upload component, read it directly from the csv file placed in a dedicated folder
- Support for multiple CSV files (combine data from all)
- CSV validation and error handling:
  - Check for required columns
  - Validate date formats
  - Validate numeric amounts
  - Show parsing errors with line numbers
- Display loaded data summary (total records, date range, categories found)
- Option to clear/reload data
- Persist loaded data in LocalStorage (so user doesn't need to re-upload every time)

### 4. Dashboard with Key Visualizations

#### Essential Charts:
1. **Pie/Donut Chart**: Expense breakdown by category (current month)
2. **Line Chart**: Daily spending trend over the last 30 days
3. **Bar Chart**: Monthly comparison (last 6-12 months)
4. **KPI Cards** at top:
   - Total spent this month
   - Average daily spending
   - Largest expense this month
   - Number of transactions
   - Most expensive category

#### Additional Visualizations:
5. **Stacked Bar Chart**: Daily expenses by category (last 30 days)
6. **Calendar Heatmap**: Spending intensity by day (last 3 months)
7. **Category Trend Lines**: How each category spending changes over time

### 5. Analytics Features

Implement the following analyses:
- **Category Insights**: 
  - Percentage and total for each category
  - Average transaction size per category
  - Transaction frequency per category
- **Spending Patterns**: 
  - Day of week analysis (which days you spend most)
  - Time-based patterns if timestamp available
  - Identify spending spikes
- **Trend Analysis**: 
  - Month-over-month growth/decline
  - Compare current month to average of last 3/6/12 months
  - Year-over-year comparison
- **Recurring Expenses Detection**: 
  - Identify similar amounts that repeat monthly
  - Group potential subscriptions/fixed costs
- **Monthly Projection**: 
  - Estimate end-of-month total based on current pace
  - Show "on track" vs "over budget" indicator

### 6. Filtering and Date Range Selection
- Date range picker (last 7 days, 30 days, 3 months, 6 months, year, all time, custom range)
- Category filter (multi-select)
- Amount range filter (min-max slider)
- Search by description (text search)
- Payment method filter
- Save favorite filter combinations

### 7. Data Export and Reports
- Export filtered data as CSV
- Export charts as images (PNG)
- Generate summary report (PDF or printable HTML)
- Export analytics insights as JSON

## Project Structure
```
/expense-tracker
  /src
    /components
      /data
        - CSVUploader.tsx
        - DataSummary.tsx
        - DataValidator.tsx
      /dashboard
        - KPICards.tsx
        - CategoryPieChart.tsx
        - TrendLineChart.tsx
        - MonthlyBarChart.tsx
        - CalendarHeatmap.tsx
        - StackedBarChart.tsx
      /analytics
        - SpendingPatterns.tsx
        - CategoryInsights.tsx
        - TrendAnalysis.tsx
        - RecurringExpenses.tsx
      /common
        - DateRangePicker.tsx
        - CategoryFilter.tsx
        - AmountRangeSlider.tsx
        - SearchBar.tsx
      /export
        - ExportButtons.tsx
        - ReportGenerator.tsx
    /context
      - ExpenseContext.tsx
    /utils
      - csvParser.ts
      - dataProcessing.ts
      - calculations.ts
      - localStorage.ts
      - dateUtils.ts
      - validators.ts
    /types
      - expense.types.ts
    App.tsx
    main.tsx
  /data (example folder for CSV files)
    - expenses_january.csv
    - expenses_february.csv
    - README.md (CSV format specification)
```

## Implementation Phases

### Phase 1: CSV Loading Infrastructure
1. Set up React + Vite project with TypeScript
2. Create basic data model and types
3. Integrate PapaParse for CSV parsing
4. Build CSV uploader component (drag & drop)
5. Implement data validation logic
6. Create LocalStorage utilities for persistence
7. Build data summary component showing loaded data stats

### Phase 2: Core Visualizations
1. Integrate Recharts
2. Process parsed data into chart-ready format
3. Implement KPI cards
4. Create pie chart for category breakdown
5. Build line chart for daily trends
6. Add bar chart for monthly comparison
7. Make all charts responsive

### Phase 3: Analytics
1. Implement category insights calculations
2. Add spending pattern detection (day of week analysis)
3. Create trend analysis comparing periods
4. Build monthly projection feature
5. Add recurring expense detection algorithm
6. Create dedicated analytics views

### Phase 4: Filtering System
1. Implement date range picker
2. Add category multi-select filter
3. Create amount range slider
4. Build text search functionality
5. Add payment method filter
6. Make all filters work together
7. Persist filter state

### Phase 5: Advanced Visualizations
1. Calendar heatmap visualization
2. Stacked bar chart by category
3. Category trend lines over time
4. Interactive tooltips with detailed info
5. Zoom and pan capabilities for time-series charts

### Phase 6: Export and Reporting
1. CSV export of filtered data
2. Chart export as images
3. Summary report generation
4. Print-friendly styles
5. Share/save filter configurations

### Phase 7: Polish
1. Responsive design for mobile
2. Dark mode support
3. Loading states during CSV parsing
4. Error handling and user feedback
5. Empty states with CSV upload instructions
6. Help/documentation section
7. Sample CSV files for demo

## Sample CSV Files
Include sample CSV files with realistic data:
- **expenses_2024_q1.csv**: 3 months of varied expenses
- **expenses_2024_q2.csv**: Another quarter
- **expenses_sample.csv**: Small file for testing (20-30 rows)
- Different categories, amounts, frequencies
- Some recurring patterns for detection testing

## CSV Format Specification
Use the CSV at the root of the project, this will be the format used.

## Key Considerations
- **CSV Flexibility**: Handle various date formats, optional columns, different delimiters
- **Performance**: Optimize for large CSV files (1000+ rows)
- **Data Quality**: Show warnings for anomalies (duplicate dates, unusual amounts)
- **Multi-file Support**: Merge data from multiple CSVs chronologically
- **Error Recovery**: Don't crash on malformed CSV, skip bad rows with warnings
- **Caching**: Cache processed data to avoid re-parsing on every render

## Success Criteria
- User can upload CSV and see visualizations in < 2 seconds
- Handles CSV files with 1000+ rows smoothly
- Clear error messages for CSV format issues
- All charts are interactive and responsive
- Data persists between browser sessions
- Works well on mobile and desktop browsers
- Filters update charts instantly
