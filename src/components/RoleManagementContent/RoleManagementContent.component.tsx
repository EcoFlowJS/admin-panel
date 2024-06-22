import { useEffect, useState, Dispatch, SetStateAction } from "react";
import {
  Divider,
  FlexboxGrid,
  Form,
  Panel,
  Placeholder,
  SelectPicker,
  Tabs,
} from "rsuite";
import { Role, Permissions } from "@ecoflow/types";
import PermissionPanel from "./PermissionPanel/PermissionPanel.component";
import RoleManagementHeader from "./RoleManagementHeader/RoleManagementHeader.component";
import { TbRefresh, TbShieldPlus } from "react-icons/tb";
import { AlertModal, FormGroup, IconWrapper } from "@ecoflow/components-lib";
import "./style.less";
import { useAtom } from "jotai";
import {
  errorNotification,
  successNotification,
} from "../../store/notification.store";
import createRoleService from "../../service/role/createRole.service";
import fetchRolesService from "../../service/role/fetchRoles.service";
import { userPermissions } from "../../store/users.store";

export default function RoleManagementContent() {
  const [isloading, setLoading] = useState(false);
  const [loadingRole, setLoadingRoles] = useState(false);
  const [createLoadingRoles, setCreateLoadingRoles] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);

  const errorNoti = useAtom(errorNotification)[1];
  const successNoti = useAtom(successNotification)[1];
  const [permissionsList] = useAtom(userPermissions);

  const [newRoleModal, setNewRoleModal] = useState(false);
  const [newRoleValue, setNewRoleValue] = useState<Record<string, any>>({
    roleName: "",
    roleLike: null,
  });

  const handleCreateRole = () => {
    if (newRoleValue.roleName.trim().length === 0)
      errorNoti({
        show: true,
        header: "Role Creation Failed",
        message: "Role Name is Empty",
      });

    setCreateLoadingRoles(true);
    createRoleService(newRoleValue.roleName, newRoleValue.roleLike).then(
      (response) => {
        setCreateLoadingRoles(false);
        if (response.success) {
          setRoles(response.payload);
          successNoti({
            show: true,
            header: "Role Creation Success",
            message: `${newRoleValue.roleName} is successfully created.`,
          });
          setNewRoleModal(false);
        }
      }
    );
  };

  const getRoles = (loading: Dispatch<SetStateAction<boolean>>) => {
    loading(true);
    fetchRolesService().then((response) => {
      loading(false);
      if (response.success) {
        setRoles(response.payload);
      }
    });
  };

  useEffect(() => {
    getRoles(setLoading);
  }, []);

  return (
    <>
      <Panel
        header={
          <RoleManagementHeader
            createButtonProps={{
              appearance: "subtle",
              startIcon: <IconWrapper icon={TbShieldPlus} />,
              onClick: () => {
                setNewRoleValue({
                  roleName: "",
                  roleLike: null,
                });
                setNewRoleModal(true);
              },
              disabled:
                !permissionsList.administrator && !permissionsList.createRole,
            }}
            refreshButtonProps={{
              appearance: "subtle",
              startIcon: <IconWrapper icon={TbRefresh} />,
              onClick: () => {
                setLoadingRoles(true);
                getRoles(setLoadingRoles);
              },
              loading: loadingRole,
            }}
          />
        }
      >
        {isloading ? (
          <Placeholder.Paragraph rows={5} active />
        ) : (
          <>
            <Tabs
              vertical
              defaultActiveKey={
                roles.length > 0 ? roles[0]._id?.toString() : ""
              }
            >
              {roles.map((role) => {
                return (
                  <Tabs.Tab
                    key={role._id}
                    eventKey={role._id?.toString()}
                    title={role.name}
                  >
                    <PermissionPanel
                      id={role._id}
                      name={role.name}
                      isDefault={role.isDefault}
                      permissions={role.permissions as Permissions}
                      onUpdate={setRoles}
                    />
                  </Tabs.Tab>
                );
              })}
            </Tabs>
          </>
        )}
      </Panel>

      <AlertModal
        open={newRoleModal}
        confirmButtonProps={{
          color: "cyan",
          onClick: handleCreateRole,
          loading: createLoadingRoles,
        }}
        onClose={() => setNewRoleModal(false)}
        CancelButtonProps={{
          appearance: "subtle",
          onClick: () => setNewRoleModal(false),
          disabled: createLoadingRoles,
        }}
      >
        <AlertModal.Header>Create New Role</AlertModal.Header>
        <Divider style={{ margin: 0, marginTop: 20 }} />
        <AlertModal.Body>
          <FlexboxGrid justify="center" style={{ padding: "0 2rem 2rem" }}>
            <FlexboxGrid.Item>
              <Form
                style={{ width: 300 }}
                onChange={setNewRoleValue}
                formValue={newRoleValue}
              >
                <FormGroup name="roleName" label="Name" autoComplete="off" />
                <FormGroup
                  name="roleLike"
                  label="With permission of"
                  accepter={SelectPicker}
                  searchable={false}
                  data={roles.map((role) => {
                    return {
                      label: role.name,
                      value: role._id,
                    };
                  })}
                  style={{ width: 300 }}
                />
              </Form>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </AlertModal.Body>
      </AlertModal>
    </>
  );
}
