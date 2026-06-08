import { getAccessibleName } from "../utils/accessibleName.js";

export function isButtonElement(element: Element): boolean {
  const tag = element.tagName.toLowerCase();

  return tag === "button" || element.getAttribute("role") === "button";
}

export function isLinkElement(element: Element): boolean {
  return (
    element.tagName.toLowerCase() === "a" && element.hasAttribute("href")
  );
}

export function isFormControlElement(element: Element): boolean {
  const tag = element.tagName.toLowerCase();

  if (tag === "textarea" || tag === "select") {
    return true;
  }

  if (tag !== "input") {
    return false;
  }

  const type = (element.getAttribute("type") ?? "text").toLowerCase();

  return !["hidden", "submit", "reset", "button", "image"].includes(type);
}

export function hasMissingAccessibleName(
  element: Element,
  document: Document,
): boolean {
  if (
    !isButtonElement(element) &&
    !isLinkElement(element) &&
    !isFormControlElement(element)
  ) {
    return false;
  }

  if (element.getAttribute("aria-hidden") === "true") {
    return false;
  }

  return getAccessibleName(element, document).length === 0;
}
