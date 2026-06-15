/**
 * FILE PURPOSE: Shared custom React hooks for common client-side logic.
 * 
 * CONNECTIONS:
 * - Imports from: react
 * - Used by: all micro-frontend apps (debounce, media queries, localStorage, click-outside)
 * 
 * For a backend developer: Pure frontend hooks — useDebounce delays rapid input, useMediaQuery
 * tracks viewport breakpoints, useLocalStorage persists state, useOnClickOutside detects clicks
 * outside an element (dropdowns/modals). No server interaction.
 */

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Shared React hooks used across all micro-frontend packages.
 * Provides debouncing, responsive media query matching, localStorage persistence,
 * and click-outside detection utilities.
 */

/**
 * Debounces a value by the specified delay.
 * Useful for delaying search input or other rapidly changing values before processing.
 * @param value - The value to debounce.
 * @param delay - Delay in milliseconds before the value updates.
 * @returns The debounced value, updated only after the delay has elapsed since the last change.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Tracks whether a CSS media query matches the current viewport.
 * Automatically updates on viewport changes and cleans up on unmount.
 * @param query - A CSS media query string, e.g. "(min-width: 768px)".
 * @returns Whether the media query currently matches.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
/**
 * Persists a state value to localStorage, hydrating from storage on mount.
 * Works like useState but with automatic JSON serialization to localStorage.
 * @param key - The localStorage key to store the value under.
 * @param initialValue - The default value if no stored value exists.
 * @returns A tuple of [storedValue, setValue] matching the useState API.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
}

/**
 * Triggers a handler when a click or touch event occurs outside the referenced element.
 * Commonly used for closing dropdowns, modals, or popovers.
 * @param handler - Callback invoked with the mouse/touch event when clicking outside.
 * @returns A ref to attach to the element you want to detect outside clicks for.
 */
export function useOnClickOutside<T extends HTMLElement>(
  handler: (event: MouseEvent | TouchEvent) => void
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [handler]);

  return ref;
}
