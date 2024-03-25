import { Container, Content, Divider, FlexboxGrid, Header } from "rsuite";
import UserProfileContent from "../../components/UserProfileContent/UserProfileContent.component";

export default function UserProfile() {
  return (
    <>
      <Container style={{ height: "100%" }}>
        <Header style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
          <FlexboxGrid justify="start">
            <FlexboxGrid.Item>
              <h4>Profile</h4>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Header>
        <Divider />
        <Content>
          <UserProfileContent />
        </Content>
      </Container>
    </>
  );
}
