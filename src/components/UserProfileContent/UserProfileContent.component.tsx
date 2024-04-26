import { FlexboxGrid } from "rsuite";
import AccessPermissionList from "./AccessPermissionList/AccessPermissionList.component";
import RolesList from "./RolesList/RolesList.component";
import UserProfile from "./UserProfile/UserProfile.component";

export default function UserProfileContent() {
  return (
    <FlexboxGrid style={{ alignItems: "stretch" }}>
      <FlexboxGrid.Item colspan={12} style={{ padding: "0 10px" }}>
        <UserProfile />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={12} style={{ padding: "0 10px" }}>
        <FlexboxGrid>
          <FlexboxGrid.Item colspan={24} style={{ paddingBottom: 20 }}>
            <RolesList />
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={24}>
            <AccessPermissionList />
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
}
