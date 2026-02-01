# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SpendingsWeb is a personal finance/spending tracking web application. The project is in its initial setup phase — no framework, build system, or source code has been established yet.

## Current State

The repository contains only:
- **Spendings Export.csv** — Sample spending data (semicolon-delimited) with columns: `Date` (DD/MM/YYYY), `Category`, `Label`, `Amount`
- **.idea/** — IntelliJ IDEA project configuration

## Data Format

The CSV uses semicolons as delimiters and includes these spending categories:
- **Variable** — Day-to-day expenses
- **Salaire** — Salary income
- **Economies** — Savings/investments
- **Cpt Joint** — Joint account contributions
- **LMNP** — Rental property management
- **Subscriptions** — Amazon, Sport, Téléphone, Navigo, Spotify, Loto, Adyen

Amounts are signed: negative for expenses, positive for income/refunds.

## Notes

- No version control (git) is initialized yet
- No build, test, or lint commands are available
- The project is opened in IntelliJ IDEA
