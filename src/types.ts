/**
 * Flat JSON structure:
 * {
 *   en: { "key": "value" },
 *   es: { "key": "value" }
 * }
 */
export type Texts = Record<string, Record<string, string>>;

/**
 * Locale type inferred from the Texts object
 */
export type Locale<T extends Texts = Texts> = keyof T & string;
