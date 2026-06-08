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

function describeLinkInstance(root: Element): string {
  const props: string[] = [`href="${root.getAttribute("href") ?? "#"}"`];

  if (root.querySelector("img")) {
    props.push("iconUrl={iconEdit}");
  }

  const visibleText = getVisibleText(root);

  if (visibleText) {
    props.push(`label="${visibleText}"`);
  }

  return `<Link ${props.join(" ")} />`;
}

function describeAvatarInstance(root: Element): string {
  const img = root.querySelector("img");
  const alt = img?.getAttribute("alt");

  if (!img?.hasAttribute("alt")) {
    return "<Avatar src={profilePhoto} invalidAccessibility />";
  }

  if (alt === "image") {
    return '<Avatar src={profilePhoto} alt="image" />';
  }

  if (alt) {
    return `<Avatar src={profilePhoto} alt="${alt}" />`;
  }

  return "<Avatar src={profilePhoto} />";
}

function describeInputInstance(root: Element): string {
  const input = root.querySelector("input, textarea, select");
  const props: string[] = [];
  const label = root.querySelector("label")?.textContent?.trim();

  if (label) {
    props.push(`label="${label}"`);
  }

  const placeholder = input?.getAttribute("placeholder");

  if (placeholder) {
    props.push(`placeholder="${placeholder}"`);
  }

  const labelledBy = input?.getAttribute("aria-labelledby");

  if (labelledBy) {
    props.push(`aria-labelledby="${labelledBy}"`);
  }

  const describedBy = input?.getAttribute("aria-describedby");

  if (describedBy) {
    props.push(`aria-describedby="${describedBy}"`);
  }

  if (input?.hasAttribute("required")) {
    props.push("required");
  }

  if (props.length > 0) {
    return `<Input ${props.join(" ")} />`;
  }

  return "<Input invalidAccessibility />";
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

  if (componentName === "Link") {
    return describeLinkInstance(componentRoot);
  }

  if (componentName === "Avatar") {
    return describeAvatarInstance(componentRoot);
  }

  if (componentName === "Input") {
    return describeInputInstance(componentRoot);
  }

  if (targetElement.tagName.toLowerCase() === "img") {
    return describeImageInstance(targetElement, componentName);
  }

  return `<${componentName} />`;
}
