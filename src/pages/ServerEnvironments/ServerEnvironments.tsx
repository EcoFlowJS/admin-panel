import React, { useEffect } from "react";
import { Container, Content, Divider, Header, Placeholder, Tabs } from "rsuite";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { permissionFetched, userPermissions } from "../../store/users.store";
import ServerEnvironmentsContent from "../../components/ServerEnvironmentsContent/ServerEnvironmentsContent.component";

export default function ServerEnvironments() {
  const navigate = useNavigate();
  const [permissionsList] = useAtom(userPermissions);
  const [isPermissionFetched] = useAtom(permissionFetched);

  useEffect(() => {
    if (
      isPermissionFetched &&
      !permissionsList.administrator &&
      !permissionsList.createEnvs &&
      !permissionsList.deleteEnvs &&
      !permissionsList.updateEnvs
    )
      navigate("/admin/403");
  }, [permissionsList, isPermissionFetched]);

  return (
    <>
      <Container>
        <Header style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
          <h4>Server Environments</h4>
        </Header>
        <Divider />
        <Content>
          <ServerEnvironmentsContent />
        </Content>
      </Container>
    </>
  );
}
