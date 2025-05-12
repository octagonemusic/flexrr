/**
 * Type guard utilities to help with TypeScript null/undefined checking
 */

/**
 * Type guard to check if a value is a non-null string
 */
export function isNonNullableString(value: unknown): value is string {
  return typeof value === 'string' && value !== null;
}

/**
 * Type guard to check if a value is a non-null, non-empty string
 */
export function isValidString(value: unknown): value is string {
  return typeof value === 'string' && value !== null && value.trim() !== '';
}

/**
 * Type guard to ensure a value is a string or undefined (but never null)
 * Returns the string value or undefined
 */
export function ensureStringOrUndefined(value: unknown): string | undefined {
  if (typeof value === 'string') {
    return value;
  }
  return undefined;
}

/**
 * Safely filters an array to ensure all items are strings
 * This is useful when converting arrays that might contain null/undefined to string[]
 */
export function filterToStringArray(array: unknown[] | null | undefined): string[] {
  if (!array || !Array.isArray(array)) {
    return [];
  }
  
  return array.filter((item): item is string => typeof item === 'string' && item !== null);
}

/**
 * Provides a fallback if the string is null or undefined
 */
export function stringWithFallback(value: string | null | undefined, fallback: string): string {
  return value ?? fallback;
}