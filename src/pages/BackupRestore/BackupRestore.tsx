import { Container, Content, Divider, FlexboxGrid, Header } from "rsuite";
import BackupRestoreContent from "../../components/BackupRestoreContent/BackupRestoreContent.component";

export default function BackupRestore() {
  return (
    <Container>
      <Header style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
        <FlexboxGrid justify="start">
          <FlexboxGrid.Item>
            <h4>Dashboard</h4>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Header>
      <Divider style={{ margin: "20px 0" }} />
      <Content>
        <BackupRestoreContent />
      </Content>
    </Container>
  );
}
