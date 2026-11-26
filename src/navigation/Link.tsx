import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { Link as RouterLink, type To } from 'react-router';
import {
  buttonClassName,
  resolveButtonStyle,
  useButtonSize,
  type ButtonSize,
  type ButtonTone,
  type ButtonVariant,
} from '../actions/Button';
import type { ActionPurpose } from '../internal/purpose';
import { joinClassNames } from '../internal/classNames';

export type LinkTone = ButtonTone;

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  to: To;
  asButton?: boolean;
  fullWidth?: boolean;
  /** Semantic action meaning. Colour comes from it unless `tone` is set. */
  purpose?: ActionPurpose;
  /** Button size; only applies with `asButton`. */
  size?: ButtonSize;
  /** Square icon-only button; only applies with `asButton`. */
  square?: boolean;
  tone?: LinkTone;
  variant?: ButtonVariant;
}

const LINK_BASE_CLASS_NAME = 'link';

// daisyUI has no `link-ghost`; a ghost plain link is the bare `link` class.
const LINK_TONE_CLASS_NAMES: Record<ButtonTone, string> = {
  default: '',
  primary: 'link-primary',
  secondary: 'link-secondary',
  ghost: '',
  neutral: 'link-neutral',
  info: 'link-info',
  success: 'link-success',
  warning: 'link-warning',
  error: 'link-error',
};

/**
 * Link component that can render as a styled link or button.
 * When asButton is true, it shares Button's classes; otherwise it uses link classes.
 */
export const Link = ({
  children,
  className,
  to,
  asButton = false,
  fullWidth = false,
  purpose,
  size,
  square = false,
  tone,
  variant,
  ...props
}: LinkProps) => {
  const resolvedSize = useButtonSize(size);
  const resolvedClassName = asButton
    ? buttonClassName({
        className,
        fullWidth,
        purpose,
        size: resolvedSize,
        square,
        tone,
        variant,
      })
    : joinClassNames(
        LINK_BASE_CLASS_NAME,
        LINK_TONE_CLASS_NAMES[resolveButtonStyle({ purpose, tone }).tone],
        className,
      );

  return (
    <RouterLink className={resolvedClassName} to={to} {...props}>
      {children}
    </RouterLink>
  );
};
