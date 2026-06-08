export function getInvalidAriaReferenceIds(
  attributeValue: string | null,
  document: Document,
): string[] {
  if (!attributeValue?.trim()) {
    return [];
  }

  return attributeValue
    .trim()
    .split(/\s+/)
    .filter((id) => !document.getElementById(id));
}

export function hasInvalidAriaLabelledby(
  element: Element,
  document: Document,
): boolean {
  return (
    getInvalidAriaReferenceIds(
      element.getAttribute("aria-labelledby"),
      document,
    ).length > 0
  );
}

export function hasInvalidAriaDescribedby(
  element: Element,
  document: Document,
): boolean {
  return (
    getInvalidAriaReferenceIds(
      element.getAttribute("aria-describedby"),
      document,
    ).length > 0
  );
}
