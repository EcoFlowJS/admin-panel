import { useAtom } from "jotai";
import { FormEvent, useEffect, useState } from "react";
import { userPermissions } from "../../../store/users.store";
import {
  Button,
  CheckPicker,
  FlexboxGrid,
  Form,
  Panel,
  Placeholder,
  Stack,
} from "rsuite";
import { FormGroup, IconWrapper, InputPassword } from "@ecoflow/components-lib";
import { LuUserMinus } from "react-icons/lu";
import {
  connectSocketIO,
  disconnectSocketIO,
} from "../../../utils/socket.io/socket.io";
import fetchRolesService from "../../../service/role/fetchRoles.service";
import { ApiResponse, Role } from "@ecoflow/types";
import createUser from "../../../service/user/createUser.service";
import {
  errorNotification,
  successNotification,
} from "../../../store/notification.store";
import fetchUserDetails from "../../../service/user/fetchUserDetails.service";
import {
  UserDashBoardFormModelCreate,
  UserDashBoardFormModelUpdate,
} from "./UserDashBoardFormModel";
import updateUser from "../../../service/user/updateUser.service";
import { MdBlock, MdCheck } from "react-icons/md";
import toggleUser from "../../../service/user/toggleUser.service";

interface UserDashBoardForm {
  username?:
    | string
    | {
        value: string;
        label: string;
      };
  index: number;
  onUserRemoved?: (index: number) => void;
  onUserAdded?: (index: number, username: string) => void;
  onUserUpdated?: (index: number, username: string) => void;
}

