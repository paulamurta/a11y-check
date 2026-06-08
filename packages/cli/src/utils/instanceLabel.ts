function getVisibleText(element: Element): string {
  return Array.from(element.childNodes)
    .filter((node) => {
      if (node.nodeType === node.TEXT_NODE) {
        return true;
      }

      return node.nodeType === node.ELEMENT_NODE && node.nodeName !== "IMG";
    })
    .map((node) => node.textContent ?? "")
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

function describeButtonInstance(root: Element): string {
  const props: string[] = [];
  const button = root as HTMLButtonElement;

  if (button.disabled) {
    props.push("disabled");
  }

  if (root.querySelector("img")) {
    props.push("iconUrl={iconEdit}");
  }

  const visibleText = getVisibleText(root);

  if (visibleText) {
    props.push(`label="${visibleText}"`);
  }

  return props.length > 0
    ? `<Button ${props.join(" ")} />`
    : "<Button />";
}

function describeCardInstance(root: Element): string {
  const title =
    root.querySelector("h3, h4")?.textContent?.trim() ??
    root.querySelector('[class*="Typography"]')?.textContent?.trim();

  if (title) {
    return `<Card title="${title}" />`;
  }

  return "<Card />";
}

function describeImageInstance(root: Element, componentName: string): string {
  const alt = root.getAttribute("alt");
  const src = root.getAttribute("src") ?? root.getAttribute("image") ?? "";

  const srcLabel = src ? ` src="${src.split("/").pop()}"` : "";

  if (alt === null) {
    return `<${componentName} img${srcLabel} />`;
  }

  return `<${componentName} img alt=""${srcLabel} />`;
}

export function describeInstance(
  componentRoot: Element,
  componentName: string,
  targetElement: Element,
): string {
  if (componentName === "Button") {
    return describeButtonInstance(componentRoot);
  }

  if (componentName === "Card") {
    if (targetElement.tagName.toLowerCase() === "img") {
      return describeCardInstance(componentRoot);
    }

    return describeCardInstance(componentRoot);
  }

  if (targetElement.tagName.toLowerCase() === "img") {
    return describeImageInstance(targetElement, componentName);
  }

  return `<${componentName} />`;
}
