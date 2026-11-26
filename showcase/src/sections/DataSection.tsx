import { DataTable, Metric, MetricGroup, Table } from '@ksojecki/ui/data';
import { Badge } from '@ksojecki/ui/feedback';
import { Section } from '@ksojecki/ui/layout';
import { Specimen } from '../Specimen';

const ROWS = [
  { id: 1, name: 'Desk lamp', category: 'Lighting', quantity: 8, status: 'available' },
  { id: 2, name: 'Notebook', category: 'Stationery', quantity: 0, status: 'backordered' },
  { id: 3, name: 'Storage box', category: 'Storage', quantity: 14, status: 'available' },
];

export function DataSection() {
  return (
    <Section description="@ksojecki/ui/data" id="data" title="Data">
      <div className="flex flex-col gap-6">
        <Specimen title="Table (zebra)">
          <div className="w-full">
            <Table label="Plain table" zebra>
              <thead>
                <tr>
                  <th>Line</th>
                  <th>Qty</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Coffee</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>Tea</td>
                  <td>5</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Specimen>
        <Specimen title="DataTable">
          <div className="w-full">
            <DataTable
              columns={[
                { key: 'name' },
                { key: 'category' },
                { key: 'quantity', kind: 'number' },
                {
                  id: 'status',
                  header: 'Status',
                  render: (row) => (
                    <Badge purpose={row.status === 'available' ? 'success' : 'warning'} size="sm">
                      {row.status}
                    </Badge>
                  ),
                },
              ]}
              label="Inventory"
              rows={ROWS}
              zebra
            />
            <DataTable empty={<span>No rows.</span>} rows={[] as typeof ROWS} />
          </div>
        </Specimen>
        <Specimen title="Metric / MetricGroup">
          <MetricGroup responsive>
            <Metric description="Across all categories" label="Items" value="128" />
            <Metric label="Out of stock" tone="error" value="5" />
            <Metric label="In stock" tone="success" value="123" />
          </MetricGroup>
          <Metric
            appearance="boxed"
            description="vs. last month"
            label="Stock growth"
            tone="info"
            value="12%"
          />
        </Specimen>
      </div>
    </Section>
  );
}
