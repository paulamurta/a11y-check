const instanceKeys = new WeakMap<Element, string>();
const counters = new Map<string, number>();

export function getInstanceKey(componentRoot: Element, componentName: string): string {
  const existing = instanceKeys.get(componentRoot);

  if (existing) {
    return existing;
  }

  const next = (counters.get(componentName) ?? 0) + 1;
  counters.set(componentName, next);

  const key = `${componentName}#${next}`;
  instanceKeys.set(componentRoot, key);

  return key;
}

export function resetInstanceRegistry(): void {
  counters.clear();
}
