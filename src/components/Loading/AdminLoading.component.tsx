import { Container, Content, Placeholder } from "rsuite";

export default function AdminLoading() {
  return (
    <Container>
      <Content>
        <Placeholder.Paragraph rows={6} active />
      </Content>
    </Container>
  );
}
