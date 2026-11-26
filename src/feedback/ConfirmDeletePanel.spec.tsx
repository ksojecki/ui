import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { ConfirmDeletePanel } from './ConfirmDeletePanel';

const renderPanel = (props: Partial<Parameters<typeof ConfirmDeletePanel>[0]> = {}) => {
  const onCancel = vi.fn<() => void>();
  const onConfirm = vi.fn<() => void>();
  render(
    <ConfirmDeletePanel
      cancelLabel="Cancel"
      confirmLabel="Delete"
      onCancel={onCancel}
      onConfirm={onConfirm}
      {...props}
    />,
  );
  return { onCancel, onConfirm };
};

describe('ConfirmDeletePanel', () => {
  it('renders cancel before delete and calls the matching handler', () => {
    const { onCancel, onConfirm } = renderPanel();

    const buttons = screen.getAllByRole('button');
    expect(buttons.map((button) => button.getAttribute('aria-label'))).toEqual([
      'Cancel',
      'Delete',
    ]);
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('disables both buttons while saving', () => {
    renderPanel({ saving: true });

    expect((screen.getByRole('button', { name: 'Cancel' }) as HTMLButtonElement).disabled).toBe(
      true,
    );
    expect((screen.getByRole('button', { name: 'Delete' }) as HTMLButtonElement).disabled).toBe(
      true,
    );
  });

  it('renders children, a static warning and an announced error in order', () => {
    renderPanel({
      children: <p>Choose a target</p>,
      error: 'Delete failed',
      warning: 'This cannot be undone',
    });

    const warning = screen.getByText('This cannot be undone');
    expect(warning.closest('[role]')).toBeNull();
    expect(screen.getByRole('alert').textContent).toBe('Delete failed');
    expect(
      screen.getByText('Choose a target').compareDocumentPosition(warning) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('omits the warning and error when they are not given', () => {
    renderPanel();

    expect(screen.queryByRole('alert')).toBeNull();
    expect(screen.queryByText('This cannot be undone')).toBeNull();
  });
});
