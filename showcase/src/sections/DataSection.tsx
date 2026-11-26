import { DataTable, Metric, MetricGroup, Table } from '@ksojecki/platform-ui/data';
import { Badge } from '@ksojecki/platform-ui/feedback';
import { Section } from '@ksojecki/platform-ui/layout';
import { Specimen } from '../Specimen';

const ROWS = [
  { id: 1, payee: 'Green Market', category: 'Groceries', amount: -42.5, status: 'cleared' },
  { id: 2, payee: 'City Transit', category: 'Transport', amount: -18, status: 'pending' },
  { id: 3, payee: 'Employer Ltd', category: 'Salary', amount: 3200, status: 'cleared' },
];

export function DataSection() {
  return (
    <Section description="@ksojecki/platform-ui/data" id="data" title="Data">
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
                { key: 'payee' },
                { key: 'category' },
                { key: 'amount', kind: 'number', format: (v) => Number(v).toFixed(2) },
                {
                  id: 'status',
                  header: 'Status',
                  render: (row) => (
                    <Badge purpose={row.status === 'cleared' ? 'success' : 'warning'} size="sm">
                      {row.status}
                    </Badge>
                  ),
                },
              ]}
              label="Transactions"
              rows={ROWS}
              zebra
            />
            <DataTable empty={<span>No rows.</span>} rows={[] as typeof ROWS} />
          </div>
        </Specimen>
        <Specimen title="Metric / MetricGroup">
          <MetricGroup responsive>
            <Metric description="This month" label="Balance" value="4 280,00" />
            <Metric label="Spent" tone="error" value="-1 120,40" />
            <Metric label="Saved" tone="success" value="+640,00" />
          </MetricGroup>
          <Metric
            appearance="boxed"
            description="vs. last month"
            label="Boxed"
            tone="info"
            value="12%"
          />
        </Specimen>
      </div>
    </Section>
  );
}
