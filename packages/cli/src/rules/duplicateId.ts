export function findDuplicateIdElements(document: Document): Element[] {
  const elementsById = new Map<string, Element[]>();

  for (const element of document.querySelectorAll("[id]")) {
    const id = element.getAttribute("id");

    if (!id) {
      continue;
    }

    const group = elementsById.get(id) ?? [];
    group.push(element);
    elementsById.set(id, group);
  }

  return Array.from(elementsById.values())
    .filter((group) => group.length > 1)
    .flat();
}
