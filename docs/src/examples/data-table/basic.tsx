import { DataTable } from '@ksojecki/ui/data';

const rows = [
  { id: 1, name: 'Desk lamp', category: 'Lighting', price: 129 },
  { id: 2, name: 'Notebook', category: 'Stationery', price: 18.5 },
];

export default function DataTableBasic() {
  return (
    <DataTable
      columns={[
        { key: 'name' },
        { key: 'category' },
        { key: 'price', kind: 'number', format: (value) => `${Number(value).toFixed(2)} zł` },
      ]}
      label="Products"
      rows={rows}
    />
  );
}
