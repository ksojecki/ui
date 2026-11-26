import { fireEvent, render, screen } from '@testing-library/react';
import { Dropdown } from './Dropdown';

function renderDropdown(props: Partial<Parameters<typeof Dropdown>[0]> = {}) {
  return render(
    <Dropdown trigger="Open" {...props}>
      <button type="button">Choose</button>
    </Dropdown>,
  );
}

function getPanel() {
  const panel = screen.getByText('Choose').closest<HTMLElement>('[popover]');
  if (!panel) {
    throw new Error('Panel not found');
  }
  return panel;
}

describe('Dropdown', () => {
  it('links the trigger to the popover panel', () => {
    renderDropdown();

    const trigger = screen.getByRole('button', { name: 'Open' });
    const panel = getPanel();
    expect(trigger.getAttribute('aria-haspopup')).toBe('true');
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(panel.id).not.toBe('');
    expect(trigger.getAttribute('popovertarget')).toBe(panel.id);
  });

  it('uses the trigger label for icon-only triggers', () => {
    renderDropdown({ triggerLabel: 'Language', triggerSquare: true });

    expect(screen.getByRole('button', { name: 'Language' }).classList).toContain('btn-square');
  });

  it('applies the explicit trigger tone and class', () => {
    renderDropdown({ triggerClassName: 'text-primary-content', triggerTone: 'ghost' });

    const classes = screen.getByRole('button', { name: 'Open' }).classList;
    expect(classes).toContain('btn-ghost');
    expect(classes).toContain('text-primary-content');
  });

  it('hides the panel after a click inside it when closeOnSelect is set', () => {
    renderDropdown({ closeOnSelect: true });
    const panel = getPanel();
    panel.hidePopover = vi.fn<() => void>();

    fireEvent.click(screen.getByText('Choose'));

    expect(panel.hidePopover).toHaveBeenCalledTimes(1);
  });

  it('keeps the panel open on a click inside it by default', () => {
    renderDropdown();
    const panel = getPanel();
    panel.hidePopover = vi.fn<() => void>();

    fireEvent.click(screen.getByText('Choose'));

    expect(panel.hidePopover).not.toHaveBeenCalled();
  });

  it('hides the panel when a controlled open turns false', () => {
    const { rerender } = render(
      <Dropdown open trigger="Open">
        <button type="button">Choose</button>
      </Dropdown>,
    );
    const panel = getPanel();
    panel.showPopover = vi.fn<() => void>();
    panel.hidePopover = vi.fn<() => void>();

    rerender(
      <Dropdown open={false} trigger="Open">
        <button type="button">Choose</button>
      </Dropdown>,
    );

    expect(panel.hidePopover).toHaveBeenCalledTimes(1);
    expect(panel.showPopover).not.toHaveBeenCalled();
  });

  it('puts the id on the trigger button', () => {
    renderDropdown({ triggerId: 'date-trigger' });

    expect(screen.getByRole('button', { name: 'Open' }).id).toBe('date-trigger');
  });

  it('reports the open state from the toggle event', () => {
    const onOpenChange = vi.fn<() => void>();
    renderDropdown({ onOpenChange });
    const panel = getPanel();
    const toggle = new Event('toggle');
    Object.defineProperty(toggle, 'newState', { value: 'open' });

    fireEvent(panel, toggle);

    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole('button', { name: 'Open' }).getAttribute('aria-expanded')).toBe('true');
  });

  it('positions the panel from the start or end edge of the trigger', () => {
    const { unmount } = renderDropdown({ align: 'end' });
    expect(['bottom span-left', 'span-left bottom']).toContain(getPanel().style.positionArea);
    unmount();

    renderDropdown();
    expect(['bottom span-right', 'span-right bottom']).toContain(getPanel().style.positionArea);
  });

  it('disables the trigger and adds the extra class to it', () => {
    renderDropdown({ className: 'join-item', disabled: true });

    const trigger = screen.getByRole('button', { name: 'Open' });
    expect((trigger as HTMLButtonElement).disabled).toBe(true);
    expect(trigger.classList).toContain('join-item');
  });
});
