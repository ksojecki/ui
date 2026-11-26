import { render, screen } from '@testing-library/react';
import { DeleteButton, EditButton, NewButton } from './IconActionButtons';

describe('IconActionButtons', () => {
  it('gives each icon-only button the accessible name it is given', () => {
    render(
      <>
        <EditButton label="Edit item" onClick={() => undefined} />
        <NewButton label="Add item" onClick={() => undefined} />
        <DeleteButton label="Delete item" onClick={() => undefined} />
      </>,
    );

    expect(screen.getByRole('button', { name: 'Edit item' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Add item' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Delete item' })).toBeTruthy();
  });
});
