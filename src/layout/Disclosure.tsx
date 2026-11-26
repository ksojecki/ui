import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { joinClassNames } from '../internal/classNames';

export interface DisclosureProps extends ComponentPropsWithoutRef<'details'> {
  bordered?: boolean;
  children: ReactNode;
  open?: boolean;
  summary: ReactNode;
}

/** Native disclosure: Enter and Space toggle it through the `summary` element. */
export const Disclosure = ({
  bordered = false,
  children,
  className,
  open,
  summary,
  ...rest
}: DisclosureProps) => (
  <details
    {...rest}
    className={joinClassNames(
      'collapse collapse-arrow',
      bordered ? 'border border-base-300' : undefined,
      className,
    )}
    open={open}
  >
    <summary className="collapse-title">{summary}</summary>
    <div className="collapse-content">{children}</div>
  </details>
);
