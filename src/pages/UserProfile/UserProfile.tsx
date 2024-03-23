import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Content,
  Divider,
  FlexboxGrid,
  Footer,
  Header,
  Placeholder,
} from "rsuite";
import { permissionFetched, userPermissions } from "../../store/users.store";
import UserProfileContent from "../../components/UserProfileContent/UserProfileContent.component";

export default function UserProfile() {
  const navigate = useNavigate();
  const [permissionsList] = useAtom(userPermissions);
  const [isPermissionFetched] = useAtom(permissionFetched);

  useEffect(() => {
    if (
      isPermissionFetched &&
      !permissionsList.administrator &&
      !permissionsList.createUser &&
      !permissionsList.showUser &&
      !permissionsList.deleteUser &&
      !permissionsList.updateUser
    )
      navigate("/admin/403");
  }, [permissionsList, isPermissionFetched]);

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
        <FlexboxGrid style={{ alignItems: "stretch", height: "100%" }}>
          <FlexboxGrid.Item colspan={24}>
            <UserProfileContent />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Container>
    </>
  );
}
