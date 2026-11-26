import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { TimePicker } from './TimePicker';

function ControlledPicker() {
  const [value, setValue] = useState('08:15');
  return (
    <TimePicker
      changeHourLabel="Change hour"
      id="time"
      label="Time"
      onChange={setValue}
      selectHourLabel="Select hour"
      selectMinuteLabel="Select minute"
      value={value}
    />
  );
}

function renderPicker(props: Partial<Parameters<typeof TimePicker>[0]> = {}) {
  const onChange = vi.fn<(value: string) => void>();
  render(
    <TimePicker
      changeHourLabel="Change hour"
      id="time"
      label="Time"
      onChange={onChange}
      selectHourLabel="Select hour"
      selectMinuteLabel="Select minute"
      value="08:15"
      {...props}
    />,
  );
  return onChange;
}

describe('TimePicker', () => {
  it('picks an hour, then a minute, and reports HH:MM', () => {
    const onChange = renderPicker();

    fireEvent.click(screen.getByRole('button', { hidden: true, name: 'Time, 08:15' }));
    fireEvent.click(screen.getByRole('button', { hidden: true, name: '09' }));
    fireEvent.click(screen.getByRole('button', { hidden: true, name: '30' }));

    expect(onChange).toHaveBeenCalledWith('09:30');
  });

  it('includes the selected time in the accessible name after changing it', () => {
    render(<ControlledPicker />);
    const trigger = screen.getByRole('button', { name: 'Time, 08:15' });
    fireEvent.click(trigger);
    fireEvent.click(screen.getByRole('button', { hidden: true, name: '09' }));
    fireEvent.click(screen.getByRole('button', { hidden: true, name: '30' }));

    expect(screen.getByRole('button', { name: 'Time, 09:30' })).toBe(trigger);
  });

  it('offers no hours or minutes after max', () => {
    renderPicker({ max: '22:30' });

    fireEvent.click(screen.getByRole('button', { hidden: true, name: 'Time, 08:15' }));
    expect(screen.queryByRole('button', { hidden: true, name: '23' })).toBeNull();

    fireEvent.click(screen.getByRole('button', { hidden: true, name: '22' }));
    expect(screen.getByRole('button', { hidden: true, name: '30' })).toBeTruthy();
    expect(screen.queryByRole('button', { hidden: true, name: '35' })).toBeNull();
  });

  it('returns to the hour list from the minute list', () => {
    renderPicker();

    fireEvent.click(screen.getByRole('button', { hidden: true, name: 'Time, 08:15' }));
    fireEvent.click(screen.getByRole('button', { hidden: true, name: '09' }));
    fireEvent.click(screen.getByRole('button', { hidden: true, name: 'Change hour' }));

    expect(screen.getByRole('button', { hidden: true, name: '10' })).toBeTruthy();
  });
});
