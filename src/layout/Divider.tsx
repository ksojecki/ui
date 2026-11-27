import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { joinClassNames } from '../internal/classNames';

export interface DividerProps extends ComponentPropsWithoutRef<'div'> {
  children?: ReactNode;
  vertical?: boolean;
  /** For a flex-row parent: draws a vertical separator between items. */
  row?: boolean;
}

/**
 * Separates content. Pass `children` to label the divider.
 *
 * @example
 * ```tsx
 * <Divider>or</Divider>
 * ```
 */
export const Divider = ({
  children,
  className,
  row = false,
  vertical = false,
  ...rest
}: DividerProps) => (
  <div
    {...rest}
    className={joinClassNames(
      'divider',
      vertical ? 'divider-vertical' : undefined,
      row ? 'divider-horizontal' : undefined,
      className,
    )}
  >
    {children}
  </div>
);
