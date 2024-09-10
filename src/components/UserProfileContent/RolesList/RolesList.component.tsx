import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { Panel, Table } from "rsuite";
import { userRolesList } from "../../../store/users.store";
import fetchUserRoles from "../../../service/user/fetchUserRoles.service";

const { Column, HeaderCell, Cell } = Table;

export default function RolesList() {
  const [userRoleList] = useAtom(userRolesList);

  const [isLoading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);

  const fetchRoles = () =>
    fetchUserRoles().then((response) => {
      if (response.success) {
        setLoading(false);
        setRoles(
          response.payload.map((value: string, index: number) => {
            return {
              id: index + 1,
              name: value,
            };
          })
        );
      }
    }, console.error);

  useEffect(() => {
    if (userRoleList.length > 0) fetchRoles();
  }, [userRoleList]);

  useEffect(() => setLoading(true), []);

  return (
    <Panel bordered shaded header="Roles">
      <Table height={250} data={roles} loading={isLoading} virtualized>
        <Column flexGrow={1} verticalAlign="center" fixed>
          <HeaderCell>Id</HeaderCell>
          <Cell dataKey="id" />
        </Column>
        <Column flexGrow={2} verticalAlign="center" fixed>
          <HeaderCell>Role</HeaderCell>
          <Cell dataKey="name" />
        </Column>
      </Table>
    </Panel>
  );
}
