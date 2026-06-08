import { normalizeSourceFile } from "./normalizeSourceFile.js";

export type ComponentContext = {
  root: Element;
  name: string;
  sourceFile: string;
};

export function findComponentRoot(element: Element): Element | null {
  let current: Element | null = element;

  while (current) {
    if (current.hasAttribute("data-component")) {
      return current;
    }

    current = current.parentElement;
  }

  return null;
}

export function getComponentContext(element: Element): ComponentContext | null {
  const root = findComponentRoot(element);

  if (!root) {
    return null;
  }

  const name = root.getAttribute("data-component");

  if (!name) {
    return null;
  }

  return {
    root,
    name,
    sourceFile: normalizeSourceFile(
      root.getAttribute("data-source-file") ?? "",
    ),
  };
}

export function findUsageFile(componentRoot: Element): string | null {
  let current = componentRoot.parentElement;

  while (current) {
    const pageFile = current.getAttribute("data-page-file");

    if (pageFile) {
      return normalizeSourceFile(pageFile);
    }

    current = current.parentElement;
  }

  return null;
}
