import { useId, type ComponentPropsWithRef } from 'react';
import { FieldMessages, fieldDescribedBy } from './Field';
import { joinClassNames } from '../internal/classNames';

export interface SwitchProps extends Omit<ComponentPropsWithRef<'input'>, 'size' | 'type'> {
  label: string;
  hint?: string;
  error?: string;
}

/**
 * Shared switch with its label wrapped around it. Hint and error render below it.
 *
 * @example
 * ```tsx
 * <Switch defaultChecked label="Email notifications" />
 * ```
 */
export function Switch({
  label,
  hint,
  error,
  className,
  id,
  'aria-describedby': callerDescribedBy,
  ...props
}: SwitchProps) {
  const generatedId = useId();
  const controlId = id ?? generatedId;

  return (
    <>
      <label className="label cursor-pointer justify-between gap-2">
        <span className="text-sm text-base-content">{label}</span>
        <input
          {...props}
          aria-describedby={fieldDescribedBy(controlId, hint, error, callerDescribedBy)}
          aria-invalid={error ? true : props['aria-invalid']}
          className={joinClassNames(
            'toggle toggle-sm',
            error ? 'toggle-error' : undefined,
            className,
          )}
          id={controlId}
          type="checkbox"
        />
      </label>
      <FieldMessages controlId={controlId} error={error} hint={hint} />
    </>
  );
}
