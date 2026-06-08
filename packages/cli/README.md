# a11y-cli

TypeScript CLI for automated accessibility validation of rendered React components.

The tool opens the running application in a headless browser, captures the rendered HTML, and will eventually run accessibility rules grouped by component.

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

Expected output:

```
⠋ Capturing DOM from http://localhost:5173...
✓ Application found at localhost:5173
✔ DOM captured successfully.

▸ Button
  src/components/Button/Button.tsx

✖ 2 instance(s) with error

• Missing accessible name
  • <Button iconUrl={iconEdit} />
    src/App.tsx
...
2 component(s) · 6 issue(s)
```

See the [root README](../../README.md#cli-output) for an example of the full terminal output.

The command exits with code `1` when accessibility issues are found.

## How it works

1. Playwright opens `http://localhost:5173` and captures the rendered HTML
2. JSDOM parses the HTML in Node.js
3. Rules run on buttons and images in the rendered DOM
4. Issues are grouped by `data-component` and `data-source-file`
5. A text report is printed to the terminal

Analysis is performed on the **rendered DOM**, not on static TSX source code.

## Rules (v1)

| Rule | Target | Condition |
|------|--------|-----------|
| Missing accessible name | `button`, `[role="button"]`, `a[href]`, `input`, `textarea`, `select` | No visible label, `aria-label`, or `aria-labelledby` |
| Missing or generic alt | `img` | `alt` missing, empty, or generic (e.g. `image`, `photo`, `avatar`) |

## Project structure

```
src/
  capture/     # Playwright DOM capture
  analyze/     # JSDOM traversal and rule execution
  rules/       # Accessibility rules
  report/      # Grouping and terminal output
  utils/       # Component context, accessible name helpers
  index.ts     # CLI entry point
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run a11y-check` | Capture the rendered DOM from the running app |

## Tech stack

- TypeScript
- Playwright
- JSDOM
- picocolors (terminal colors)
- ora (capture spinner)
- tsx

## Roadmap

- Optional `data-usage-line` for instance line numbers
- Additional accessibility rules
- JSON output format
