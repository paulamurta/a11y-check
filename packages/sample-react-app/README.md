# Sample React App

Demo React application used as the target for accessibility validation.

It showcases reusable components with both **accessible** and **inaccessible** implementations to support Shift-Left accessibility testing.

## Stack

- React 19
- TypeScript
- Vite
- Material UI (MUI)

## Setup

```bash
npm install
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the dev server at `http://localhost:5173` |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Components

| Component | Description |
|-----------|-------------|
| `Button` | Button with label, icon, and loading states |
| `Input` | Text field wrapper around MUI `TextField` |
| `Link` | Link with text, icon-only, or missing identification |
| `Avatar` | Profile photo with descriptive, missing, or generic alt text |

Some instances intentionally omit accessible labels or image `alt` text for testing purposes.

## Component markers

Reusable components expose metadata in the rendered DOM:

```tsx
data-component="Button"
data-source-file={import.meta.url}
id="button-save"
```

These attributes allow the CLI to attribute DOM issues back to the source component.

## Running with the CLI

1. Start this app: `npm run dev`
2. From `packages/cli`, run: `npm run a11y-check`
