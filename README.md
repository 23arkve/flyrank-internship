# FlyRank AI - Frontend AI Engineering Track Internship Capstone

> This repository is for the capstone project in the Frontend AI Engineering Track Internship.

## Tech Stack and Tools

- Framework: Next.js / React
- Database: Supabase
- Styling: TailwindCSS, [daisyUI](https://daisyui.com/)
- Languages: JavaScript
- Package Manager: PNPM
- AI Tools: Antigravity CLI, Claude

## Getting started

1. **Clone the repository:**

    ```bash
    git clone https://github.com
    cd your-repo-name
    ```

2. **Install dependencies:**

    ```bash
    pnpm install
    ```

3. **Set up environment variables:**
   Copy the example environment file to create your local configurations.

    ```bash
    cp .env.example .env.local
    ```

4. **Run the development server:**
    ```bash
    pnpm dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Tree

```
├── app/
│   ├── (home)/
│   │   └── home/
│   │       ├── _components/     # route-local UI components
│   │       │   └── component.tsx
│   │       ├── layout.tsx       # home layout boundary
│   │       └── page.tsx         # home entry point
│   ├── favicon.ico
│   ├── globals.css              # global styles
│   └── layout.tsx               # root application layout
├── components/                  # shared, reusable UI elements
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       └── input.tsx
├── lib/                         # shared utilities, hooks, and types
│   ├── hooks/                   # custom application React hooks
│   └── utils/                   # helper functions
├── AGENTS.md                    # code styles, naming rules, and
│                                strict conventions
├── next.config.js
├── package.json
└── tailwind.config.js
```
