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

## Demo sections

The app renders four component groups in `src/App.tsx`:

| Section | Valid examples | Intentional failures |
|---------|----------------|----------------------|
| **Buttons** | labeled button | icon-only button, disabled button without visible name |
| **Inputs** | labeled fields | invalid ARIA references, duplicate `id` |
| **Links** | text link | icon-only link, link without accessible name |
| **Avatars** | descriptive `alt` | missing `alt`, generic `alt` (`"image"`) |

## Components

| Component | Description |
|-----------|-------------|
| `Button` | Button with label, icon-only, and disabled states |
| `Input` | Text field wrapper around MUI `TextField` |
| `Link` | Link with text, icon-only, or missing identification |
| `Avatar` | Profile photo with descriptive, missing, or generic alt text |

## Component markers

Reusable components expose metadata in the rendered DOM:

```tsx
data-component="Button"
data-source-file={import.meta.url}
id="button-save"
```

The page root in `App.tsx` also sets `data-page-file={import.meta.url}` so the CLI can report where each instance was rendered.

These attributes allow the CLI to attribute DOM issues back to the source component and page file.

## Running with the CLI

1. Start this app: `npm run dev`
2. From `packages/cli`, run: `npm run a11y-check`

See the [CLI README](../cli/README.md) for the full list of rules and report format.
