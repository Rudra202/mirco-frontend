/**
 * FILE PURPOSE: Modal dialog overlay with optional title, footer actions, Escape-to-close, and sizing.
 * 
 * CONNECTIONS:
 * - Imports from: @platform/utils (cn), react, ./Button
 * - Used by: micro-frontend apps (confirmations, forms, detail views)
 * 
 * For a backend developer: A frontend overlay dialog. Controlled by open/onClose props.
 * Supports confirm/cancel footer (onConfirm), loading state on confirm button, and size variants.
 * Closes on Escape key or backdrop click.
 */

import { cn } from '@platform/utils';
import { useEffect, type ReactNode, useState } from 'react';
import { Button } from './Button';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  /** When set, renders a confirm/cancel footer. The dialog will not auto-close on confirm. */
  onConfirm?: () => void;
  /** Label for the confirm button. Defaults to "Confirm". */
  confirmLabel?: string;
  /** Label for the cancel button. Defaults to "Cancel". */
  cancelLabel?: string;
  /** Shows a loading spinner on the confirm button. */
  confirmLoading?: boolean;
  /** Visual variant for the confirm button. */
  confirmVariant?: 'primary' | 'danger';
}

const sizes = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

export function Modal({
  open, onClose, title, children, size = 'md',
  onConfirm, confirmLabel = 'Confirm', cancelLabel = 'Cancel',
  confirmLoading, confirmVariant = 'primary',
}: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
      window.addEventListener('keydown', handler);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handler);
      };
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className={cn('relative w-full rounded-xl border border-gray-800 bg-gray-900 shadow-2xl', sizes[size])}>
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
            <h2 className="text-lg font-semibold text-gray-100">{title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-300 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
        {onConfirm && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-800">
            <Button variant="secondary" onClick={onClose}>{cancelLabel}</Button>
            <Button variant={confirmVariant} onClick={onConfirm} loading={confirmLoading}>{confirmLabel}</Button>
          </div>
        )}
      </div>
    </div>
  );
}
