import { render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';
import { Button, ButtonSizeProvider } from '../actions/Button';
import { Link } from './Link';
import { TbPlus } from '../icons';

const renderLink = (element: ReactNode) => render(<MemoryRouter>{element}</MemoryRouter>);

describe('Link', () => {
  it('renders a plain link with the tone class and no ghost class', () => {
    const { unmount } = renderLink(<Link to="/home">Home</Link>);
    expect(screen.getByRole('link', { name: 'Home' }).className).toBe('link link-primary');
    unmount();

    renderLink(
      <Link tone="ghost" to="/home">
        Ghost
      </Link>,
    );
    const ghost = screen.getByRole('link', { name: 'Ghost' });
    expect(ghost.className).toBe('link');
    expect(ghost.className).not.toContain('link-ghost');
  });

  it('accepts a location object for `to`', () => {
    renderLink(<Link to={{ pathname: '/accounts', search: '?tab=1' }}>Accounts</Link>);

    expect(screen.getByRole('link', { name: 'Accounts' }).getAttribute('href')).toBe(
      '/accounts?tab=1',
    );
  });

  it('shares Button classes when rendered as a button', () => {
    renderLink(
      <>
        <Link asButton purpose="delete" to="/remove">
          Remove
        </Link>
        <Button purpose="delete">Remove button</Button>
      </>,
    );

    const link = screen.getByRole('link', { name: 'Remove' });
    const button = screen.getByRole('button', { name: 'Remove button' });
    expect(link.className).toBe(button.className);
    expect(link.classList.contains('btn-error')).toBe(true);
    expect(link.classList.contains('btn-soft')).toBe(true);
  });

  it('applies size, square and explicit tone to a button link', () => {
    renderLink(
      <Link asButton fullWidth size="sm" square tone="secondary" to="/add">
        <TbPlus />
      </Link>,
    );

    const link = screen.getByRole('link');
    expect(link.classList.contains('btn')).toBe(true);
    expect(link.classList.contains('btn-secondary')).toBe(true);
    expect(link.classList.contains('btn-sm')).toBe(true);
    expect(link.classList.contains('btn-square')).toBe(true);
    expect(link.classList.contains('w-full')).toBe(true);
  });

  it('takes its button size from the nearest ButtonSizeProvider unless it has its own', () => {
    renderLink(
      <ButtonSizeProvider size="sm">
        <Link asButton to="/inherit">
          Inherit
        </Link>
        <Link asButton size="lg" to="/own">
          Own
        </Link>
      </ButtonSizeProvider>,
    );

    expect(screen.getByRole('link', { name: 'Inherit' }).classList.contains('btn-sm')).toBe(true);
    expect(screen.getByRole('link', { name: 'Own' }).classList.contains('btn-lg')).toBe(true);
  });
});
