import {
  cloneElement,
  createElement,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import { NavLink, type To } from 'react-router';
import type { ButtonSize } from '../actions/Button';
import { joinClassNames } from '../internal/classNames';

export type MenuSize = ButtonSize;

export interface MenuProps {
  children: ReactNode;
  className?: string;
  horizontal?: boolean;
  size?: MenuSize;
}

export interface MenuItemProps {
  /** A single link or button. The state classes are added to it. */
  children: ReactElement<AnchorHTMLAttributes<HTMLAnchorElement> & { disabled?: boolean; to?: To }>;
  active?: boolean;
  disabled?: boolean;
}

export interface MenuNavLinkProps {
  children: ReactNode;
  /** Match the route only when it is exactly `to`. */
  end?: boolean;
  to: To;
}

// Literal class names so Tailwind's scanner picks them up.
const MENU_SIZE_CLASS_NAMES: Record<MenuSize, string> = {
  xs: 'menu-xs',
  sm: 'menu-sm',
  md: '',
  lg: 'menu-lg',
};

/**
 * Vertical list of links or buttons; `horizontal` lays the items out in a row.
 *
 * @example
 * ```tsx
 * <Menu>
 *   <MenuTitle>Account</MenuTitle>
 *   <MenuNavLink to="/profile">Profile</MenuNavLink>
 *   <MenuItem>
 *     <MenuButton onClick={signOut}>Sign out</MenuButton>
 *   </MenuItem>
 * </Menu>
 * ```
 */
export function Menu({ children, className, horizontal = false, size = 'md' }: MenuProps) {
  return (
    <ul
      className={joinClassNames(
        'menu',
        horizontal ? 'menu-horizontal' : undefined,
        MENU_SIZE_CLASS_NAMES[size],
        className,
      )}
    >
      {children}
    </ul>
  );
}

function isMenuLink(children: MenuItemProps['children']) {
  return (
    children.type === 'a' || children.props.href !== undefined || children.props.to !== undefined
  );
}

function disabledMenuLink(children: MenuItemProps['children'], className: string) {
  const { href: _href, onClick: _onClick, to: _to, ...props } = children.props;
  return createElement('a', { ...props, 'aria-disabled': true, className, role: 'link' });
}

/**
 * Wraps one link or button in an `li`; `active` and `disabled` mark the child.
 *
 * @example
 * ```tsx
 * <MenuItem disabled>
 *   <MenuButton>Archive</MenuButton>
 * </MenuItem>
 * ```
 */
export function MenuItem({ children, active = false, disabled = false }: MenuItemProps) {
  const className = joinClassNames(
    children.props.className,
    active ? 'menu-active' : undefined,
    disabled ? 'menu-disabled' : undefined,
  );

  if (disabled && isMenuLink(children)) {
    return <li>{disabledMenuLink(children, className)}</li>;
  }

  if (disabled) {
    return <li>{cloneElement(children, { className, disabled: true })}</li>;
  }

  return <li>{cloneElement(children, { className: className || undefined })}</li>;
}

/**
 * Plain button for a `MenuItem`: menu row styling, not the `btn` look. Pass `aria-current` for the selected row.
 *
 * @example
 * ```tsx
 * <MenuItem>
 *   <MenuButton aria-current="true" onClick={showAll}>
 *     All
 *   </MenuButton>
 * </MenuItem>
 * ```
 */
export function MenuButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" {...props} />;
}

/**
 * Non-interactive row that labels the menu items after it.
 *
 * @example
 * ```tsx
 * <MenuTitle>Account</MenuTitle>
 * ```
 */
export function MenuTitle({ children }: { children: ReactNode }) {
  return <li className="menu-title">{children}</li>;
}

/**
 * Router link in a menu item that gets `menu-active` while its route matches.
 *
 * @example
 * ```tsx
 * <Menu>
 *   <MenuNavLink end to="/">
 *     Overview
 *   </MenuNavLink>
 *   <MenuNavLink to="/invoices">Invoices</MenuNavLink>
 * </Menu>
 * ```
 */
export function MenuNavLink({ children, end = false, to }: MenuNavLinkProps) {
  return (
    <li>
      <NavLink className={({ isActive }) => (isActive ? 'menu-active' : '')} end={end} to={to}>
        {children}
      </NavLink>
    </li>
  );
}
