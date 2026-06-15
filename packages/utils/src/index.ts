/**
 * FILE PURPOSE: Shared utility/helper functions used across all micro-frontend packages.
 * 
 * CONNECTIONS:
 * - Imports from: (none — zero-dependency utils package)
 * - Used by: @platform/ui (Button, Card, Table, Sidebar, etc.) and all micro-frontend apps
 * 
 * For a backend developer: Pure frontend helpers for class-name merging (cn), currency/date formatting,
 * string truncation, and pluralization. No backend calls — just browser-side transformations.
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Formats a numeric amount as a localized currency string.
 * @param amount - The numeric value to format.
 * @param currency - ISO 4217 currency code (defaults to 'USD').
 * @returns A formatted currency string, e.g. "$1,234.56".
 */
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Formats a date as a human-readable string (e.g., "Jan 15, 2025").
 * Accepts both Date objects and ISO date strings.
 * @param date - A Date object or ISO date string.
 * @param options - Optional Intl.DateTimeFormatOptions to override defaults.
 * @returns The formatted date string.
 */
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', options ?? {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Formats a date as a relative time string (e.g., "5m ago", "2d ago").
 * Falls back to formatDate() for dates older than 7 days.
 * @param date - A Date object or ISO date string.
 * @returns A human-readable relative time string.
 */
export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return formatDate(d);
}

/**
 * Truncates a string to a given length, appending "..." if it exceeds the limit.
 * @param str - The string to truncate.
 * @param length - The maximum character length before truncation.
 * @returns The truncated string with "..." appended if needed, or the original string.
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

/**
 * Returns the singular or plural form of a word based on the count.
 * If no plural is provided, defaults to appending "s" to the singular form.
 * @param count - The number used to determine singular vs plural.
 * @param singular - The singular form of the word.
 * @param plural - Optional explicit plural form.
 * @returns The appropriately pluralized word.
 */
export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : (plural ?? `${singular}s`);
}
