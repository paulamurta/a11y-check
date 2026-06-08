export function normalizeSourceFile(value: string): string {
  if (!value) {
    return "unknown";
  }

  try {
    const pathname = new URL(value, "http://localhost").pathname;
    const srcIndex = pathname.indexOf("/src/");

    if (srcIndex !== -1) {
      return pathname.slice(srcIndex + 1);
    }

    return pathname.replace(/^\//, "");
  } catch {
    return value;
  }
}
