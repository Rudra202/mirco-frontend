/**
 * FILE PURPOSE: Animated page transition wrapper using Framer Motion (fade + slide).
 * 
 * CONNECTIONS:
 * - Imports from: framer-motion, react
 * - Used by: micro-frontend apps (wraps route content for smooth navigation transitions)
 * 
 * For a backend developer: Wraps page content with enter/exit animations triggered by routeKey.
 * When the routeKey changes (e.g. user navigates), the old page fades down and the new one fades up.
 */

import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  /** A unique key that triggers re-animation when changed (typically location.pathname). */
  routeKey: string;
}

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2, ease: 'easeIn' } },
};

export function PageTransition({ children, routeKey }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={routeKey}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
