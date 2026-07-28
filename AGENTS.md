# AGENTS.md instructions

Global working agreements for Antigravity CLI.

## General guide for this repo

### Editing files

- Make the smallest safe change that solves the issue.
- Preserve existing style and conventions.
- Prefer patch-style edits (small, reviewable diffs) over full-file rewrites.
- After making changes, run the project’s standard checks when feasible (format/lint, unit tests, build/typecheck).

### Reading project documents (PDFs, uploads, long text, CSVs, etc)

- Read the full document first.
- Draft the output.
- If paraphrasing is required, label it explicitly as a paraphrase.

### Secrets and sensitive data

- Never print secrets (tokens, private keys, credentials) to terminal output.
- Do not request users paste secrets.

## Development and Build commands

- Install the dependencies:

    ```bash
    pnpm install
    ```

- Run the development server:

    ```bash
    pnpm dev
    ```

- Production build:
    ```bash
    pnpm build
    ```

## Baseline workflow

- Start every task by determining:
    1. Goal + acceptance criteria.
    2. Constraints (time, safety, scope).
    3. What must be inspected (files, commands, tests, docs).
    4. If requirements are ambiguous, ask targeted clarifying questions before making irreversible changes.

## Tech Stack

- Next.js, React, JavaScript, Tailwind CSS, Supabase, PNPM Package Manager

## Code style guidelines & conventions

### Git commits

- Strictly follow the Conventional Commits specifications. The commit message should be structured as follows:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

- It should be in lowercase, in present tense.

#### Some specifications:

- `feat`: new feature or capability.
- `fix`: bug repair or resolution.
- `docs`: documentation updates only.
- `style`: formatting, missing semi-colons (no production code changes).
- `refactor`: code change that neither fixes a bug nor adds a feature.
- `perf`: code change that improves performance.
- `test`: adding missing tests or correcting existing tests.
- `chore`: updates to build process, auxiliary tools, or libraries.

#### Examples:

_Commit message with description and breaking change footer_

```
feat: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```

_Commit message with no body_

```
docs: correct spelling of CHANGELOG
```

_Commit message with scope_

```
feat(lang): add Polish language
```

## Typography & Formatting

- Use explicit types or interfaces; never rely on `any`.
- Write clear, self-documenting naming schemes over inline comments.
- Apply structural early returns to eliminate nested `if` statements.
- Format all code strictly with project linting tools before committing.
