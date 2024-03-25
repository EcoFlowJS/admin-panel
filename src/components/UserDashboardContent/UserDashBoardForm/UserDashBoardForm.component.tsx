import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { userPermissions } from "../../../store/users.store";
import { Button, CheckPicker, FlexboxGrid, Panel, Stack } from "rsuite";
import {
  Form,
  FormGroup,
  IconWrapper,
  InputPassword,
} from "@eco-flow/components-lib";
import { LuUserMinus } from "react-icons/lu";
import {
  connectSocketIO,
  disconnectSocketIO,
} from "../../../utils/socket.io/socket.io";
import fetchRolesService from "../../../service/role/fetchRoles.service";
import { Role } from "@eco-flow/types";

interface UserDashBoardForm {
  username?:
    | string
    | {
        value: string;
        label: string;
      };
  index: number;
  onUserRemoved?: (index: number) => void;
}

export default function UserDashBoardForm({
  username = "",
  index,
  onUserRemoved = () => {},
}: UserDashBoardForm) {
  const [permissionsList] = useAtom(userPermissions);

  const [isrolesLoading, setRoleLoading] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);

  const [formValue, setFormValue] = useState({
    username: "",
    name: "",
    password: "",
    email: "",
    roles: [],
  });

  const handleUserRemoval = () => {
    if (typeof username !== "string") onUserRemoved(index);
  };

  const handleFormSubmit = (
    checkStatus: boolean,
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
  };

  useEffect(() => {
    const socket = connectSocketIO(["roles"]);
    socket.on("roleCreated", setRoles);
    socket.on("roleRemoved", setRoles);

    setRoleLoading(true);
    fetchRolesService().then((response) => {
      setRoleLoading(false);
      if (response.success) {
        setRoles(response.payload);
      }
    });

    return disconnectSocketIO(socket);
  }, []);

  return (
    <FlexboxGrid justify="center">
      <FlexboxGrid.Item colspan={24}>
        <FlexboxGrid justify="end">
          <FlexboxGrid.Item>
            <Stack spacing={15}>
              {typeof username === "string" ? <Button>Enable</Button> : <></>}
              <Button
                appearance="subtle"
                color="red"
                startIcon={<IconWrapper icon={LuUserMinus} />}
                onClick={handleUserRemoval}
              >
                Remove User
              </Button>
            </Stack>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={14}>
        <Panel>
          <Form
            fluid
            formValue={formValue}
            onChange={(formValue: any) => setFormValue(formValue)}
            onSubmit={handleFormSubmit}
          >
            <FormGroup name="username" label="Username" autoComplete="off" />
            <FormGroup name="name" label="Name" autoComplete="off" />
            <FormGroup
              name="password"
              label="Password"
              accepter={InputPassword}
              autoComplete="off"
            />
            <FormGroup
              name="email"
              label="Email"
              helperText="Optional"
              autoComplete="off"
            />
            <FormGroup
              name="roles"
              label="Roles"
              block
              accepter={CheckPicker}
              loading={isrolesLoading}
              searchable={false}
              data={roles.map((role: Role) => {
                return {
                  label: role.name,
                  value: role._id,
                };
              })}
            />

            <Button type="submit" block>
              Create user
            </Button>
          </Form>
        </Panel>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
}
