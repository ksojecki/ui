import { fireEvent, render, screen } from '@testing-library/react';
import { NavMenu, NavMenuColumn, NavMenuItem } from './NavMenu';
import { MenuItem } from './Menu';

function renderNavMenu() {
  return render(
    <NavMenu label="Menu">
      <NavMenuItem label="Shop">
        <NavMenuColumn title="Clothes">
          <MenuItem>
            <a href="/shop/shirts">Shirts</a>
          </MenuItem>
        </NavMenuColumn>
      </NavMenuItem>
      <NavMenuItem label="Help">
        <NavMenuColumn>
          <MenuItem>
            <a href="/help/faq">FAQ</a>
          </MenuItem>
        </NavMenuColumn>
      </NavMenuItem>
    </NavMenu>,
  );
}

function getPanelOf(link: HTMLElement) {
  const panel = link.closest<HTMLElement>('[popover]');
  if (!panel) {
    throw new Error('Panel not found');
  }
  return panel;
}

describe('NavMenu', () => {
  let hidePopover: ReturnType<typeof vi.fn<() => void>>;

  beforeEach(() => {
    hidePopover = vi.fn<() => void>();
    Object.defineProperty(HTMLElement.prototype, 'hidePopover', {
      configurable: true,
      value: hidePopover,
      writable: true,
    });
  });

  afterEach(() => {
    Reflect.deleteProperty(HTMLElement.prototype, 'hidePopover');
  });

  it('renders the mobile toggle and the item triggers', () => {
    renderNavMenu();

    const toggle = screen.getByRole('button', { name: 'Menu' });
    expect(toggle.classList).toContain('btn');
    expect(toggle.classList).toContain('btn-ghost');
    expect(toggle.classList).toContain('md:hidden');
    expect(screen.getByRole('button', { hidden: true, name: 'Shop' })).toBeTruthy();
    expect(screen.getByRole('button', { hidden: true, name: 'Help' })).toBeTruthy();
  });

  it('puts the links in the panel of their item', () => {
    renderNavMenu();

    const shopTrigger = screen.getByRole('button', { hidden: true, name: 'Shop' });
    const panel = getPanelOf(screen.getByRole('link', { hidden: true, name: 'Shirts' }));
    expect(panel.id).not.toBe('');
    expect(shopTrigger.getAttribute('popovertarget')).toBe(panel.id);
    expect(screen.getByText('Clothes').classList).toContain('menu-title');
  });

  it('hides the item panel after a link is clicked', () => {
    renderNavMenu();

    const link = screen.getByRole('link', { hidden: true, name: 'Shirts' });
    fireEvent.click(link);

    expect(hidePopover).toHaveBeenCalled();
    expect(hidePopover.mock.contexts).toContain(getPanelOf(link));
  });

  it('does not hide the panel when an item trigger is clicked', () => {
    renderNavMenu();

    fireEvent.click(screen.getByRole('button', { hidden: true, name: 'Shop' }));

    expect(hidePopover).not.toHaveBeenCalled();
  });

  it('gives each item its own popover id', () => {
    renderNavMenu();

    const shopId = getPanelOf(screen.getByRole('link', { hidden: true, name: 'Shirts' })).id;
    const helpId = getPanelOf(screen.getByRole('link', { hidden: true, name: 'FAQ' })).id;
    expect(shopId).not.toBe(helpId);
    expect(
      screen.getByRole('button', { hidden: true, name: 'Shop' }).getAttribute('popovertarget'),
    ).toBe(shopId);
    expect(
      screen.getByRole('button', { hidden: true, name: 'Help' }).getAttribute('popovertarget'),
    ).toBe(helpId);
  });
});
