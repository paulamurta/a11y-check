import { getAccessibleName } from "../utils/accessibleName.js";

export function isButtonElement(element: Element): boolean {
  const tag = element.tagName.toLowerCase();

  return tag === "button" || element.getAttribute("role") === "button";
}

export function hasMissingAccessibleName(
  element: Element,
  document: Document,
): boolean {
  if (!isButtonElement(element)) {
    return false;
  }

  if (element.getAttribute("aria-hidden") === "true") {
    return false;
  }

  return getAccessibleName(element, document).length === 0;
}
