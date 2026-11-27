import { useId, type ComponentPropsWithRef } from 'react';
import { Field, FieldMessages, fieldDescribedBy, type ControlSize } from './Field';
import { joinClassNames } from '../internal/classNames';

export interface TextareaProps extends ComponentPropsWithRef<'textarea'> {
  label?: string;
  hint?: string;
  error?: string;
  controlSize?: ControlSize;
  /** Stretches to the container width. Defaults to true. */
  fullWidth?: boolean;
}

// Literal class names so Tailwind's scanner picks them up.
const TEXTAREA_SIZE_CLASS_NAMES: Record<ControlSize, string> = {
  xs: 'textarea-xs',
  sm: 'textarea-sm',
  md: '',
  lg: 'textarea-lg',
};

/**
 * Shared multi-line text field. Pass `label` to get a labelled Field; omit it for the bare control.
 * Hint and error render below the control either way.
 *
 * @example
 * ```tsx
 * <Textarea label="Notes" rows={4} />
 * ```
 */
export function Textarea({
  label,
  hint,
  error,
  controlSize = 'md',
  fullWidth = true,
  className,
  id,
  'aria-describedby': callerDescribedBy,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const controlId = id ?? generatedId;

  const control = (
    <textarea
      {...props}
      aria-describedby={fieldDescribedBy(controlId, hint, error, callerDescribedBy)}
      aria-invalid={error ? true : props['aria-invalid']}
      className={joinClassNames(
        'textarea',
        TEXTAREA_SIZE_CLASS_NAMES[controlSize],
        error ? 'textarea-error' : undefined,
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
