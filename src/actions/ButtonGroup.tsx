import { Children, cloneElement, isValidElement, type ReactNode } from 'react';
import { joinClassNames } from '../internal/classNames';

export interface ButtonGroupProps {
  children: ReactNode;
  className?: string;
  /** Accessible name of the group; omit for a plain container. */
  label?: string;
}

/**
 * Joins its children (buttons, links, icon buttons, badges) into one segmented strip.
 *
 * @example
 * ```tsx
 * <ButtonGroup label="Range">
 *   <Button tone="neutral">Day</Button>
 *   <Button tone="neutral">Week</Button>
 *   <Button tone="neutral">Month</Button>
 * </ButtonGroup>
 * ```
 */
export function ButtonGroup({ children, className, label }: ButtonGroupProps) {
  return (
    <div
      aria-label={label}
      className={joinClassNames('join', className)}
      role={label ? 'group' : undefined}
    >
      {Children.map(children, (child) =>
        isValidElement<{ className?: string }>(child)
          ? cloneElement(child, {
              className: joinClassNames('join-item', child.props.className),
            })
          : child,
      )}
    </div>
  );
}
