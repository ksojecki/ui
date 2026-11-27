import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { IconButton } from '../actions/IconButton';
import { TbX } from '../icons';
import { joinClassNames } from '../internal/classNames';

export interface FilterRowProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  onRemove?: () => void;
  removeLabel?: string;
}

/**
 * One filter condition on a single row that scrolls sideways, with a remove button when `onRemove` is set.
 *
 * @example
 * ```tsx
 * <FilterRow onRemove={() => removeFilter(index)} removeLabel="Remove filter">
 *   <Select aria-label="Field">
 *     <option>Amount</option>
 *   </Select>
 *   <Input aria-label="Value" type="number" />
 * </FilterRow>
 * ```
 */
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
