import {
  Button,
  Container,
  Content,
  Divider,
  FlexboxGrid,
  Header,
} from "rsuite";
import UserDashboardContent from "../../components/UserDashboardContent/UserDashboardContent.component";
import { permissionFetched, userPermissions } from "../../store/users.store";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { IconWrapper } from "@ecoflow/components-lib";
import { LuUserPlus } from "react-icons/lu";

export default function UsersDashboard() {
  const navigate = useNavigate();
  const [permissionsList] = useAtom(userPermissions);
  const [isPermissionFetched] = useAtom(permissionFetched);
  const [isAddClicked, setAddClicked] = useState(false);
  const [isUserLoading, setUserLoading] = useState(false);

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
          <FlexboxGrid justify="space-between">
            <FlexboxGrid.Item>
              <h4>User Dashboard</h4>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item>
              <Button
                appearance="ghost"
                startIcon={<IconWrapper icon={LuUserPlus} />}
                loading={isUserLoading}
                disabled={
                  !permissionsList.administrator && !permissionsList.createUser
                }
                onMouseDown={() => setAddClicked(false)}
                onMouseUp={() => setAddClicked(true)}
              >
                Add user
              </Button>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Header>
        <Divider />
        <Content>
          <UserDashboardContent
            isAddClicked={isAddClicked}
            Loading={setUserLoading}
          />
        </Content>
      </Container>
    </>
  );
}
