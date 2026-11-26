import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { FormActions } from './FormActions';

describe('FormActions', () => {
  it('renders a submit button and a cancel button in that order', () => {
    const onCancel = vi.fn<() => void>();
    render(<FormActions cancelLabel="Cancel" onCancel={onCancel} saveLabel="Save" />);

    const save = screen.getByRole('button', { name: 'Save' }) as HTMLButtonElement;
    expect(save.type).toBe('submit');
    expect(save.disabled).toBe(false);
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('shows the saving label and disables both buttons while saving', () => {
    render(
      <FormActions
        cancelLabel="Cancel"
        onCancel={() => undefined}
        saveLabel="Save"
        saving
        savingLabel="Saving"
      />,
    );

    expect((screen.getByRole('button', { name: 'Saving' }) as HTMLButtonElement).disabled).toBe(
      true,
    );
    expect((screen.getByRole('button', { name: 'Cancel' }) as HTMLButtonElement).disabled).toBe(
      true,
    );
  });

  it('keeps the save label while saving when no saving label is given', () => {
    render(<FormActions cancelLabel="Cancel" onCancel={() => undefined} saveLabel="Save" saving />);

    expect(screen.getByRole('button', { name: 'Save' })).toBeTruthy();
  });

  it('renders an assertive error alert above the buttons', () => {
    const { container } = render(
      <FormActions
        cancelLabel="Cancel"
        error="Could not save"
        onCancel={() => undefined}
        saveLabel="Save"
      />,
    );

    const alert = screen.getByRole('alert');
    expect(alert.textContent).toBe('Could not save');
    expect(alert.getAttribute('aria-live')).toBe('assertive');
    expect(alert.compareDocumentPosition(screen.getByRole('button', { name: 'Save' }))).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
    expect(container.firstElementChild?.tagName).toBe('DIV');
  });

  it('passes className to the wrapper', () => {
    const { container } = render(
      <FormActions
        className="sm:col-span-2"
        cancelLabel="Cancel"
        onCancel={() => undefined}
        saveLabel="Save"
      />,
    );

    expect((container.firstElementChild as HTMLElement).classList.contains('sm:col-span-2')).toBe(
      true,
    );
  });
});
