import type { Texts, Locale } from "./types";

let _texts: Texts | null = null;
let _defaultLocale: string | null = null;

/**
 * Initializes flat-i18n.
 * Must be called once before using getText().
 */
export function createI18n<T extends Texts>(
  texts: T,
  defaultLocale: Locale<T>
): void {
  _texts = texts;
  _defaultLocale = defaultLocale;
}

/**
 * Returns a translated string.
 *
 * - Falls back to default locale
 * - Falls back to key if missing
 * - Throws if not initialized
 */
export function getText(
  key: string,
  locale?: string
): string {
  if (!_texts || !_defaultLocale) {
    throw new Error(
      "flat-i18n is not initialized. Call createI18n() first."
    );
  }

  return (
    _texts[locale || _defaultLocale]?.[key] ??
    _texts[_defaultLocale]?.[key] ??
    key
  );
}
