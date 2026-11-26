import { render, screen } from '@testing-library/react';
import { Table } from './Table';

describe('Table', () => {
  it('wraps a full-width table in a horizontally scrolling container', () => {
    const { container } = render(
      <Table aria-label="Accounts">
        <tbody>
          <tr>
            <td>Main</td>
          </tr>
        </tbody>
      </Table>,
    );

    const wrapper = container.firstElementChild;
    expect(wrapper?.className).toBe('overflow-x-auto');
    const table = screen.getByRole('table', { name: 'Accounts' });
    expect(table.className).toBe('table table-sm w-full');
    expect(table.parentElement).toBe(wrapper);
  });

  it('maps table sizes to daisyUI classes and omits the class for md', () => {
    render(
      <>
        <Table aria-label="Extra small" tableSize="xs" />
        <Table aria-label="Medium" tableSize="md" />
        <Table aria-label="Large" tableSize="lg" />
      </>,
    );

    expect(screen.getByRole('table', { name: 'Extra small' }).className).toBe(
      'table table-xs w-full',
    );
    expect(screen.getByRole('table', { name: 'Medium' }).className).toBe('table w-full');
    expect(screen.getByRole('table', { name: 'Large' }).className).toBe('table table-lg w-full');
  });

  it('makes the scrolling wrapper a named, keyboard-focusable region when labelled', () => {
    const { container, rerender } = render(<Table label="Accounts" aria-label="Accounts table" />);

    const wrapper = container.firstElementChild;
    expect(wrapper?.getAttribute('role')).toBe('region');
    expect(wrapper?.getAttribute('aria-label')).toBe('Accounts');
    expect(wrapper?.getAttribute('tabindex')).toBe('0');

    rerender(<Table aria-label="Accounts table" />);
    expect(container.firstElementChild?.hasAttribute('role')).toBe(false);
    expect(container.firstElementChild?.hasAttribute('tabindex')).toBe(false);
  });

  it('adds zebra striping and merges wrapper and table classes', () => {
    const { container } = render(
      <Table className="custom-table" wrapperClassName="rounded-box" zebra aria-label="Rows" />,
    );

    expect(container.firstElementChild?.className).toBe('overflow-x-auto rounded-box');
    expect(screen.getByRole('table', { name: 'Rows' }).className).toBe(
      'table table-sm table-zebra w-full custom-table',
    );
  });
});
