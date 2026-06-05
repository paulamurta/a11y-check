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
Application found.
Capturing DOM...
DOM captured successfully.
```

## How it works

1. Playwright opens `http://localhost:5173`
2. Waits for the page to finish rendering
3. Captures the DOM with `page.content()`

Analysis is performed on the **rendered DOM**, not on static TSX source code.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run a11y-check` | Capture the rendered DOM from the running app |

## Tech stack

- TypeScript
- Playwright
- tsx

## Roadmap

- Parse DOM with JSDOM
- Map elements to components via `data-component` and `data-source-file`
- Run accessibility rules (e.g. missing accessible names, missing `alt`)
- Print a report grouped by component
