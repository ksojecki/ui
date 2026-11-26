import type { HTMLAttributes, ReactNode } from 'react';
import type { StatusPurpose } from '../internal/purpose';
import { joinClassNames } from '../internal/classNames';

export type BadgePurpose = StatusPurpose | 'neutral';
export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';
export type BadgeVariant = 'solid' | 'soft' | 'outline';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  /** Semantic meaning of the badge. Colour is derived from it. */
  purpose?: BadgePurpose;
  size?: BadgeSize;
  variant?: BadgeVariant;
}

// Literal class names so Tailwind's scanner picks them up.
const BADGE_PURPOSE_CLASS_NAMES: Record<BadgePurpose, string> = {
  neutral: 'badge-neutral',
  info: 'badge-info',
  success: 'badge-success',
  warning: 'badge-warning',
  error: 'badge-error',
};

const BADGE_VARIANT_CLASS_NAMES: Record<BadgeVariant, string> = {
  solid: '',
  soft: 'badge-soft',
  outline: 'badge-outline',
};

const BADGE_SIZE_CLASS_NAMES: Record<BadgeSize, string> = {
  xs: 'badge-xs',
  sm: 'badge-sm',
  md: '',
  lg: 'badge-lg',
};

/** Shared status label. Use `purpose` for meaning, never a colour class. */
export const Badge = ({
  children,
  className,
  purpose = 'neutral',
  size = 'md',
  variant = 'soft',
  ...props
}: BadgeProps) => (
  <span
    className={joinClassNames(
      'badge',
      BADGE_PURPOSE_CLASS_NAMES[purpose],
      BADGE_VARIANT_CLASS_NAMES[variant],
      BADGE_SIZE_CLASS_NAMES[size],
      className,
    )}
    {...props}
  >
    {children}
  </span>
);
