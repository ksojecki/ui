import { render, screen } from '@testing-library/react';
import { useForm, type UseFormRegisterReturn } from 'react-hook-form';
import { FormField, type FieldRegistration } from './FormField';

const registration: FieldRegistration = {
  name: 'email',
  onChange: () => undefined,
  onBlur: () => undefined,
  ref: () => undefined,
};

function RegisteredField() {
  const { register } = useForm<{ email: string }>();
  return <FormField label="Email" registration={register('email')} type="email" />;
}

describe('FormField', () => {
  it('accepts the result of react-hook-form register()', () => {
    expectTypeOf<UseFormRegisterReturn>().toExtend<FieldRegistration>();

    render(<RegisteredField />);

    expect(screen.getByPlaceholderText('Email').getAttribute('name')).toBe('email');
  });

  it('renders the hint as muted text, not as an alert', () => {
    render(
      <FormField
        hint="Use a work address"
        label="Email"
        registration={registration}
        type="email"
      />,
    );

    const hint = screen.getByText('Use a work address');
    expect(hint.className).toContain('label');
    expect(hint.className).not.toContain('text-error');
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('renders only the error message as an alert', () => {
    render(
      <FormField
        errorMessage="Email is required"
        hint="Use a work address"
        label="Email"
        registration={registration}
        type="email"
      />,
    );

    const alert = screen.getByRole('alert');
    expect(alert.textContent).toBe('Email is required');
    expect(alert.className).toContain('text-error');
    expect(screen.getByText('Use a work address').className).not.toContain('text-error');
  });

  it('marks the input invalid and links the error and hint from it', () => {
    render(
      <FormField
        errorMessage="Email is required"
        hint="Use a work address"
        label="Email"
        registration={registration}
        type="email"
      />,
    );

    const input = screen.getByRole('textbox');
    const alert = screen.getByRole('alert');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-describedby')).toBe(
      [screen.getByText('Use a work address').id, alert.id].join(' '),
    );
  });

  it('leaves the input valid and unlinked when there is no message', () => {
    render(<FormField label="Email" registration={registration} type="email" />);

    const input = screen.getByRole('textbox');
    expect(input.getAttribute('aria-invalid')).toBeNull();
    expect(input.getAttribute('aria-describedby')).toBeNull();
  });
});
