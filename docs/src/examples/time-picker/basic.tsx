import { useState } from 'react';
import { TimePicker } from '@ksojecki/ui/forms';

export default function TimePickerBasic() {
  const [time, setTime] = useState('08:30');

  return (
    <div className="max-w-xs">
      <TimePicker
        changeHourLabel="Change hour"
        id="docs-time"
        label="Departure"
        onChange={setTime}
        selectHourLabel="Hour"
        selectMinuteLabel="Minute"
        value={time}
      />
    </div>
  );
}