export default function UserDashBoardForm({
  username = "",
  index,
  onUserRemoved = () => {},
  onUserAdded = () => {},
  onUserUpdated = () => {},
}: UserDashBoardForm) {
  const [permissionsList] = useAtom(userPermissions);
  const errorNoti = useAtom(errorNotification)[1];
  const successNoti = useAtom(successNotification)[1];

  const [isUserLoading, setUserLoading] = useState(false);
  const [isFormLoading, setFormLoading] = useState(false);
  const [isLoadingEnableDisableUser, setLoadingEnableDisableUser] =
    useState(false);

  const [isrolesLoading, setRoleLoading] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);

  const [formValue, setFormValue] = useState({
    username: "",
    name: "",
    password: "",
    email: "",
    roles: [],
  });
  const [isActiveUser, setActiveUser] = useState(false);

  const handleUserRemoval = () => {
    if (typeof username !== "string") onUserRemoved(index);
    // To-DO: Complete this
  };

  const handleEnableDisableUser = () => {
    if (typeof username === "string") {
      setLoadingEnableDisableUser(true);
      toggleUser(username, !isActiveUser).then(
        (response) => {
          if (response.success) {
            setLoadingEnableDisableUser(false);
            setActiveUser(response.payload.isActive);
            successNoti({
              show: true,
              header: "Success user updated",
              message: response.payload.msg,
            });
          }
        },
        (reject: ApiResponse) => {
          setLoadingEnableDisableUser(false);
          if (reject.error)
            errorNoti({
              show: true,
              header: "Error updating user",
              message:
                typeof reject.payload === "string"
                  ? reject.payload
                  : JSON.stringify(reject.payload),
            });
        }
      );
    }
  };

  const handleFormSubmit = (
    checkStatus: Record<string, any> | null,
    event?: FormEvent<HTMLFormElement>
  ) => {
    event?.preventDefault();
    if (checkStatus) {
      setFormLoading(true);
      if (typeof username === "string")
        updateUser(username, formValue).then(
          (response) => {
            if (response.success) {
              setFormLoading(false);
              onUserUpdated(index, formValue.username);
              setFormValue((value) => {
                return {
                  ...value,
                  password: "",
                };
              });
              successNoti({
                show: true,
                header: "Success user updated",
                message: "User has been updated successfully.",
              });
            }
          },
          (reject: ApiResponse) => {
            setFormLoading(false);
            if (reject.error)
              errorNoti({
                show: true,
                header: "Error updating user",
                message:
                  typeof reject.payload === "string"
                    ? reject.payload
                    : JSON.stringify(reject.payload),
              });
          }
        );

      if (typeof username !== "string")
        createUser(formValue).then(
          (response) => {
            if (response.success) {
              setFormLoading(false);
              onUserAdded(index, formValue.username);
              successNoti({
                show: true,
                header: "Success User Added",
                message: "user added successfully.",
              });
            }
          },
          (reject: ApiResponse) => {
            setFormLoading(false);
            if (reject.error)
              errorNoti({
                show: true,
                header: "Error Creating user",
                message:
                  typeof reject.payload === "string"
                    ? reject.payload
                    : JSON.stringify(reject.payload),
              });
          }
        );
    }
  };

  useEffect(() => {
    const socket = connectSocketIO();
    socket.on("roleCreated", setRoles);
    socket.on("roleRemoved", setRoles);

    setRoleLoading(true);
    fetchRolesService().then((response) => {
      setRoleLoading(false);
      if (response.success) {
        setRoles(response.payload);
      }
    });

    if (typeof username !== "string")
      setFormValue({
        username: "",
        name: "",
        password: "",
        email: "",
        roles: [],
      });

    if (typeof username === "string") {
      setUserLoading(true);
      fetchUserDetails(username).then(
        (response) => {
          if (response.success) {
            const { username, name, email, roles, isActive } = response.payload;
            setUserLoading(false);
            setFormValue((value) => {
              return { ...value, username, name, email, roles, password: "" };
            });
            if (isActive) setActiveUser(true);
          }
        },
        (reject: ApiResponse) => {
          if (reject.error)
            errorNoti({
              show: true,
              header: "Error Fetching details",
              message: "Error Fetching user details",
            });
        }
      );
    }

    return disconnectSocketIO(socket);
  }, []);

  return (
    <>
      {isUserLoading ? (
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item colspan={14}>
            <Placeholder.Paragraph rows={7} active />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      ) : (
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item colspan={24}>
            <FlexboxGrid justify="end">
              <FlexboxGrid.Item>
                <Stack spacing={15}>
                  {typeof username === "string" ? (
                    <Button
                      appearance="subtle"
                      startIcon={
                        <IconWrapper icon={isActiveUser ? MdBlock : MdCheck} />
                      }
                      onClick={handleEnableDisableUser}
                      disabled={
                        typeof username === "string" &&
                        !permissionsList.administrator &&
                        !permissionsList.deleteUser
                      }
                      loading={isLoadingEnableDisableUser}
                    >
                      {isActiveUser ? "Disable" : "Enable"} user
                    </Button>
                  ) : (
                    <Button
                      appearance="subtle"
                      color="red"
                      startIcon={<IconWrapper icon={LuUserMinus} />}
                      onClick={handleUserRemoval}
                      disabled={isUserLoading || isFormLoading}
                    >
                      Remove User
                    </Button>
                  )}
                </Stack>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={14}>
            <Panel>
              <Form
                fluid
                model={
                  typeof username === "string"
                    ? UserDashBoardFormModelUpdate
                    : UserDashBoardFormModelCreate
                }
                checkTrigger="blur"
                formValue={formValue}
                onChange={(formValue: any) => setFormValue(formValue)}
                onSubmit={handleFormSubmit}
                disabled={
                  isFormLoading ||
                  (typeof username === "string" && !isActiveUser) ||
                  (typeof username === "string" &&
                    !permissionsList.administrator &&
                    !permissionsList.updateUser)
                }
              >
                <FormGroup
                  name="username"
                  label="Username"
                  autoComplete="off"
                  helperText={
                    typeof username === "string"
                      ? "To update your username change it or leave it as it is."
                      : ""
                  }
                />
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

                <Button
                  type="submit"
                  block
                  disabled={
                    isFormLoading ||
                    (typeof username === "string" && !isActiveUser) ||
                    (typeof username === "string" &&
                      !permissionsList.administrator &&
                      !permissionsList.updateUser)
                  }
                  loading={isFormLoading}
                >
                  {typeof username === "string" ? "Update user" : "Create user"}
                </Button>
              </Form>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      )}
    </>
  );
}
