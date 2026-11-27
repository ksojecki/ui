import { useId, type ComponentPropsWithRef } from 'react';
import { Field, FieldMessages, fieldDescribedBy, type ControlSize } from './Field';
import { joinClassNames } from '../internal/classNames';

export interface RadioProps extends Omit<ComponentPropsWithRef<'input'>, 'size' | 'type'> {
  label: string;
  hint?: string;
  error?: string;
  controlSize?: ControlSize;
}

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  legend: string;
  name: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  orientation?: 'vertical' | 'horizontal';
  value: string;
  hint?: string;
  error?: string;
}

// Literal class names so Tailwind's scanner picks them up.
const RADIO_SIZE_CLASS_NAMES: Record<ControlSize, string> = {
  xs: 'radio-xs',
  sm: 'radio-sm',
  md: '',
  lg: 'radio-lg',
};

const RADIO_ORIENTATION_CLASS_NAMES: Record<NonNullable<RadioGroupProps['orientation']>, string> = {
  vertical: 'flex flex-col gap-2',
  horizontal: 'flex flex-row flex-wrap gap-4',
};

/**
 * One radio button with its label wrapped around it. Hint and error render below it.
 *
 * @example
 * ```tsx
 * <Radio label="Monthly" name="billing" value="monthly" />
 * ```
 */
export function Radio({
  className,
  controlSize = 'md',
  error,
  hint,
  id,
  label,
  'aria-describedby': callerDescribedBy,
  ...props
}: RadioProps) {
  const generatedId = useId();
  const controlId = id ?? generatedId;

  return (
    <>
      <label className="label cursor-pointer gap-2">
        <input
          {...props}
          aria-describedby={fieldDescribedBy(controlId, hint, error, callerDescribedBy)}
          className={joinClassNames('radio', RADIO_SIZE_CLASS_NAMES[controlSize], className)}
          id={controlId}
          type="radio"
        />
        <span>{label}</span>
      </label>
      <FieldMessages controlId={controlId} error={error} hint={hint} />
    </>
  );
}

/**
 * Radios grouped in a fieldset named by `legend`. Arrow keys move selection natively.
 * Hint and error sit under the group; each radio references them. aria-invalid goes on the
 * radiogroup wrapper because ARIA does not allow it on a radio.
 *
 * @example
 * ```tsx
 * <RadioGroup
 *   legend="Billing"
 *   name="billing"
 *   onChange={setBilling}
 *   options={[
 *     { value: 'monthly', label: 'Monthly' },
 *     { value: 'yearly', label: 'Yearly' },
 *   ]}
 *   value={billing}
 * />
 * ```
 */
export function RadioGroup({
  error,
  hint,
  legend,
  name,
  onChange,
  options,
  orientation = 'vertical',
  value,
}: RadioGroupProps) {
  const messagesId = useId();
  const describedBy = fieldDescribedBy(messagesId, hint, error);

  return (
    <Field error={error} hint={hint} id={messagesId} label={legend}>
      <div
        aria-invalid={error ? true : undefined}
        className={RADIO_ORIENTATION_CLASS_NAMES[orientation]}
        role="radiogroup"
      >
        {options.map((option) => (
          <Radio
            aria-describedby={describedBy}
            checked={option.value === value}
            disabled={option.disabled}
            key={option.value}
            label={option.label}
            name={name}
            onChange={(event) => onChange(event.currentTarget.value)}
            value={option.value}
          />
        ))}
      </div>
    </Field>
  );
}
