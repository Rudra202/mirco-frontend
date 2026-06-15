/**
 * FILE PURPOSE: Bordered container card with optional header (title, subtitle, actions) and body padding.
 * 
 * CONNECTIONS:
 * - Imports from: @platform/utils (cn), framer-motion, react
 * - Used by: micro-frontend apps (dashboard stats, chart wrappers, settings sections)
 * 
 * For a backend developer: Groups related UI content in a dark-themed card with a hover lift effect.
 * Use <Card title="..." subtitle="..." actions={...}> to wrap sections of a page.
 */

import { cn } from '@platform/utils';
import { motion } from 'framer-motion';
import type { ReactNode, HTMLAttributes } from 'react';

/**
 * Props for the Card component.
 */
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Heading text displayed in the card header. */
  title?: string;
  /** Secondary text below the title. */
  subtitle?: string;
  /** Action elements (buttons, links) rendered in the header's right side. */
  actions?: ReactNode;
  /** Whether to apply padding to the body area. Defaults to true. */
  padding?: boolean;
}

/**
 * A container card with an optional header (title, subtitle, actions) and a
 * padded body area. Useful for grouping related content in a bordered section.
 */
export function Card({ title, subtitle, actions, padding = true, className, children, ...props }: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={cn(
        'rounded-xl border border-gray-800 bg-gray-900 shadow-lg min-w-0 overflow-hidden',
        className
      )}
      {...props}
    >
      {(title || actions) && (
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <div>
            {title && <h3 className="text-base font-semibold text-gray-100">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-sm text-gray-500">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className={cn(padding && 'p-6')}>{children}</div>
    </motion.div>
  );
}
