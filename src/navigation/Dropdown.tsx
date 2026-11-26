import { useEffect, useId, useRef, useState, type ReactNode, type RefObject } from 'react';
import { Button, type ButtonSize, type ButtonTone } from '../actions/Button';
import type { ActionPurpose } from '../internal/purpose';
import { joinClassNames } from '../internal/classNames';
import { POPOVER_FADE } from './popoverFade';

export type DropdownAlign = 'start' | 'end';

export interface DropdownProps {
  children: ReactNode;
  /** Extra panel classes, such as a width. */
  contentClassName?: string;
  /** Hide the panel after a click on a link or button inside it. */
  closeOnSelect?: boolean;
  /** Disables the trigger. */
  disabled?: boolean;
  /** Alias of `triggerClassName`: both are joined onto the trigger. `ButtonGroup` adds `join-item` through it. */
  className?: string;
  align?: DropdownAlign;
  /** Fires from the popover `toggle` event with the new open state. */
  onOpenChange?: (open: boolean) => void;
  /** Controlled open state, for a parent that closes the panel after a choice. Omit it for the native popover. */
  open?: boolean;
  trigger: ReactNode;
  /** Extra trigger classes, such as a text colour for a coloured header. */
  triggerClassName?: string;
  /** `aria-label` for icon-only triggers. */
  triggerLabel?: string;
  /** Id of the trigger button, for a `<label htmlFor>`. */
  triggerId?: string;
  triggerPurpose?: ActionPurpose;
  /** Explicit trigger tone; wins over the tone of `triggerPurpose`. */
  triggerTone?: ButtonTone;
  triggerSize?: ButtonSize;
  triggerSquare?: boolean;
}

// Literal values so the panel hangs from the trigger's start or end edge.
const PANEL_POSITION_AREA: Record<DropdownAlign, string> = {
  start: 'bottom span-right',
  end: 'bottom span-left',
};

/** Shows or hides the native panel when the parent sets `open`. Omitted `open` leaves it to the platform. */
function useControlledPopover(panelRef: RefObject<HTMLElement | null>, open: boolean | undefined) {
  useEffect(() => {
    const panel = panelRef.current;
    if (open === undefined || !panel) {
      return;
    }
    if (open) {
      panel.showPopover?.();
    } else {
      panel.hidePopover?.();
    }
  }, [open, panelRef]);
}

// Native popover, not daisyUI's focus-based dropdown: Escape, light dismiss and focus return come from the platform.
export function Dropdown({
  children,
  className,
  contentClassName,
  closeOnSelect = false,
  disabled = false,
  align = 'start',
  onOpenChange,
  open: controlledOpen,
  trigger,
  triggerClassName,
  triggerId,
  triggerLabel,
  triggerPurpose = 'neutral',
  triggerSize,
  triggerSquare = false,
  triggerTone,
}: DropdownProps) {
  const id = useId();
  const anchorName = `--dropdown-${id.replaceAll(/\W/g, '')}`;
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  function handleToggle(event: { newState: string }) {
    const isOpen = event.newState === 'open';
    setOpen(isOpen);
    onOpenChange?.(isOpen);
  }

  useEffect(() => {
    const panel = panelRef.current;
    if (!closeOnSelect || !panel) {
      return;
    }
    const closeAfterSelect = (event: Event) => {
      if (event.target instanceof Element && event.target.closest('a, button')) {
        panel.hidePopover?.();
      }
    };
    panel.addEventListener('click', closeAfterSelect);
    return () => panel.removeEventListener('click', closeAfterSelect);
  }, [closeOnSelect]);

  useControlledPopover(panelRef, controlledOpen);

  return (
    <>
      <Button
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={triggerLabel}
        className={joinClassNames(triggerClassName, className)}
        disabled={disabled}
        id={triggerId}
        popoverTarget={id}
        purpose={triggerPurpose}
        size={triggerSize}
        square={triggerSquare}
        style={{ anchorName }}
        tone={triggerTone}
      >
        {trigger}
      </Button>
      <div
        className={joinClassNames(
          'z-10 mt-2 rounded-box border border-base-300 bg-base-100 p-2 bg-linear-to-b from-(--surface-highlight) to-transparent text-base-content shadow-(--elevation-3)',
          POPOVER_FADE,
          contentClassName,
        )}
        id={id}
        onToggle={handleToggle}
        popover="auto"
        ref={panelRef}
        style={{ positionAnchor: anchorName, positionArea: PANEL_POSITION_AREA[align] }}
      >
        {children}
      </div>
    </>
  );
}
