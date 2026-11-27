import { useId, type ComponentPropsWithRef } from 'react';
import { FieldMessages, fieldDescribedBy, type ControlSize } from './Field';
import { joinClassNames } from '../internal/classNames';

export interface CheckboxProps extends Omit<ComponentPropsWithRef<'input'>, 'size' | 'type'> {
  label: string;
  error?: string;
  controlSize?: ControlSize;
}

// Literal class names so Tailwind's scanner picks them up.
const CHECKBOX_SIZE_CLASS_NAMES: Record<ControlSize, string> = {
  xs: 'checkbox-xs',
  sm: 'checkbox-sm',
  md: '',
  lg: 'checkbox-lg',
};

/**
 * Shared checkbox with its label wrapped around it.
 *
 * @example
 * ```tsx
 * <Checkbox defaultChecked label="Remember me" />
 * ```
 */
export function Checkbox({
  label,
  error,
  controlSize = 'md',
  className,
  id,
  'aria-describedby': callerDescribedBy,
  ...props
}: CheckboxProps) {
  const generatedId = useId();
  const controlId = id ?? generatedId;

  return (
    <>
      <label className="label cursor-pointer gap-2">
        <input
          {...props}
          aria-describedby={fieldDescribedBy(controlId, undefined, error, callerDescribedBy)}
          aria-invalid={error ? true : undefined}
          className={joinClassNames(
            'checkbox',
            CHECKBOX_SIZE_CLASS_NAMES[controlSize],
            error ? 'checkbox-error' : undefined,
            className,
          )}
          id={controlId}
          type="checkbox"
        />
        <span className="text-sm text-base-content">{label}</span>
      </label>
      <FieldMessages controlId={controlId} error={error} />
    </>
  );
}
