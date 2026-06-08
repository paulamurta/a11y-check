function resolveLabelledBy(element: Element, document: Document): string {
  const labelledBy = element.getAttribute("aria-labelledby");

  if (!labelledBy) {
    return "";
  }

  return labelledBy
    .split(/\s+/)
    .map((id) => document.getElementById(id)?.textContent?.trim() ?? "")
    .filter(Boolean)
    .join(" ")
    .trim();
}

export function getAccessibleName(element: Element, document: Document): string {
  const ariaLabel = element.getAttribute("aria-label")?.trim();

  if (ariaLabel) {
    return ariaLabel;
  }

  const labelledBy = resolveLabelledBy(element, document);

  if (labelledBy) {
    return labelledBy;
  }

  const title = element.getAttribute("title")?.trim();

  if (title) {
    return title;
  }

  return element.textContent?.trim() ?? "";
}
