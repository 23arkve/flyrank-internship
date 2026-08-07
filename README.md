# FlyRank AI Internship - Week 2: Round One

> Content Submission Studio built with Next.js (App Router), React, TypeScript, and TailwindCSS.

## Overview

This branch (`week2/round-one`) contains the implementation of **Content Submission Studio**, featuring a multi-field content submission form component (`TextContentForm`) with real-time validation, character limit tracking, accessible ARIA attributes, and interactive submission states.

## Branch Features

- **Text Content Form Component** (`src/components/content-form.tsx`):
  - **Title Field**: Required, 5 to 100 characters with character counter.
  - **Email Field**: Required, validates standard email format.
  - **Category Selector**: Required selection from pre-defined categories.
  - **Content Body Field**: Required, 20 to 1000 characters with character counter.
  - **Interactive States**: Blur-triggered error display, submit validation check, loading spinner, and post-submission detail view with reset option.

## Tech Stack

- **Framework**: Next.js 16 (App Router) / React 19
- **Styling**: TailwindCSS 4
- **Language**: TypeScript 5
- **Package Manager**: pnpm

## Quick Start

### 1. Install dependencies

```bash
pnpm install
```

### 2. Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view and interact with the form.

### 3. Build for production

```bash
pnpm build
pnpm start
```

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styling & TailwindCSS imports
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Home page rendering TextContentForm
└── components/
    └── content-form.tsx     # TextContentForm component with validation
```

## Code Style and Conventions

This repository follows Conventional Commits for git commit messages. For guidelines on coding practices, naming conventions, and workflow rules, please review [AGENTS.md](AGENTS.md).
