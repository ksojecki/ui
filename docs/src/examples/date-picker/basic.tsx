import { useState } from 'react';
import { DatePicker } from '@ksojecki/ui/forms';

export default function DatePickerBasic() {
  const [date, setDate] = useState('2026-03-14');

  return (
    <div className="flex max-w-xs flex-col gap-2">
      <label className="text-sm font-semibold" htmlFor="docs-date">
        Delivery date
      </label>
      <DatePicker
        id="docs-date"
        locale="en-GB"
        nextLabel="Next month"
        onChange={setDate}
        previousLabel="Previous month"
        value={date}
      />
    </div>
  );
}
