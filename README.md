# Accessibility CLI

Tooling for **Shift-Left Testing** and automated accessibility validation in reusable React components.

This repository contains two independent packages:

| Package | Path | Purpose |
|---------|------|---------|
| **Sample React App** | [`packages/sample-react-app`](packages/sample-react-app) | React + Vite demo app with accessible and inaccessible component examples |
| **CLI** | [`packages/cli`](packages/cli) | TypeScript CLI that captures the rendered DOM and reports accessibility issues by component |

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

✖ Instances with error: 2
✖ Distinct issues: 3

[button-icon-only] <Button iconUrl={iconEdit} />
  src/App.tsx
  Problems:
  • Missing accessible name — Add a visible label, aria-label, or aria-labelledby
  • Missing or generic alt — Use a descriptive alt attribute

────────────────────────────────────────────────

▸ Input
  src/components/Input/Input.tsx
  ...

────────────────────────────────────────────────

Summary

✖ 4 component(s) with issues
✖ 12 distinct issue(s)

────────────────────────────────────────────────
```

Each component block shows:

- the component name and source file
- how many instances have errors and how many distinct issues were found
- each affected instance with its `id`, JSX-like description, usage file, and list of problems

If everything passes, the **Summary** block shows `✔ No accessibility issues found.` and exit code `0`. When issues are found, exit code is `1`.

In interactive terminals the output uses colors for readability. Set `NO_COLOR=1` to disable them.

## Accessibility rules

The CLI analyzes the **rendered DOM** (not static TSX) and currently checks:

| Rule | What it detects |
|------|-----------------|
| Missing accessible name | Buttons, links, and form controls without a label, `aria-label`, or valid `aria-labelledby` |
| Missing or generic alt | Images with missing, empty, or generic `alt` text |
| Duplicate id | The same `id` used more than once in the document |
| Invalid aria-labelledby | `aria-labelledby` pointing to ids that do not exist |
| Invalid aria-describedby | `aria-describedby` pointing to ids that do not exist |

Issues are attributed to components through `data-component`, `data-source-file`, and `id` markers in the sample app.

## Documentation

- [Sample React App README](packages/sample-react-app/README.md)
- [CLI README](packages/cli/README.md)
