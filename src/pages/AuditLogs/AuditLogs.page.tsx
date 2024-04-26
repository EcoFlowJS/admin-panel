import { useAtom } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { permissionFetched, userPermissions } from "../../store/users.store";
import { Container, Content, Divider, FlexboxGrid, Header } from "rsuite";
import AuditLogsContent from "../../components/AuditLogsContent/AuditLogsContent.component";

export default function AuditLogs() {
  const navigate = useNavigate();
  const [permissionsList] = useAtom(userPermissions);
  const [isPermissionFetched] = useAtom(permissionFetched);

  useEffect(() => {
    if (
      isPermissionFetched &&
      !permissionsList.administrator &&
      !permissionsList.auditLogs
    )
      navigate("/admin/403");
  }, [permissionsList, isPermissionFetched]);
  return (
    <Container>
      <Header style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
        <FlexboxGrid justify="start">
          <FlexboxGrid.Item>
            <h4>Audit Logs</h4>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Header>
      <Divider />
      <Content>
        <AuditLogsContent />
      </Content>
    </Container>
  );
}
