import React from "react";
import { Table, Button, Divider } from "rsuite";

export default function CellActionButton({
  rowData,
  dataKey,
  onClickEdit,
  onClickDelete,
  isSystemEnvs,
  ...props
}: any) {
  return (
    <Table.Cell
      {...props}
      style={{
        padding: 6,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        appearance="ghost"
        onClick={() => {
          onClickEdit(rowData.id);
        }}
        style={{ minWidth: 70 }}
      >
        {rowData.status === "EDIT" ? "Save" : "Edit"}
      </Button>
      <Divider vertical />
      <Button
        disabled={isSystemEnvs}
        appearance="ghost"
        color="red"
        onClick={() => {
          onClickDelete(rowData.id);
        }}
        style={{ minWidth: 70 }}
      >
        Delete
      </Button>
    </Table.Cell>
  );
}
