import { Container, Content, Divider, FlexboxGrid, Header } from "rsuite";
import ExportContent from "../../components/ExportContent/ExportContent.component";

export default function Export() {
  return (
    <Container>
      <Header style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
        <FlexboxGrid justify="start">
          <FlexboxGrid.Item>
            <h4>Exports</h4>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Header>
      <Divider style={{ margin: "20px 0" }} />
      <Content>
        <ExportContent />
      </Content>
    </Container>
  );
}
