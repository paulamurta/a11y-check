export function hasMissingAlt(element: Element): boolean {
  if (element.tagName.toLowerCase() !== "img") {
    return false;
  }

  if (!element.hasAttribute("alt")) {
    return true;
  }

  return (element.getAttribute("alt") ?? "").trim() === "";
}
