export function hasMissingAlt(element: Element): boolean {
  if (element.tagName.toLowerCase() !== "img") {
    return false;
  }

  if (!element.hasAttribute("alt")) {
    return true;
  }

  const alt = (element.getAttribute("alt") ?? "").trim();

  if (alt === "") {
    return true;
  }

  return isGenericAlt(alt);
}

const GENERIC_ALT_TEXT = new Set([
  "image",
  "img",
  "photo",
  "picture",
  "avatar",
]);

function isGenericAlt(alt: string): boolean {
  return GENERIC_ALT_TEXT.has(alt.trim().toLowerCase());
}
