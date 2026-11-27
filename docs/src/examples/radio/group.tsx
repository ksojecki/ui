import { useState } from 'react';
import { RadioGroup } from '@ksojecki/ui/forms';

export default function RadioGroupExample() {
  const [frequency, setFrequency] = useState('weekly');

  return (
    <RadioGroup
      hint="You can change it later."
      legend="Frequency"
      name="frequency"
      onChange={setFrequency}
      options={[
        { value: 'weekly', label: 'Weekly' },
        { value: 'monthly', label: 'Monthly' },
        { value: 'never', label: 'Never', disabled: true },
      ]}
      value={frequency}
    />
  );
}
