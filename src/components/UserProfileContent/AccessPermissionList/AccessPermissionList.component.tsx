import { useAtom } from "jotai";
import { FlexboxGrid, Panel, Table } from "rsuite";
import { userPermissions } from "../../../store/users.store";
import { useEffect, useState } from "react";
import permissionList from "../../../defaults/permissionList.default";
import { JSX } from "react/jsx-runtime";
import { RowDataType, RowKeyType } from "rsuite/esm/Table";

const { Column, HeaderCell, Cell } = Table;

export default function AccessPermissionList() {
  const [isLoading, setLoading] = useState(true);
  const [permissions, serverPermissions] = useState<
    {
      id: number;
      name: string;
      hint: string | JSX.Element;
    }[]
  >([]);
  const [userPermissionsList] = useAtom(userPermissions);

  useEffect(() => {
    const accessPermissions = Object.keys(userPermissionsList).filter(
      (key) => userPermissionsList[key]
    );
    const userPermisssions: {
      id: number;
      name: string;
      hint: string | JSX.Element;
    }[] = [];
    permissionList.map((permission) => {
      permission.permissions.map((permission, index) => {
        for (const accesskey of accessPermissions) {
          if (permission.name.includes(accesskey)) {
            userPermisssions.push({
              id: userPermisssions.length + 1,
              name: permission.label,
              hint: permission.hint,
            });
            break;
          }
        }
      });
    });
    serverPermissions(userPermisssions);
    setLoading(false);
  }, [userPermissionsList]);

  return (
    <Panel
      className="AccessPermissionsList"
      bordered
      shaded
      header="Access Permissions List"
      style={{ height: "100%" }}
    >
      <Table
        height={250}
        data={permissions}
        loading={isLoading}
        wordWrap="break-word"
        fillHeight
      >
        <Column flexGrow={1} verticalAlign="center" fixed>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" />
        </Column>
        <Column flexGrow={2} verticalAlign="center" fixed>
          <HeaderCell>Permissions</HeaderCell>
          <NameCell />
        </Column>
      </Table>
    </Panel>
  );
}

const NameCell = ({
  rowData,
  dataKey,
  ...props
}: import("rsuite-table/lib/Cell").InnerCellProps<
  RowDataType<any>,
  RowKeyType
>) => {
  return (
    <Cell {...props}>
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
    </Cell>
  );
};
