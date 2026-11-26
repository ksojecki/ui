import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { vi } from 'vitest';
import { ConsentBanner, type ConsentBannerProps } from './ConsentBanner';

const props = (): ConsentBannerProps => ({
  title: 'We use cookies',
  body: 'Choose what we may measure.',
  policyLink: { label: 'Privacy policy', to: '/privacy' },
  settingsLabel: 'Settings',
  rejectLabel: 'Reject',
  acceptLabel: 'Accept',
  onSettings: vi.fn<() => void>(),
  onReject: vi.fn<() => void>(),
  onAccept: vi.fn<() => void>(),
});

const renderBanner = (overrides: Partial<ConsentBannerProps> = {}) => {
  const banner = { ...props(), ...overrides };
  render(
    <MemoryRouter>
      <ConsentBanner {...banner} />
    </MemoryRouter>,
  );
  return banner;
};

describe('ConsentBanner', () => {
  it('renders a labelled region with its texts and policy link', () => {
    renderBanner();

    const region = screen.getByRole('region', { name: 'We use cookies' });
    expect(region.textContent).toContain('Choose what we may measure.');
    expect(screen.getByRole('link', { name: 'Privacy policy' }).getAttribute('href')).toBe(
      '/privacy',
    );
  });

  it('calls the reject, accept and settings callbacks', () => {
    const banner = renderBanner();

    fireEvent.click(screen.getByRole('button', { name: 'Reject' }));
    fireEvent.click(screen.getByRole('button', { name: 'Accept' }));
    fireEvent.click(screen.getByRole('button', { name: 'Settings' }));

    expect(banner.onReject).toHaveBeenCalledTimes(1);
    expect(banner.onAccept).toHaveBeenCalledTimes(1);
    expect(banner.onSettings).toHaveBeenCalledTimes(1);
  });

  it('gives reject and accept the same style and no pre-selected state', () => {
    renderBanner();

    const reject = screen.getByRole('button', { name: 'Reject' });
    const accept = screen.getByRole('button', { name: 'Accept' });
    expect(reject.className).toBe(accept.className);
    expect(reject.getAttribute('aria-pressed')).toBeNull();
    expect(accept.getAttribute('aria-pressed')).toBeNull();
    expect(screen.queryByRole('checkbox')).toBeNull();
  });
});
