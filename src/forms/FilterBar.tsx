import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { joinClassNames } from '../internal/classNames';

export type FilterBarProps = ComponentPropsWithoutRef<'div'> & {
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
};

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
