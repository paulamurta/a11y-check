function resolveAssociatedLabel(
  element: Element,
  document: Document,
): string {
  const id = element.getAttribute("id");

  if (id) {
    for (const label of document.querySelectorAll("label[for]")) {
      if (label.getAttribute("for") === id) {
        return label.textContent?.trim() ?? "";
      }
    }
  }

  const wrappingLabel = element.closest("label");

  if (wrappingLabel) {
    return wrappingLabel.textContent?.trim() ?? "";
  }

  return "";
}

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

  const associatedLabel = resolveAssociatedLabel(element, document);

  if (associatedLabel) {
    return associatedLabel;
  }

  const title = element.getAttribute("title")?.trim();

  if (title) {
    return title;
  }

  return element.textContent?.trim() ?? "";
}
