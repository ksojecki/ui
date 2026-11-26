import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Link } from './Link';
import { Menu, MenuButton, MenuItem, MenuNavLink, MenuTitle } from './Menu';

describe('Menu', () => {
  it('renders a ul.menu with the horizontal and size classes', () => {
    const { container } = render(
      <Menu horizontal size="sm">
        <MenuItem>
          <button type="button">Item</button>
        </MenuItem>
      </Menu>,
    );

    const list = container.querySelector('ul');
    expect(list?.className).toBe('menu menu-horizontal menu-sm');
  });

  it('adds menu-active and menu-disabled to the child of a MenuItem', () => {
    render(
      <Menu>
        <MenuItem active>
          <button type="button">Active</button>
        </MenuItem>
        <MenuItem disabled>
          <button type="button">Disabled</button>
        </MenuItem>
      </Menu>,
    );

    expect(screen.getByRole('button', { name: 'Active' }).classList.contains('menu-active')).toBe(
      true,
    );
    expect(screen.getByRole('button', { name: 'Disabled' }).className).toBe('menu-disabled');
  });

  it('renders a menu title as li.menu-title', () => {
    const { container } = render(
      <Menu>
        <MenuTitle>Section</MenuTitle>
      </Menu>,
    );

    expect(container.querySelector('li')?.className).toBe('menu-title');
  });

  it.each([MenuButton, 'button'] as const)(
    'prevents Enter, Space, and click from activating a disabled %s',
    (ItemButton) => {
      const activate = vi.fn<() => void>();
      render(
        <Menu>
          <MenuItem disabled>
            <ItemButton onClick={activate} type="button">
              Unavailable
            </ItemButton>
          </MenuItem>
        </Menu>,
      );

      const button = screen.getByRole<HTMLButtonElement>('button', { name: 'Unavailable' });
      expect(button.disabled).toBe(true);
      button.focus();
      expect(document.activeElement).not.toBe(button);
      for (const key of ['Enter', ' ']) {
        fireEvent.keyDown(button, { key });
        fireEvent.keyUp(button, { key });
      }
      fireEvent.click(button);
      expect(activate).not.toHaveBeenCalled();
    },
  );

  it('renders disabled native and router links without navigable destinations', () => {
    const activate = vi.fn<() => void>();
    render(
      <MemoryRouter>
        <Menu>
          <MenuItem disabled>
            <a aria-label="Native collection" href="/collection" onClick={activate} title="Details">
              Native
            </a>
          </MenuItem>
          <MenuItem disabled>
            <Link aria-labelledby="router-label" onClick={activate} to="/collection">
              <span id="router-label">Router collection</span>
            </Link>
          </MenuItem>
        </Menu>
      </MemoryRouter>,
    );

    const native = screen.getByRole('link', { name: 'Native collection' });
    expect(native.getAttribute('title')).toBe('Details');
    const router = screen.getByRole('link', { name: 'Router collection' });
    const links = [native, router];
    for (const link of links) {
      expect(link.hasAttribute('href')).toBe(false);
      expect(link.getAttribute('aria-disabled')).toBe('true');
      expect(link.classList).toContain('menu-disabled');
      link.focus();
      expect(document.activeElement).not.toBe(link);
      fireEvent.click(link);
    }
    expect(activate).not.toHaveBeenCalled();
  });

  it('marks only the NavLink whose route matches', () => {
    render(
      <MemoryRouter initialEntries={['/library/collection']}>
        <Menu>
          <MenuNavLink end to="/library">
            Library
          </MenuNavLink>
          <MenuNavLink to="/library/collection">Collection</MenuNavLink>
        </Menu>
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: 'Collection' }).classList.contains('menu-active')).toBe(
      true,
    );
    expect(screen.getByRole('link', { name: 'Library' }).classList.contains('menu-active')).toBe(
      false,
    );
  });

  it('renders a MenuButton as a plain button that keeps its aria attributes', () => {
    render(
      <Menu>
        <MenuItem active>
          <MenuButton aria-current="date">2026</MenuButton>
        </MenuItem>
      </Menu>,
    );

    const button = screen.getByRole('button', { name: '2026' });
    expect(button.getAttribute('aria-current')).toBe('date');
    expect(button.classList).toContain('menu-active');
    expect(button.classList).not.toContain('btn');
  });
});
