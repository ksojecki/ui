import { render, screen } from '@testing-library/react';
import { Switch } from './Switch';

describe('Switch', () => {
  it('renders a labelled toggle without messages', () => {
    render(<Switch label="Notifications" />);

    const toggle = screen.getByLabelText('Notifications');
    expect(toggle.getAttribute('type')).toBe('checkbox');
    expect(toggle.className).toBe('toggle toggle-sm');
    expect(toggle.getAttribute('aria-invalid')).toBeNull();
    expect(toggle.getAttribute('aria-describedby')).toBeNull();
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('marks an errored toggle and links the error and hint', () => {
    render(<Switch error="Must be on" hint="Needed for alerts" label="Alerts" />);

    const toggle = screen.getByLabelText('Alerts');
    const alert = screen.getByRole('alert');
    expect(alert.textContent).toBe('Must be on');
    expect(toggle.className).toContain('toggle-error');
    expect(toggle.getAttribute('aria-invalid')).toBe('true');
    expect(toggle.getAttribute('aria-describedby')).toBe(
      [screen.getByText('Needed for alerts').id, alert.id].join(' '),
    );
  });

  it('keeps a caller description and toggles the value', () => {
    render(<Switch aria-describedby="external" label="Dark mode" />);

    const toggle = screen.getByLabelText('Dark mode') as HTMLInputElement;
    expect(toggle.getAttribute('aria-describedby')).toBe('external');
    expect(toggle.checked).toBe(false);
  });
});
