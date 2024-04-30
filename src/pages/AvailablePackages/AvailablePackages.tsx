import { Container, Content, Divider, FlexboxGrid, Header } from "rsuite";
import AvailablePackagesContents from "../../components/AvailablePackagesContents/AvailablePackagesContents.component";

export default function AvailablePackages() {
  return (
    <Container>
      <Header style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
        <FlexboxGrid justify="start">
          <FlexboxGrid.Item>
            <h4>Available Packages</h4>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Header>
      <Divider />
      <Content>
        <AvailablePackagesContents />
      </Content>
    </Container>
  );
}
