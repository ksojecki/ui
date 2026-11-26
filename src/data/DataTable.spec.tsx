import { render, screen, within } from '@testing-library/react';
import { DataTable } from './DataTable';

interface Row {
  id: number;
  accountName: string;
  balance: number;
}

const rows: Row[] = [
  { id: 1, accountName: 'Main', balance: 12 },
  { id: 2, accountName: 'Savings', balance: 340 },
];

describe('DataTable', () => {
  it('infers columns and humanised headers from the first row', () => {
    render(<DataTable aria-label="Accounts" rows={rows} />);

    const table = screen.getByRole('table', { name: 'Accounts' });
    expect(
      within(table)
        .getAllByRole('columnheader')
        .map((th) => th.textContent),
    ).toEqual(['Id', 'Account name', 'Balance']);
    expect(within(table).getByText('Savings')).toBeTruthy();
  });

  it('aligns number columns, formats values and renders computed columns', () => {
    render(
      <DataTable
        aria-label="Accounts"
        rows={rows}
        columns={[
          { key: 'accountName', header: 'Name' },
          { key: 'balance', header: 'Balance', kind: 'number', format: (value) => `${value} zł` },
          { id: 'edit', header: 'Edit', srOnlyHeader: true, render: (row) => `edit ${row.id}` },
          { key: 'id', hidden: true },
        ]}
      />,
    );

    expect(screen.getAllByRole('columnheader')).toHaveLength(3);
    expect(screen.getByRole('columnheader', { name: 'Balance' }).className).toBe('text-right');
    const cell = screen.getByText('340 zł');
    expect(cell.className).toBe('whitespace-nowrap text-right tabular-nums');
    expect(screen.getByText('edit 2')).toBeTruthy();
    expect(screen.getByText('Edit').className).toBe('sr-only');
  });

  it('renders the empty node instead of a table without rows', () => {
    render(<DataTable<Row> rows={[]} empty={<p>Nothing here</p>} />);

    expect(screen.getByText('Nothing here')).toBeTruthy();
    expect(screen.queryByRole('table')).toBeNull();
  });
});
