import { useAtom } from "jotai";
import React from "react";
import { Table, Button, Divider } from "rsuite";
import { userPermissions } from "../../../store/users.store";

export default function CellActionButton({
  rowData,
  dataKey,
  onClickEdit,
  onClickDelete,
  isSystemEnvs,
  oldDatas,
  ...props
}: any) {
  const [permissionsList] = useAtom(userPermissions);

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
        disabled={
          !permissionsList.administrator &&
          !permissionsList.updateEnvs &&
          oldDatas.filter((d: { id: any }) => d.id === rowData.id).length > 0
        }
      >
        {rowData.status === "EDIT" ? "Save" : "Edit"}
      </Button>
      <Divider vertical />
      <Button
        disabled={
          isSystemEnvs ||
          (!permissionsList.administrator &&
            !permissionsList.deleteEnvs &&
            oldDatas.filter((d: { id: any }) => d.id === rowData.id).length > 0)
        }
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
