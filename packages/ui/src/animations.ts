/**
 * FILE PURPOSE: Shared Framer Motion animation variants for UI components (fade, slide, stagger, card hover).
 * 
 * CONNECTIONS:
 * - Imports from: framer-motion
 * - Used by: @platform/ui (barrel via index.ts), micro-frontend apps
 * 
 * For a backend developer: Pre-built animation presets. fadeIn, slideUp, slideDown are page/stagger
 * variants. cardHover is a whileHover target. Use with Framer Motion's variants prop.
 */

import type { Variants } from 'framer-motion';

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

export const slideDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

export const cardHover = { y: -2, boxShadow: '0 8px 25px rgba(0,0,0,0.25)' };
