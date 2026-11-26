import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { IconButton } from '../actions/IconButton';
import { TbX } from '../icons';
import { joinClassNames } from '../internal/classNames';

export interface FilterRowProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  onRemove?: () => void;
  removeLabel?: string;
}

export function FilterRow({
  children,
  className,
  onRemove,
  removeLabel = 'Remove',
  ...rest
}: FilterRowProps) {
  return (
    <div
      {...rest}
      className={joinClassNames(
        'flex min-w-0 flex-nowrap items-center gap-2 overflow-x-auto',
        className,
      )}
    >
      {children}
      {onRemove ? (
        <IconButton
          className="shrink-0"
          icon={<TbX aria-hidden="true" />}
          label={removeLabel}
          onClick={onRemove}
          size="sm"
        />
      ) : null}
    </div>
  );
}
