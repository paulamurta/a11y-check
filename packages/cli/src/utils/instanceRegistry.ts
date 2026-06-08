const instanceKeys = new WeakMap<Element, string>();
const counters = new Map<string, number>();
const idCounters = new Map<string, number>();

export function getInstanceKey(
  componentRoot: Element,
  componentName: string,
): string {
  const existing = instanceKeys.get(componentRoot);

  if (existing) {
    return existing;
  }

  const declaredId =
    componentRoot.getAttribute("id") ??
    componentRoot.querySelector("input, textarea, select")?.getAttribute("id");

  if (declaredId) {
    const usageCount = (idCounters.get(declaredId) ?? 0) + 1;
    idCounters.set(declaredId, usageCount);

    const key =
      usageCount === 1 ? declaredId : `${declaredId}#${usageCount}`;

    instanceKeys.set(componentRoot, key);
    return key;
  }

  const next = (counters.get(componentName) ?? 0) + 1;
  counters.set(componentName, next);

  const key = `${componentName}#${next}`;
  instanceKeys.set(componentRoot, key);

  return key;
}

export function resetInstanceRegistry(): void {
  counters.clear();
  idCounters.clear();
}
