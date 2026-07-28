# FlyRank AI - Frontend AI Engineering Track Internship Capstone

> A web application built as the capstone project for the Frontend AI Engineering Track Internship at FlyRank AI.

## Overview

This repository hosts the capstone project for the Frontend AI Engineering Track Internship at FlyRank AI. The project focuses on building a modern web application integrating AI capabilities, real-time data handling, and responsive user interfaces.

### Key Features

- AI Capabilities: Integration with artificial intelligence services and streaming responses.
- Dynamic Web UI: Modern component-driven interface built with Next.js and TailwindCSS.
- Database and Auth: Data persistence and user authentication powered by Supabase.
- Clean Architecture: Modular design separating UI components, custom hooks, and utility functions.

## Tech Stack and Tools

- Framework: Next.js (App Router) / React
- Database: Supabase
- Styling: TailwindCSS, [daisyUI](https://daisyui.com/)
- Languages: JavaScript (JSX)
- Package Manager: PNPM
- AI Tools: Antigravity CLI, Claude

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

---

## Project Tree

```
├── app/
│   ├── (home)/
│   │   └── home/
│   │       ├── _components/     # route-local UI components
│   │       │   └── component.jsx
│   │       ├── layout.jsx       # home layout boundary
│   │       └── page.jsx         # home entry point
│   ├── favicon.ico
│   ├── globals.css              # global styles
│   └── layout.jsx               # root application layout
├── components/                  # shared, reusable UI elements
│   └── ui/
│       ├── button.jsx
│       ├── card.jsx
│       └── input.jsx
├── lib/                         # shared utilities, hooks, and helpers
│   ├── hooks/                   # custom application React hooks
│   └── utils/                   # helper functions
├── AGENTS.md                    # code styles, commit rules, and conventions
├── next.config.js
├── package.json
└── tailwind.config.js
```

---

## Code Style and Conventions

This repository follows Conventional Commits for git commit messages. For detailed guidelines on coding practices, naming conventions, and workflow rules, please review [AGENTS.md](AGENTS.md).
