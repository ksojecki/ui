import type { ComponentPropsWithoutRef } from 'react';
import { joinClassNames } from '../internal/classNames';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg';

export interface SpinnerProps extends ComponentPropsWithoutRef<'span'> {
  /** Announced text. Without it the spinner is decorative and hidden from assistive tech. */
  label?: string;
  size?: SpinnerSize;
}

// Literal class names so Tailwind's scanner picks them up.
const SPINNER_SIZE_CLASS_NAMES: Record<SpinnerSize, string> = {
  xs: 'loading-xs',
  sm: 'loading-sm',
  md: 'loading-md',
  lg: 'loading-lg',
};

/**
 * Loading indicator. Pass `label` when it stands for a state the user waits on.
 *
 * @example
 * ```tsx
 * <Spinner label="Loading invoices" size="sm" />
 * ```
 */
export const Spinner = ({ className, label, size = 'md', ...rest }: SpinnerProps) => (
  <span
    {...rest}
    aria-hidden={label ? undefined : true}
    className={joinClassNames('loading loading-spinner', SPINNER_SIZE_CLASS_NAMES[size], className)}
    role={label ? 'status' : undefined}
  >
    {label ? <span className="sr-only">{label}</span> : null}
  </span>
);
