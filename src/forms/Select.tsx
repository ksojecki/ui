import { useId, type ComponentPropsWithRef } from 'react';
import { Field, FieldMessages, fieldDescribedBy, type ControlSize } from './Field';
import { joinClassNames } from '../internal/classNames';

export interface SelectProps extends Omit<ComponentPropsWithRef<'select'>, 'size'> {
  label?: string;
  hint?: string;
  error?: string;
  controlSize?: ControlSize;
  /** Stretches to the container width. Defaults to true. */
  fullWidth?: boolean;
}

// Literal class names so Tailwind's scanner picks them up.
const SELECT_SIZE_CLASS_NAMES: Record<ControlSize, string> = {
  xs: 'select-xs',
  sm: 'select-sm',
  md: '',
  lg: 'select-lg',
};

/**
 * Shared select. Pass `label` to get a labelled Field; omit it for the bare control.
 * Hint and error render below the control either way. Pass `<option>` elements as children.
 *
 * @example
 * ```tsx
 * <Select defaultValue="PLN" label="Currency">
 *   <option value="PLN">PLN</option>
 *   <option value="EUR">EUR</option>
 * </Select>
 * ```
 */
export function Select({
  label,
  hint,
  error,
  controlSize = 'md',
  fullWidth = true,
  className,
  id,
  'aria-describedby': callerDescribedBy,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const controlId = id ?? generatedId;

  const control = (
    <select
      {...props}
      aria-describedby={fieldDescribedBy(controlId, hint, error, callerDescribedBy)}
      aria-invalid={error ? true : props['aria-invalid']}
      className={joinClassNames(
        'select',
        SELECT_SIZE_CLASS_NAMES[controlSize],
        error ? 'select-error' : undefined,
        fullWidth ? 'w-full' : undefined,
        className,
      )}
      id={controlId}
    />
  );

  return label ? (
    <Field controlId={controlId} error={error} hint={hint} label={label}>
      {control}
    </Field>
  ) : (
    <>
      {control}
      <FieldMessages controlId={controlId} error={error} hint={hint} />
    </>
  );
}
