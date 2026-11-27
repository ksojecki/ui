import { DataTable } from '@ksojecki/ui/data';

export default function DataTableInferred() {
  return (
    <div className="flex flex-col gap-4">
      <DataTable
        label="Totals"
        rows={[
          { month: 'January', totalSpent: 1200 },
          { month: 'February', totalSpent: 980 },
        ]}
        zebra
      />
      <DataTable empty="No products match the filters." label="Filtered products" rows={[]} />
    </div>
  );
}
