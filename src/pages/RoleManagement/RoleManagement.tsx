import React, { useEffect } from "react";
import {
  Container,
  Content,
  Divider,
  FlexboxGrid,
  Header,
  Panel,
} from "rsuite";
import RoleManagementContent from "../../components/RoleManagementContent/RoleManagementContent.component";
import { useAtom } from "jotai";
import { permissionFetched, userPermissions } from "../../store/users.store";
import { useNavigate } from "react-router-dom";

export default function RoleManagement() {
  const navigate = useNavigate();
  const [permissionsList] = useAtom(userPermissions);
  const [isPermissionFetched] = useAtom(permissionFetched);

  useEffect(() => {
    if (
      isPermissionFetched &&
      !permissionsList.administrator &&
      !permissionsList.createRole &&
      !permissionsList.deleteRole &&
      !permissionsList.updateRole
    )
      navigate("/admin/403");
  }, [permissionsList, isPermissionFetched]);

  return (
    <Container>
      <Header style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
        <FlexboxGrid justify="start">
          <FlexboxGrid.Item>
            <h4>Role Management</h4>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Header>
      <Divider />
      <Content>
        <RoleManagementContent />
      </Content>
    </Container>
  );
}
