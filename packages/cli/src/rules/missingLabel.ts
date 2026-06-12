import { hasAssociatedLabel } from "../utils/accessibleName.js";
import { isFormControlElement } from "./missingAccessibleName.js";

function hasValidAriaLabelledby(
  element: Element,
  document: Document,
): boolean {
  const labelledBy = element.getAttribute("aria-labelledby");

  if (!labelledBy?.trim()) {
    return false;
  }

  return labelledBy
    .split(/\s+/)
    .some((id) => document.getElementById(id)?.textContent?.trim());
}

export function hasMissingLabel(
  element: Element,
  document: Document,
): boolean {
  if (!isFormControlElement(element)) {
    return false;
  }

  if (element.getAttribute("aria-hidden") === "true") {
    return false;
  }

  if (element.getAttribute("aria-label")?.trim()) {
    return false;
  }

  if (hasValidAriaLabelledby(element, document)) {
    return false;
  }

  return !hasAssociatedLabel(element, document);
}
