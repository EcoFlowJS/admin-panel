import Table, { RowDataType, RowKeyType } from "rsuite/esm/Table";

export default function PermisssionCell({
  rowData,
  dataKey,
  ...props
}: import("rsuite-table/lib/Cell").InnerCellProps<
  RowDataType<any>,
  RowKeyType
>) {
  return (
    <Table.Cell {...props}>
      <div style={{ padding: "0 10px" }}>
        <div
          style={{
            paddingBottom: 5,
            whiteSpace: "nowrap",
            fontWeight: 500,
          }}
        >
          {rowData!.name}
        </div>
        <div
          style={{
            fontSize: "0.666em",
            color: "#97969B",
            fontWeight: "lighter",
            paddingBottom: 5,
            wordWrap: "break-word",
          }}
        >
          {rowData!.hint}
        </div>
      </div>
    </Table.Cell>
  );
}
