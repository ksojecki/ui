import { useId, type ChangeEventHandler, type FocusEventHandler, type Ref } from 'react';
import { FieldMessages, fieldDescribedBy } from './Field';

/**
 * Props an uncontrolled input needs from a form library. Matches the result of react-hook-form's
 * `register()` (checked in `FormField.spec.tsx`), without depending on that package.
 */
export interface FieldRegistration {
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur: FocusEventHandler<HTMLInputElement>;
  ref: Ref<HTMLInputElement>;
  disabled?: boolean;
  max?: number | string;
  maxLength?: number;
  min?: number | string;
  minLength?: number;
  pattern?: string;
  required?: boolean;
}

export interface FormFieldProps {
  label: string;
  type: 'email' | 'password' | 'text';
  registration: FieldRegistration;
  errorMessage?: string;
  hint?: string;
}

const FORM_FIELD_BASE_CLASS_NAME = 'input w-full';

/**
 * Shared labeled auth form field with optional hint and validation message.
 */
export function FormField({ label, type, registration, errorMessage, hint }: FormFieldProps) {
  const id = useId();

  return (
    <>
      <label className={FORM_FIELD_BASE_CLASS_NAME}>
        <input
          aria-describedby={fieldDescribedBy(id, hint, errorMessage)}
          aria-invalid={errorMessage ? true : undefined}
          placeholder={label}
          type={type}
          {...registration}
        />
      </label>
      <FieldMessages controlId={id} error={errorMessage} hint={hint} />
    </>
  );
}
