import { useState } from 'react';
import { Radio, RadioGroup } from '@ksojecki/ui/forms';

export default function RadioHorizontal() {
  const [size, setSize] = useState('m');

  return (
    <div className="flex flex-col gap-4">
      <RadioGroup
        legend="Size"
        name="size"
        onChange={setSize}
        options={[
          { value: 's', label: 'Small' },
          { value: 'm', label: 'Medium' },
          { value: 'l', label: 'Large' },
        ]}
        orientation="horizontal"
        value={size}
      />
      <Radio label="A single radio" name="single" />
    </div>
  );
}
