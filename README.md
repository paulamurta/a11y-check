# Accessibility CLI

Tooling for **Shift-Left Testing** and automated accessibility validation in reusable React components.

This repository contains two independent packages:

| Package | Path | Purpose |
|---------|------|---------|
| **Sample React App** | [`packages/sample-react-app`](packages/sample-react-app) | React + Vite demo app with accessible and inaccessible component examples |
| **CLI** | [`packages/cli`](packages/cli) | TypeScript CLI that captures the rendered DOM and will run accessibility checks |

Each package has its own `package.json` and is installed and run separately.

## Quick start

1. Start the sample app:

```bash
cd packages/sample-react-app
npm install
npm run dev
```

2. In another terminal, run the CLI:

```bash
cd packages/cli
npm install
npx playwright install chromium
npm run a11y-check
```

The CLI expects the app at `http://localhost:5173`.

## Documentation

- [Sample React App README](packages/sample-react-app/README.md)
- [CLI README](packages/cli/README.md)

## Status

The CLI captures the rendered DOM, runs basic accessibility rules (missing accessible name on buttons, missing `alt` on images), and prints a report grouped by component.
