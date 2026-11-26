import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { afterEach, vi } from 'vitest';
import { ConsentSettings, type ConsentSettingsProps } from './ConsentSettings';

// jsdom has no native dialog support; mirror the open state and the close event.
function showModal(this: HTMLDialogElement) {
  this.setAttribute('open', '');
}

function closeDialog(this: HTMLDialogElement) {
  this.removeAttribute('open');
  this.dispatchEvent(new Event('close'));
}

HTMLDialogElement.prototype.showModal = showModal;
HTMLDialogElement.prototype.close = closeDialog;

afterEach(cleanup);

const props = (overrides: Partial<ConsentSettingsProps> = {}): ConsentSettingsProps => ({
  open: true,
  rumEnabled: false,
  onSave: vi.fn<(rum: boolean) => void>(),
  onAcceptAll: vi.fn<() => void>(),
  onClose: vi.fn<() => void>(),
  title: 'Cookie settings',
  intro: 'Choose which categories we may use.',
  necessaryLabel: 'Necessary',
  necessaryDescription: 'Required for the site to work.',
  rumLabel: 'Usage statistics (Dynatrace)',
  rumDescription: 'Helps us understand page performance.',
  saveLabel: 'Save choice',
  acceptAllLabel: 'Accept all',
  closeLabel: 'Close',
  policyLink: { label: 'Privacy policy', to: '/privacy' },
  ...overrides,
});

const renderSettings = (overrides: Partial<ConsentSettingsProps> = {}) => {
  const settings = props(overrides);
  const view = render(
    <MemoryRouter>
      <ConsentSettings {...settings} />
    </MemoryRouter>,
  );
  return { ...view, settings };
};

describe('ConsentSettings', () => {
  it('shows the necessary category as checked and disabled', () => {
    renderSettings();

    const necessary = screen.getByLabelText('Necessary') as HTMLInputElement;
    expect(necessary.checked).toBe(true);
    expect(necessary.disabled).toBe(true);
    expect(screen.getByText('Required for the site to work.')).toBeTruthy();
  });

  it('reflects the rumEnabled prop in the statistics switch', () => {
    renderSettings({ rumEnabled: true });

    expect(
      (screen.getByLabelText('Usage statistics (Dynatrace)') as HTMLInputElement).checked,
    ).toBe(true);
  });

  it('saves the toggled statistics value only when Save is clicked', () => {
    const { settings } = renderSettings();

    fireEvent.click(screen.getByLabelText('Usage statistics (Dynatrace)'));
    expect(settings.onSave).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'Save choice' }));
    expect(settings.onSave).toHaveBeenCalledWith(true);
  });

  it('calls onAcceptAll from the accept-all button', () => {
    const { settings } = renderSettings();

    fireEvent.click(screen.getByRole('button', { name: 'Accept all' }));
    expect(settings.onAcceptAll).toHaveBeenCalledTimes(1);
  });

  it('closes when open is false and reports Escape through onClose', () => {
    const { container, rerender, settings } = renderSettings({ open: false });
    const dialog = container.querySelector('dialog')!;
    expect(dialog.hasAttribute('open')).toBe(false);

    rerender(
      <MemoryRouter>
        <ConsentSettings {...settings} open />
      </MemoryRouter>,
    );
    expect(dialog.hasAttribute('open')).toBe(true);

    act(() => dialog.close());
    expect(settings.onClose).toHaveBeenCalledTimes(1);
  });
});
