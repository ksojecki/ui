import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ModalWindow, NativeDialog, type ModalWindowApi } from './ModalWindow';

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

describe('native dialog primitives', () => {
  it('syncs controlled open state and gates Escape and close callbacks while saving', () => {
    const onClose = vi.fn<() => void>();
    const { container, rerender } = render(
      <NativeDialog backdropLabel="Cancel" onClose={onClose} open={false}>
        <h2 id="title">Form</h2>
      </NativeDialog>,
    );
    const dialog = container.querySelector('dialog')!;
    expect(dialog.hasAttribute('open')).toBe(false);

    rerender(
      <NativeDialog backdropLabel="Cancel" labelledBy="title" onClose={onClose} open saving>
        <h2 id="title">Form</h2>
      </NativeDialog>,
    );
    expect(dialog.hasAttribute('open')).toBe(true);
    expect((dialog.querySelector('button') as HTMLButtonElement).disabled).toBe(true);
    const cancelEvent = new Event('cancel', { cancelable: true });
    fireEvent(dialog, cancelEvent);
    expect(cancelEvent.defaultPrevented).toBe(true);
    act(() => dialog.close());
    expect(onClose).not.toHaveBeenCalled();

    rerender(
      <NativeDialog backdropLabel="Cancel" labelledBy="title" onClose={onClose} open={false}>
        <h2 id="title">Form</h2>
      </NativeDialog>,
    );
    rerender(
      <NativeDialog backdropLabel="Cancel" labelledBy="title" onClose={onClose} open>
        <h2 id="title">Form</h2>
      </NativeDialog>,
    );
    // Without `saving`, a cancel event closes the dialog and reports it once.
    fireEvent(dialog, new Event('cancel', { cancelable: true }));
    expect((dialog.querySelector('button') as HTMLButtonElement).disabled).toBe(false);
    expect(dialog.hasAttribute('open')).toBe(false);
    expect(onClose).toHaveBeenCalledTimes(1);
    rerender(
      <NativeDialog backdropLabel="Cancel" labelledBy="title" onClose={onClose} open={false}>
        <h2 id="title">Form</h2>
      </NativeDialog>,
    );
    expect(dialog.hasAttribute('open')).toBe(false);
  });

  it('keeps the imperative ModalWindow API working', () => {
    const api: { current: ModalWindowApi | null } = { current: null };
    const { container } = render(
      <ModalWindow api={api} title="Existing modal">
        Existing content
      </ModalWindow>,
    );
    const dialog = container.querySelector('dialog')!;
    act(() => api.current?.show());
    expect(dialog.hasAttribute('open')).toBe(true);
    act(() => api.current?.close());
    expect(dialog.hasAttribute('open')).toBe(false);
  });
});

describe('dialog size and title', () => {
  it('keeps the ModalWindow default width and labels the dialog with its title', () => {
    const { container } = render(
      <ModalWindow api={{ current: null }} title="Account">
        Body
      </ModalWindow>,
    );

    const dialog = container.querySelector('dialog')!;
    const box = dialog.firstElementChild as HTMLElement;
    expect(box.classList.contains('w-11/12')).toBe(true);
    expect(box.classList.contains('max-w-5xl')).toBe(true);
    const title = screen.getByRole('heading', { name: 'Account', hidden: true });
    expect(dialog.getAttribute('aria-labelledby')).toBe(title.id);
  });

  it('applies the md and sm widths and leaves the default box unchanged without size', () => {
    const { container } = render(
      <>
        <ModalWindow size="md" api={{ current: null }} title="Medium">
          Body
        </ModalWindow>
        <ModalWindow size="sm" api={{ current: null }} title="Small">
          Body
        </ModalWindow>
        <NativeDialog>Plain</NativeDialog>
      </>,
    );

    const boxes = Array.from(container.querySelectorAll('dialog > div'));
    expect(boxes[0].classList.contains('max-w-2xl')).toBe(true);
    expect(boxes[1].classList.contains('max-w-md')).toBe(true);
    expect(boxes[2].className).toBe('modal-box animate-scale-in');
  });

  it('renders NativeDialog titles with the same heading markup as ModalWindow', () => {
    render(
      <>
        <ModalWindow api={{ current: null }} title="Windowed">
          Body
        </ModalWindow>
        <NativeDialog title="Native">Body</NativeDialog>
      </>,
    );

    const windowed = screen.getByRole('heading', { name: 'Windowed', hidden: true });
    const native = screen.getByRole('heading', { name: 'Native', hidden: true });
    expect(native.tagName).toBe(windowed.tagName);
    expect(native.className).toBe(windowed.className);
  });
});
