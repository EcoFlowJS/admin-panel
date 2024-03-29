import { ApiResponse, Permissions, Role } from "@ecoflow/types";
import { Button, Divider, FlexboxGrid, Panel, PanelGroup, Stack } from "rsuite";
import RolePanel from "./RolePanel/RolePanel.component";
import { AlertModal, Form, FormGroup } from "@ecoflow/components-lib";
import permissionList from "../../../defaults/permissionList.default";
import "./style.less";
import { useEffect, useState } from "react";
import isEqual from "lodash/isEqual";
import updateRoleService from "../../../service/role/updateRole.service";
import { useAtom } from "jotai";
import {
  errorNotification,
  successNotification,
} from "../../../store/notification.store";
import deleteRoleService from "../../../service/role/deleteRole.service";
import { userPermissions, userRolesList } from "../../../store/users.store";
import defaultPermissions from "../../../defaults/defaultPermissions.default";

interface PermissionPanelProps {
  id?: string;
  name?: string;
  isDefault?: boolean;
  permissions?: Permissions;
  onUpdate?: (roles: Role[]) => void;
}

export default function PermissionPanel({
  id = "",
  name = "",
  isDefault = false,
  permissions = {},
  onUpdate = () => {},
}: PermissionPanelProps) {
  permissions = {
    ...defaultPermissions,
    ...permissions,
  };
  isDefault =
    isDefault || (typeof isDefault === "number" && isDefault === 1)
      ? true
      : false;
  const [openModal, setOpenModal] = useState(false);
  const [formValue, setFormValue] = useState({ ...permissions });
  const [isModified, setModified] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);

  const [userRoleList] = useAtom(userRolesList);
  const [permissionsList] = useAtom(userPermissions);

  const errorNoti = useAtom(errorNotification)[1];
  const successNoti = useAtom(successNotification)[1];

  const handleResponse = (
    response: ApiResponse,
    loading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    loading(false);
    if (response.success) {
      successNoti({
        show: true,
        header: "Role saved success.",
        message: "Role updated successfully.",
      });
      onUpdate(response.payload);
      setModified(false);
    }
  };

  const handleReject = (
    reject: ApiResponse,
    loading: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    loading(false);
    if (reject.error)
      errorNoti({
        show: true,
        header: "Role update error",
        message: reject.payload,
      });
  };

  const handleSaveRole = (): void => {
    setSaveLoading(true);
    updateRoleService(id, formValue).then(
      (role) => handleResponse(role, setSaveLoading),
      (reject: ApiResponse) => handleReject(reject, setSaveLoading)
    );
  };

  const handleDelete = (): void => {
    setRemoveLoading(true);
    deleteRoleService(id).then(
      (role) => handleResponse(role, setRemoveLoading),
      (reject: ApiResponse) => handleReject(reject, setRemoveLoading)
    );
  };

  useEffect(() => {
    if (isDefault) {
      const defaultPermissions = { ...formValue };
      Object.keys(defaultPermissions).map(
        (key) => (defaultPermissions[key] = true)
      );
      setFormValue(defaultPermissions);
    }
  }, [name]);

  useEffect(() => {
    setModified(!isEqual(permissions, formValue));
  }, [formValue]);

  const handelFormChange = (formValue: Record<string, any>) => {
    if (formValue.administrator) {
      setFormValue((value) => {
        Object.keys(value).map((keys) => (value[keys] = true));
        setModified(true);
        return value;
      });
      return;
    }
    setFormValue(formValue);
  };

  return (
    <>
      <Panel
        header={
          <FlexboxGrid
            style={{ height: 40 }}
            justify={isModified ? "space-between" : "start"}
            align="middle"
          >
            <FlexboxGrid.Item>
              Customise Role Permission for Role {name}
            </FlexboxGrid.Item>
            {isModified && !isDefault ? (
              <FlexboxGrid.Item>
                <Stack
                  divider={<Divider style={{ margin: 0 }} vertical />}
                  spacing={10}
                >
                  <Button
                    style={{ minWidth: 70 }}
                    appearance="subtle"
                    color="red"
                    onClick={() => setFormValue(permissions)}
                    disabled={saveLoading || removeLoading}
                  >
                    Reset
                  </Button>
                  <Button
                    style={{ minWidth: 70 }}
                    appearance="primary"
                    color="cyan"
                    onClick={handleSaveRole}
                    loading={saveLoading}
                    disabled={removeLoading}
                  >
                    Save
                  </Button>
                </Stack>
              </FlexboxGrid.Item>
            ) : (
              <></>
            )}
          </FlexboxGrid>
        }
      >
        <PanelGroup>
          <Form formValue={formValue} onChange={handelFormChange}>
            {permissionList.map((permission, index) => {
              return (
                <Panel
                  key={index}
                  bodyFill
                  header={
                    <p style={{ fontSize: "1.3rem" }}>{permission.name}</p>
                  }
                >
                  <PanelGroup>
                    {permission.permissions.map((permission, index) => {
                      return (
                        <Panel bodyFill key={index}>
                          <FormGroup
                            name={permission.name}
                            label=""
                            accepter={RolePanel}
                            roleName={permission.label}
                            hintText={permission.hint}
                            disabled={
                              isDefault ||
                              userRoleList.includes(id) ||
                              (permission.name === "administrator" &&
                                !permissionsList.administrator) ||
                              (!permissionsList.administrator &&
                                !permissionsList.updateRole)
                            }
                          />
                        </Panel>
                      );
                    })}
                  </PanelGroup>
                </Panel>
              );
            })}
          </Form>
        </PanelGroup>
        <Panel>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={10}>
              <Button
                style={{ width: 250 }}
                appearance="primary"
                color="red"
                disabled={
                  isDefault ||
                  saveLoading ||
                  userRoleList.includes(id) ||
                  (!permissionsList.administrator &&
                    !permissionsList.deleteRole)
                }
                onClick={() => setOpenModal(true)}
              >
                Delete
              </Button>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Panel>
      </Panel>
      <AlertModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        confirmButtonProps={{
          appearance: "primary",
          color: "red",
          onClick: handleDelete,
          loading: removeLoading,
        }}
        CancelButtonProps={{
          appearance: "subtle",
          disabled: removeLoading,
          onClick: () => setOpenModal(false),
        }}
      >
        <AlertModal.Header>Are You Sure?</AlertModal.Header>
        <AlertModal.Body>
          Deleting role is permanet and can't be get recovered.
          <br />
          If any user having the current role then it will also be removed from
          that user
        </AlertModal.Body>
      </AlertModal>
    </>
  );
}
