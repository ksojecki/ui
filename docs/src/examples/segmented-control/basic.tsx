import { useState } from 'react';
import { SegmentedControl } from '@ksojecki/ui/forms';

export default function SegmentedControlBasic() {
  const [period, setPeriod] = useState('month');

  return (
    <SegmentedControl
      label="Period"
      onChange={setPeriod}
      options={[
        { value: 'week', label: 'Week' },
        { value: 'month', label: 'Month' },
        { value: 'year', label: 'Year' },
      ]}
      value={period}
    />
  );
}
