import { useAtom } from "jotai";
import { Panel, Table } from "rsuite";
import { userPermissions } from "../../../store/users.store";
import { ReactNode, useEffect, useState } from "react";
import permissionList from "../../../defaults/permissionList.default";
import PermisssionCell from "./PermisssionCell/PermisssionCell.component";

const { Column, HeaderCell, Cell } = Table;

export default function AccessPermissionList() {
  const [isLoading, setLoading] = useState(true);
  const [permissions, serverPermissions] = useState<
    {
      id: number;
      name: string;
      hint: string | ReactNode;
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
      hint: string | ReactNode;
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
          <PermisssionCell />
        </Column>
      </Table>
    </Panel>
  );
}
