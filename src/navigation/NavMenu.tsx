import { useEffect, useId, useRef, useState, type ReactNode, type RefObject } from 'react';
import { Button } from '../actions/Button';
import { Menu, MenuTitle } from './Menu';
import { joinClassNames } from '../internal/classNames';
import {
  POPOVER_BACKDROP,
  POPOVER_BACKDROP_MOBILE,
  POPOVER_FADE_DESKTOP,
  POPOVER_FADE_MOBILE,
} from './popoverFade';

export interface NavMenuProps {
  children: ReactNode;
  /** Extra megamenu classes, such as a text colour for a coloured navbar. */
  className?: string;
  /** Text of the mobile toggle; also its accessible name. */
  label: string;
}

export interface NavMenuItemProps {
  children: ReactNode;
  label: ReactNode;
}

export interface NavMenuColumnProps {
  children: ReactNode;
  title?: string;
}

// Popover ids must be unique and must not contain the colons that useId returns.
function useNavMenuId(prefix: string) {
  return `${prefix}-${useId().replaceAll(/\W/g, '')}`;
}

// Trigger buttons open another popover, so they do not close the panel they sit in.
const SELECTABLE_SELECTOR = 'a, button:not([popovertarget])';

// Tracks the open state of a popover for `aria-expanded`, as Dropdown does.
function usePopoverOpen() {
  const [open, setOpen] = useState(false);
  return { open, onToggle: (event: { newState: string }) => setOpen(event.newState === 'open') };
}

// Native listener, as in Dropdown: hides the panel after a link or button in it is clicked.
// jsdom has no popover API, hence the optional call.
function useCloseAfterSelection(panelRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) {
      return;
    }
    const closeAfterSelection = (event: Event) => {
      if (event.target instanceof Element && event.target.closest(SELECTABLE_SELECTOR)) {
        panel.hidePopover?.();
      }
    };
    panel.addEventListener('click', closeAfterSelection);
    return () => panel.removeEventListener('click', closeAfterSelection);
  }, [panelRef]);
}

/**
 * Mobile toggle plus a horizontal megamenu on `md` and up; vertical below it.
 *
 * @example
 * ```tsx
 * <NavMenu label="Menu">
 *   <NavMenuItem label="Reports">
 *     <NavMenuColumn title="Sales">
 *       <MenuNavLink to="/reports/monthly">Monthly</MenuNavLink>
 *     </NavMenuColumn>
 *   </NavMenuItem>
 * </NavMenu>
 * ```
 */
export function NavMenu({ children, className, label }: NavMenuProps) {
  const id = useNavMenuId('megamenu');
  const panelRef = useRef<HTMLDivElement>(null);
  const popover = usePopoverOpen();
  useCloseAfterSelection(panelRef);

  return (
    <>
      <Button
        aria-expanded={popover.open}
        aria-haspopup="true"
        className="md:hidden"
        popoverTarget={id}
        size="sm"
        tone="ghost"
      >
        {label}
      </Button>
      <div
        className={joinClassNames(
          // Below `md` the megamenu is a floating panel (daisyUI leaves it transparent); from `md` it is the inline bar, which inherits the navbar ink instead of the popover's UA `CanvasText`.
          'megamenu max-md:megamenu-vertical md:gap-1 md:text-inherit max-md:rounded-box max-md:border max-md:border-base-300 max-md:bg-base-100 max-md:bg-linear-to-b max-md:from-(--surface-highlight) max-md:to-transparent max-md:fixed max-md:inset-x-3 max-md:[position-area:none] max-md:top-[4.9rem] max-md:bottom-auto max-md:m-0 max-md:w-auto max-md:p-2 max-md:text-base-content max-md:shadow-(--elevation-3)',
          POPOVER_FADE_MOBILE,
          POPOVER_BACKDROP_MOBILE,
          className,
        )}
        id={id}
        onToggle={popover.onToggle}
        popover="auto"
        ref={panelRef}
      >
        <span className="megamenu-active" />
        {children}
      </div>
    </>
  );
}

/**
 * Top-level megamenu button that opens its own panel; pass `NavMenuColumn`s as children.
 *
 * @example
 * ```tsx
 * <NavMenuItem label="Reports">
 *   <NavMenuColumn title="Sales">
 *     <MenuNavLink to="/reports/monthly">Monthly</MenuNavLink>
 *   </NavMenuColumn>
 * </NavMenuItem>
 * ```
 */
export function NavMenuItem({ children, label }: NavMenuItemProps) {
  const id = useNavMenuId('megamenu-item');
  const panelRef = useRef<HTMLDivElement>(null);
  const popover = usePopoverOpen();
  useCloseAfterSelection(panelRef);

  return (
    <>
      {/* Buttons take the megamenu's text colour from `md` up; below it they are group labels in muted ink (daisyUI's 40% dim fails contrast). From `md` the height, padding and gap match menu links so the trigger lines up with them in the bar. */}
      <button
        aria-expanded={popover.open}
        aria-haspopup="true"
        className="md:h-auto md:gap-2 md:border-0 md:px-3 md:py-1.5 md:text-inherit max-md:w-full max-md:justify-start max-md:pointer-events-none max-md:mt-1 max-md:h-auto max-md:min-h-0 max-md:rounded-none max-md:border-0 max-md:border-t max-md:border-base-300 max-md:px-4 max-md:py-2 max-md:shadow-none max-md:text-xs max-md:font-bold max-md:tracking-wider max-md:uppercase max-md:text-(--ink-muted)"
        popoverTarget={id}
        type="button"
      >
        {label}
      </button>
      <div
        className={joinClassNames(
          'text-base-content max-md:w-full md:[position-area:block-end_span-inline-start] md:bg-linear-to-b md:from-(--surface-highlight) md:to-transparent md:shadow-(--elevation-3)',
          POPOVER_FADE_DESKTOP,
          POPOVER_BACKDROP,
        )}
        id={id}
        onToggle={popover.onToggle}
        popover="auto"
        ref={panelRef}
      >
        <div className="flex max-md:flex-col max-md:items-stretch items-start gap-4 p-2 max-md:p-0">
          {children}
        </div>
      </div>
    </>
  );
}

/**
 * One column of links inside a `NavMenuItem` panel.
 *
 * @example
 * ```tsx
 * <NavMenuColumn title="Sales">
 *   <MenuNavLink to="/reports/monthly">Monthly</MenuNavLink>
 *   <MenuNavLink to="/reports/yearly">Yearly</MenuNavLink>
 * </NavMenuColumn>
 * ```
 */
export function NavMenuColumn({ children, title }: NavMenuColumnProps) {
  return (
    <Menu className="w-full">
      {title ? <MenuTitle>{title}</MenuTitle> : null}
      {children}
    </Menu>
  );
}
