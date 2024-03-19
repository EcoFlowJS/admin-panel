import React from "react";
import {
  Container,
  Content,
  Divider,
  FlexboxGrid,
  Header,
  Panel,
} from "rsuite";
import RoleManagementContent from "../../components/RoleManagementContent/RoleManagementContent.component";

export default function RoleManagement() {
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
