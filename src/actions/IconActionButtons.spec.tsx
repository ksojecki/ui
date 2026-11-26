import { render, screen } from '@testing-library/react';
import { DeleteButton, EditButton, NewButton } from './IconActionButtons';

describe('IconActionButtons', () => {
  it('gives each icon-only button the accessible name it is given', () => {
    render(
      <>
        <EditButton label="Edit account" onClick={() => undefined} />
        <NewButton label="Add transaction" onClick={() => undefined} />
        <DeleteButton label="Delete transaction" onClick={() => undefined} />
      </>,
    );

    expect(screen.getByRole('button', { name: 'Edit account' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Add transaction' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Delete transaction' })).toBeTruthy();
  });
});
