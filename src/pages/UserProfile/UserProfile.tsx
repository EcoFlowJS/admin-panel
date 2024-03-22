import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Content, Footer, Header, Placeholder } from "rsuite";
import { permissionFetched, userPermissions } from "../../store/users.store";

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
      <Container>
        <Header>Header</Header>
        <Content>
          <Placeholder.Paragraph rows={5} active />
          <div>UserProfile</div>
        </Content>
        <Footer>Footer</Footer>
      </Container>
    </>
  );
}
