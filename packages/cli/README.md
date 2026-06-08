# a11y-cli

TypeScript CLI for automated accessibility validation of rendered React components.

The tool opens the running application in a headless browser, captures the rendered HTML, runs accessibility rules, and prints a report grouped by component.

## Prerequisites

- Node.js 18+
- The sample app running at `http://localhost:5173`

## Setup

```bash
npm install
npx playwright install chromium
```

## Usage

Make sure the dev server is running in `packages/sample-react-app`, then:

```bash
npm run a11y-check
```

The command exits with code `1` when accessibility issues are found.

See the [root README](../../README.md#cli-output) for an example of the full terminal output.

## How it works

1. Playwright opens `http://localhost:5173` and captures the rendered HTML
2. JSDOM parses the HTML in Node.js
3. Accessibility rules run on the rendered DOM
4. Issues are grouped by `data-component` and `data-source-file`
5. A text report is printed to the terminal

Analysis is performed on the **rendered DOM**, not on static TSX source code.

## Rules

| Rule | Target | Condition |
|------|--------|-----------|
| Missing accessible name | `button`, `[role="button"]`, `a[href]`, `input`, `textarea`, `select` | No visible label, `aria-label`, or resolvable `aria-labelledby` |
| Missing or generic alt | `img` | `alt` missing, empty, or generic (e.g. `image`, `photo`, `avatar`) |
| Duplicate id | any element with `id` | The same `id` appears more than once in the document |
| Invalid aria-labelledby | any element with `aria-labelledby` | At least one referenced id does not exist in the document |
| Invalid aria-describedby | any element with `aria-describedby` | At least one referenced id does not exist in the document |

Only elements inside a `data-component` subtree are reported. The page root can expose `data-page-file` so the CLI can point to the file where an instance was rendered.

## Report format

Issues are grouped by **component**, then by **instance**, so you can fix one usage at a time.

For each component, the report shows:

- **Instances with error** — unique component instances with at least one issue
- **Distinct issues** — total number of violations (one instance can trigger multiple rules)

Each instance lists its HTML `id` when available, a JSX-like description, the usage file (usually `src/App.tsx`), and a **Problems** list with rule labels and hints.

A **Summary** block at the end highlights the total number of affected components and distinct issues.

## Project structure

```
src/
  capture/     # Playwright DOM capture
  analyze/     # JSDOM traversal and rule execution
  rules/       # Accessibility rules
  report/      # Grouping and terminal output
  utils/       # Component context, accessible name, ARIA helpers
  index.ts     # CLI entry point
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run a11y-check` | Capture the rendered DOM and print the accessibility report |

## Tech stack

- TypeScript
- Playwright
- JSDOM
- picocolors (terminal colors)
- ora (capture spinner)
- tsx

## Roadmap

- More accessibility rules (e.g. empty button, dedicated missing label)
- Optional `data-usage-line` for instance line numbers
- JSON output format
- CI/CD integration and comparison with Lighthouse
