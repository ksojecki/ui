import { Table } from '@ksojecki/ui/data';

export default function TableBasic() {
  return (
    <Table label="Shipments" zebra>
      <thead>
        <tr>
          <th scope="col">Order</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>#1024</td>
          <td>Sent</td>
        </tr>
        <tr>
          <td>#1025</td>
          <td>Packing</td>
        </tr>
      </tbody>
    </Table>
  );
}
