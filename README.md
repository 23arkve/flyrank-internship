# FlyRank AI Internship - Week 2: Round Two

> Accessible `ContentInputForm` component built with Next.js (App Router), daisyUI styling, controlled React state, and Vitest test suite.

## Overview

This branch (`week2/round-two`) contains the implementation of the **`ContentInputForm`** Client Component (`src/components/ContentInputForm.tsx`) along with a full **Vitest + React Testing Library** test suite.

## Features

- **ContentInputForm Component** (`src/components/ContentInputForm.tsx`):
  - **daisyUI Styling**: Utilizes daisyUI classes (`textarea`, `textarea-bordered`, `textarea-error`, `btn`, `btn-primary`, `loading-spinner`).
  - **Validation Rules**: Required content check ("Content is required."), minimum 20 characters ("Minimum 20 characters (10/20)"), and maximum 5000 characters ("Maximum 5000 characters (5001/5000)").
  - **Blur & Submit Trigger**: Validation error messages appear only after the field is blurred or a submit is attempted (not on every keystroke).
  - **WCAG 2.1 AA Compliance**: Associated via `htmlFor`, dynamically linked via `aria-describedby`, declared with `aria-invalid`, and announced via `aria-live="polite"`.
  - **Submit & Loading State**: Submit button is disabled while invalid or submitting, displaying an inline daisyUI loading spinner during async submit calls.
- **Vitest & React Testing Library Setup**:
  - Configured test runner with `vitest.config.mts` and `vitest.setup.ts`.
  - Automated tests covering empty submit, 19 vs 20 vs 5000 vs 5001 character boundary cases, valid submission loading state, and ARIA linkages.

## Tech Stack

- **Framework**: Next.js 16 (App Router) / React 19
- **Styling**: TailwindCSS 4, daisyUI 5
- **Testing**: Vitest 4, React Testing Library, jsdom
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

Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the demo form on the home page.

### 3. Run unit tests

Run the Vitest unit test suite:

```bash
pnpm test
```

### 4. Build for production

```bash
pnpm build
pnpm start
```

## Project Structure

```
src/
├── app/
│   ├── globals.css                       # TailwindCSS & daisyUI configuration
│   ├── layout.tsx                        # Root layout component
│   └── page.tsx                          # Demo page for ContentInputForm
└── components/
    ├── ContentInputForm.tsx              # ContentInputForm Client Component
    └── __tests__/
        └── ContentInputForm.test.tsx    # Vitest unit test suite
vitest.config.mts                          # Vitest configuration
vitest.setup.ts                           # React Testing Library setup
```

## Component Usage

```tsx
'use client';

import { ContentInputForm } from '@/components/ContentInputForm';

export default function MyPage() {
  const handleSubmit = async (content: string) => {
    await fetch('/api/content', {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  };

  return (
    <ContentInputForm
      initialValue=""
      onSubmit={handleSubmit}
    />
  );
}
```

## Code Style and Conventions

This repository follows Conventional Commits for git commit messages. For detailed guidelines on coding practices, naming conventions, and workflow rules, please review [AGENTS.md](AGENTS.md).
