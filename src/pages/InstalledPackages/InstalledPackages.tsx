import { Container, Content, Divider, FlexboxGrid, Header } from "rsuite";
import InstalledPackagesContent from "../../components/InstalledPackagesContent/InstalledPackagesContent.component";

export default function InstalledPackages() {
  return (
    <Container>
      <Header style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
        <FlexboxGrid justify="start">
          <FlexboxGrid.Item>
            <h4>Installed Packages</h4>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Header>
      <Divider />
      <Content>
        <InstalledPackagesContent />
      </Content>
    </Container>
  );
}
