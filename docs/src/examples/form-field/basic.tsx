import { useForm } from 'react-hook-form';
import { FormField } from '@ksojecki/ui/forms';

export default function FormFieldBasic() {
  const { register } = useForm<{ email: string; password: string }>();

  return (
    <form className="flex max-w-sm flex-col gap-3">
      <FormField label="Email" registration={register('email')} type="email" />
      <FormField
        errorMessage="Password is too short."
        label="Password"
        registration={register('password')}
        type="password"
      />
    </form>
  );
}
