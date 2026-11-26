import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { Radio, RadioGroup } from './Radio';

const CHANNEL_OPTIONS = [
  { value: 'a', label: 'Email' },
  { value: 'b', label: 'SMS' },
];

const RadioGroupHarness = () => {
  const [value, setValue] = useState('a');
  return (
    <RadioGroup
      error="Choose a channel"
      hint="Pick one option"
      legend="Channel"
      name="channel"
      onChange={setValue}
      options={CHANNEL_OPTIONS}
      value={value}
    />
  );
};

describe('Radio', () => {
  it('shows the error as an alert and links it from the radio', () => {
    render(<Radio error="Pick one" label="Yes" name="q" value="yes" />);

    const radio = screen.getByLabelText('Yes');
    const alert = screen.getByRole('alert');
    expect(alert.textContent).toBe('Pick one');
    expect(radio.getAttribute('aria-describedby')).toBe(alert.id);
  });

  it('links a hint without an error and keeps the caller description', () => {
    render(
      <>
        <span id="external">Shared note</span>
        <Radio
          aria-describedby="external"
          hint="Visible to all"
          label="Public"
          name="q"
          value="public"
        />
      </>,
    );

    const radio = screen.getByLabelText('Public');
    expect(radio.getAttribute('aria-invalid')).toBeNull();
    expect(radio.getAttribute('aria-describedby')).toBe(
      ['external', screen.getByText('Visible to all').id].join(' '),
    );
  });
});

describe('RadioGroup', () => {
  it('marks the radiogroup invalid and links the error and hint from every radio', () => {
    render(<RadioGroupHarness />);

    const alert = screen.getByRole('alert');
    const describedBy = [screen.getByText('Pick one option').id, alert.id].join(' ');
    expect(alert.textContent).toBe('Choose a channel');
    expect(screen.getByRole('radiogroup').getAttribute('aria-invalid')).toBe('true');
    for (const radio of screen.getAllByRole('radio')) {
      expect(radio.getAttribute('aria-describedby')).toBe(describedBy);
    }
    expect(screen.getByRole('group', { name: 'Channel' }).getAttribute('aria-describedby')).toBe(
      describedBy,
    );

    fireEvent.click(screen.getByLabelText('SMS'));
    expect(screen.getByLabelText('SMS')).toHaveProperty('checked', true);
  });
});
