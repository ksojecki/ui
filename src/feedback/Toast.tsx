import type { ReactNode } from 'react';
import { Alert } from './Alert';
import { IconButton } from '../actions/IconButton';
import { TbX } from '../icons';
import type { StatusPurpose } from '../internal/purpose';
import { joinClassNames } from '../internal/classNames';

export type ToastPosition = 'top-end' | 'bottom-end' | 'bottom-center';

export interface ToastRegionProps {
  children: ReactNode;
  className?: string;
  /** Corner or edge the toasts stack in. Defaults to bottom-end. */
  position?: ToastPosition;
}

interface ToastBaseProps {
  children: ReactNode;
  purpose?: StatusPurpose;
}

/** A dismissable toast needs both the handler and the accessible name of its button. */
export type ToastProps = ToastBaseProps &
  (
    | { dismissLabel?: undefined; onDismiss?: undefined }
    | { dismissLabel: string; onDismiss: () => void }
  );

// Literal class names so Tailwind's scanner picks them up.
const TOAST_POSITION_CLASS_NAMES: Record<ToastPosition, string> = {
  'top-end': 'toast-top toast-end',
  'bottom-end': 'toast-bottom toast-end',
  'bottom-center': 'toast-bottom toast-center',
};

/**
 * Live region for toasts. Toasts inside it are announced politely.
 *
 * @example
 * ```tsx
 * <ToastRegion position="top-end">
 *   {toasts.map((toast) => (
 *     <Toast key={toast.id} purpose={toast.purpose}>
 *       {toast.text}
 *     </Toast>
 *   ))}
 * </ToastRegion>
 * ```
 */
export const ToastRegion = ({ children, className, position = 'bottom-end' }: ToastRegionProps) => (
  <output className={joinClassNames('toast', TOAST_POSITION_CLASS_NAMES[position], className)}>
    {children}
  </output>
);

/**
 * One toast message. The region announces routine status; warnings and errors keep their assertive alert role.
 *
 * @example
 * ```tsx
 * <Toast dismissLabel="Dismiss" onDismiss={dismiss} purpose="success">
 *   Invoice sent.
 * </Toast>
 * ```
 */
export const Toast = ({ children, dismissLabel, onDismiss, purpose = 'info' }: ToastProps) => (
  <Alert
    announce={purpose === 'warning' || purpose === 'error'}
    className="justify-between"
    purpose={purpose}
  >
    <span>{children}</span>
    {onDismiss && dismissLabel !== undefined ? (
      <IconButton icon={<TbX />} label={dismissLabel} onClick={onDismiss} size="xs" tone="ghost" />
    ) : null}
  </Alert>
);
