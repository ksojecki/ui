import type { ComponentPropsWithRef } from 'react';
import { joinClassNames } from '../internal/classNames';

export type TableSize = 'xs' | 'sm' | 'md' | 'lg';

export interface TableProps extends ComponentPropsWithRef<'table'> {
  /** Density of rows and cells. Defaults to `sm`. */
  tableSize?: TableSize;
  zebra?: boolean;
  /** Classes for the scrolling wrapper `div`. */
  wrapperClassName?: string;
  /** Accessible name for the scrolling wrapper. Without it the wrapper is not a focusable region. */
  label?: string;
}

// Literal class names so Tailwind's scanner picks them up.
const TABLE_SIZE_CLASS_NAMES: Record<TableSize, string> = {
  xs: 'table-xs',
  sm: 'table-sm',
  md: '',
  lg: 'table-lg',
};

/** Shared data table. The wrapper scrolls horizontally on narrow screens. */
export function Table({
  tableSize = 'sm',
  zebra = false,
  wrapperClassName,
  className,
  children,
  label,
  ...props
}: TableProps) {
  return (
    <div
      aria-label={label}
      className={joinClassNames('overflow-x-auto', wrapperClassName)}
      role={label ? 'region' : undefined}
      tabIndex={label ? 0 : undefined}
    >
      <table
        {...props}
        className={joinClassNames(
          'table',
          TABLE_SIZE_CLASS_NAMES[tableSize],
          zebra ? 'table-zebra' : undefined,
          'w-full',
          className,
        )}
      >
        {children}
      </table>
    </div>
  );
}
