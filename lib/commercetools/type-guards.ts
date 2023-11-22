export function isString(value: unknown): value is string {
  return typeof value === "string";
}

export function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

export function hasLocalizedStringValue(obj: unknown, locale: string): boolean {
  if (!obj || typeof obj !== "object" || !(locale in obj)) return false;
  return typeof (obj as Record<string, unknown>)[locale] === "string";
}
