import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
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
