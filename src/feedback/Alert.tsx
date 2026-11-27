import type { HTMLAttributes, ReactNode } from 'react';
import type { StatusPurpose } from '../internal/purpose';
import { joinClassNames } from '../internal/classNames';

export type AlertVariant = 'solid' | 'soft';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  /** Set to false for static notices: no live region is rendered and no role is set. */
  announce?: boolean;
  children: ReactNode;
  /** Semantic meaning of the alert. Colour and default live region role are derived from it. */
  purpose?: StatusPurpose;
  variant?: AlertVariant;
}

const ALERT_PURPOSE_CLASS_NAMES: Record<StatusPurpose, string> = {
  info: 'alert-info',
  success: 'alert-success',
  warning: 'alert-warning',
  error: 'alert-error',
};

const ALERT_VARIANT_CLASS_NAMES: Record<AlertVariant, string> = {
  solid: '',
  soft: 'alert-soft',
};

// Problems interrupt assistive tech; routine status is announced politely.
const ALERT_ROLE: Record<StatusPurpose, 'alert' | 'status'> = {
  info: 'status',
  success: 'status',
  warning: 'alert',
  error: 'alert',
};

/**
 * Shared inline message. Pass `role` to override the purpose default.
 *
 * @example
 * ```tsx
 * <Alert purpose="success">Saved.</Alert>
 * <Alert announce={false} purpose="info" variant="soft">
 *   Prices include VAT.
 * </Alert>
 * ```
 */
export const Alert = ({
  announce = true,
  children,
  className,
  purpose = 'info',
  role,
  variant = 'solid',
  ...props
}: AlertProps) => (
  <div
    role={announce ? (role ?? ALERT_ROLE[purpose]) : undefined}
    className={joinClassNames(
      'alert',
      'animate-fade-in',
      ALERT_PURPOSE_CLASS_NAMES[purpose],
      ALERT_VARIANT_CLASS_NAMES[variant],
      className,
    )}
    {...props}
  >
    {children}
  </div>
);
