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

## CLI output

The command prints three sections: capture status, a component-grouped report, and a short summary.

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

• Missing alt

  • <Button iconUrl={iconEdit} />
    src/App.tsx

────────────────────────────────────────────────

▸ Link
  src/components/Link/Link.tsx
  ...

2 component(s) · 6 issue(s)
```

Each component block shows the component name, its source file, how many instances failed, the rules that were violated, and a JSX-like description of each instance with the page file where it was rendered.

If everything passes, you get `✔ No accessibility issues found.` and exit code `0`. When issues are found, exit code is `1`.

In interactive terminals the output uses colors for readability. Set `NO_COLOR=1` to disable them.

## Documentation

- [Sample React App README](packages/sample-react-app/README.md)
- [CLI README](packages/cli/README.md)

## Status

The CLI captures the rendered DOM, runs basic accessibility rules (missing accessible name on buttons, missing `alt` on images), and prints a report grouped by component.
