import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { joinClassNames } from '../internal/classNames';

export type FilterBarProps = ComponentPropsWithoutRef<'div'> & {
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
};

/**
 * Row of compact filter controls that wraps on narrow screens. `actions` sit at its end.
 *
 * @example
 * ```tsx
 * <FilterBar actions={<Button tone="ghost">Clear</Button>}>
 *   <Input aria-label="Search" placeholder="Search" />
 *   <Select aria-label="Status">
 *     <option>All</option>
 *     <option>Paid</option>
 *   </Select>
 * </FilterBar>
 * ```
 */
export function FilterBar({ children, actions, className, ...rest }: FilterBarProps) {
  return (
    <div
      {...rest}
      className={joinClassNames(
        'flex flex-wrap items-end gap-3 [&_.input]:input-sm [&_.select]:select-sm [&_.btn]:btn-sm',
        className,
      )}
    >
      {children}
      {actions ? <div className="ml-auto self-end">{actions}</div> : null}
    </div>
  );
}
