import { Panel, Table } from "rsuite";
const { Column, HeaderCell, Cell } = Table;

interface RoutesInfoTableProps {
  loading?: boolean;
  data?: any[];
}

export default function RoutesInfoTable({
  data = [],
  loading,
}: RoutesInfoTableProps) {
  return (
    <Panel header="Api Routes Details" className="card">
      <Table
        loading={loading}
        height={250}
        data={data.map((data, index) => ({ id: index + 1, ...data }))}
        bordered
        cellBordered
        virtualized
      >
        <Column width={50} align="center">
          <HeaderCell>SN</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column>
          <HeaderCell>Methods</HeaderCell>
          <Cell dataKey="method" />
        </Column>
        <Column flexGrow={3}>
          <HeaderCell>Path</HeaderCell>
          <Cell dataKey="path" />
        </Column>
        <Column flexGrow={1}>
          <HeaderCell>Params</HeaderCell>
          <Cell dataKey="params" />
        </Column>
      </Table>
    </Panel>
  );
}
