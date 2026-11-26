import { render, screen } from '@testing-library/react';
import { DatePicker } from './DatePicker';

function renderPicker(value: string) {
  render(
    <DatePicker
      id="date"
      locale="en-GB"
      nextLabel="Next month"
      onChange={vi.fn<(value: string) => void>()}
      previousLabel="Previous month"
      value={value}
    />,
  );
}

describe('DatePicker', () => {
  it('formats the value for the locale in the trigger', () => {
    renderPicker('2030-02-03');

    expect(screen.getByRole('button', { hidden: true, name: '03/02/2030' })).toBeTruthy();
  });

  it('shows a dash for an invalid value', () => {
    renderPicker('');

    expect(screen.getByRole('button', { hidden: true, name: '—' })).toBeTruthy();
  });
});
