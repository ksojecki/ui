import { useId, type ComponentPropsWithRef } from 'react';
import { Field, FieldMessages, fieldDescribedBy, type ControlSize } from './Field';
import { joinClassNames } from '../internal/classNames';

export interface FileInputProps extends Omit<ComponentPropsWithRef<'input'>, 'size' | 'type'> {
  label?: string;
  hint?: string;
  error?: string;
  controlSize?: ControlSize;
  /** Stretches to the container width. Defaults to true. */
  fullWidth?: boolean;
}

// Literal class names so Tailwind's scanner picks them up.
const FILE_INPUT_SIZE_CLASS_NAMES: Record<ControlSize, string> = {
  xs: 'file-input-xs',
  sm: 'file-input-sm',
  md: '',
  lg: 'file-input-lg',
};

/**
 * Shared file picker. Pass `label` to get a labelled Field; omit it for the bare control.
 * Hint and error render below the control either way.
 *
 * @example
 * ```tsx
 * <FileInput accept="image/*" label="Avatar" />
 * ```
 */
export function FileInput({
  label,
  hint,
  error,
  controlSize = 'md',
  fullWidth = true,
  className,
  id,
  'aria-describedby': callerDescribedBy,
  ...props
}: FileInputProps) {
  const generatedId = useId();
  const controlId = id ?? generatedId;

  const control = (
    <input
      {...props}
      aria-describedby={fieldDescribedBy(controlId, hint, error, callerDescribedBy)}
      aria-invalid={error ? true : props['aria-invalid']}
      className={joinClassNames(
        'file-input',
        FILE_INPUT_SIZE_CLASS_NAMES[controlSize],
        error ? 'file-input-error' : undefined,
        fullWidth ? 'w-full' : undefined,
        className,
      )}
      id={controlId}
      type="file"
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
