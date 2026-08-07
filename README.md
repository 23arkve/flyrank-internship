# FlyRank AI - Frontend AI Engineering Track Internship Capstone

> A web application built as the capstone project for the Frontend AI Engineering Track Internship at FlyRank AI.

## Overview

This repository hosts the capstone project for the Frontend AI Engineering Track Internship at FlyRank AI. The specific project scope, goals, and requirements will be defined during the internship track.

### Planned Features

- Scope TBD: Detailed project specifications and AI features will be documented here once finalized.
- Modern Web UI: Component-driven interface built with Next.js, React, and TailwindCSS.
- Backend and Database: Data persistence and authentication powered by Supabase.

## Tech Stack and Tools

- Framework: Next.js (App Router) / React
- Database: Prisma
- Styling: TailwindCSS, [daisyUI](https://daisyui.com/)
- Languages: TypeScript
- Package Manager: PNPM
- AI Tools: Claude, Antigravity CLI, Cursor, OpenCode

## Getting Started

### Prerequisites

Ensure you have Node.js (v18 or higher) and PNPM installed on your system.

### 1. Clone the repository

```bash
git clone https://github.com/your-username/flyrank-internship.git
cd flyrank-internship
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Copy the example environment configuration file to `.env.local`:

```bash
cp .env.example .env.local
```

Ensure your `.env.local` contains the required keys:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
# Add additional AI API keys here
```

### 4. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 5. Production build

```bash
pnpm build
pnpm start
```

## Code Style and Conventions

This repository follows Conventional Commits for git commit messages. For detailed guidelines on coding practices, naming conventions, and workflow rules, please review [AGENTS.md](AGENTS.md).
