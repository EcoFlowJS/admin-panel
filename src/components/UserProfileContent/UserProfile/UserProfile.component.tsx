import { useEffect, useState } from "react";
import { FlexboxGrid, Panel, Tabs, Tag } from "rsuite";
import fetchUserInformations from "../../../service/user/fetchUserInformations.service";
import { UserInformations } from "@ecoflow/types";
import UserProfileSubContent from "./UserProfileSubContent/UserProfileSubContent.component";
import { IconWrapper } from "@ecoflow/components-lib";
import { PiPasswordDuotone } from "react-icons/pi";
import { FaUserGear } from "react-icons/fa6";
import UserProfileForm from "./UserProfileForm/UserProfileForm.component";
import UserChangePasswordForm from "./UserChangePasswordForm/UserChangePasswordForm.component";
import {
  connectSocketIO,
  disconnectSocketIO,
} from "../../../utils/socket.io/socket.io";

export default function UserProfile() {
  const [userInfo, setUserInfo] = useState<UserInformations>({
    name: "",
    username: "",
    email: "",
    isPermanent: false,
    createdAt: new Date(),
  });
  const [tabKey, setTabKey] = useState("userInfo");

  const fetchInfo = () =>
    fetchUserInformations().then((response) => {
      if (response.success) {
        setUserInfo(response.payload);
      }
    });

  useEffect(() => {
    const socket = connectSocketIO();
    socket.on("userUpdated", fetchInfo);
    fetchInfo();
    return disconnectSocketIO(socket);
  }, []);

  return (
    <>
      <Panel bordered shaded style={{ height: "100%" }}>
        <UserProfileSubContent>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item>
              {userInfo?.isPermanent ||
              (typeof userInfo?.isPermanent === "number" &&
                userInfo.isPermanent === 1) ? (
                <Tag>Default Account</Tag>
              ) : (
                <></>
              )}
              <Tag>
                Created at:{" "}
                {new Date(userInfo?.createdAt!).toLocaleDateString()}
              </Tag>
            </FlexboxGrid.Item>
          </FlexboxGrid>
          <div
            style={{
              paddingTop: 50,
            }}
          >
            <Tabs activeKey={tabKey} onSelect={(key) => setTabKey(key!)}>
              <Tabs.Tab
                eventKey="userInfo"
                title="User Profile"
                icon={<IconWrapper icon={FaUserGear} />}
              >
                {tabKey === "userInfo" ? (
                  <UserProfileForm userInfo={userInfo} />
                ) : (
                  <></>
                )}
              </Tabs.Tab>
              <Tabs.Tab
                eventKey="cwdPassword"
                title="Change Password"
                icon={<IconWrapper icon={PiPasswordDuotone} />}
              >
                {tabKey === "cwdPassword" ? <UserChangePasswordForm /> : <></>}
              </Tabs.Tab>
            </Tabs>
          </div>
        </UserProfileSubContent>
      </Panel>
    </>
  );
}
