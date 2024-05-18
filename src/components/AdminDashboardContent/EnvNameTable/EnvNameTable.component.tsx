import { Panel, Table } from "rsuite";
const { Column, HeaderCell, Cell } = Table;

interface EnvNameTableProps {
  loading?: boolean;
  data?: string[];
}

export default function EnvNameTable({
  data = [],
  loading,
}: EnvNameTableProps) {
  return (
    <Panel header="Environment Variables" className="card">
      <Table
        loading={loading}
        height={340}
        data={data.map((name, index) => ({ id: index + 1, name: name }))}
        bordered
        cellBordered
        virtualized
      >
        <Column width={50} align="center">
          <HeaderCell>SN</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column flexGrow={2}>
          <HeaderCell>Name</HeaderCell>
          <Cell dataKey="name" />
        </Column>
      </Table>
    </Panel>
  );
}
