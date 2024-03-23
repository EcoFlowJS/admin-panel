import { useEffect, useState } from "react";
import { Button, FlexboxGrid, Panel, Tabs, Tag } from "rsuite";
import fetchUserInformations from "../../../service/user/fetchUserInformations.service";
import { UserInformations } from "@eco-flow/types";
import UserProfileSubContent from "./UserProfileSubContent/UserProfileSubContent.component";
import {
  Form,
  FormGroup,
  IconWrapper,
  InputPassword,
} from "@eco-flow/components-lib";
import { PiPasswordDuotone } from "react-icons/pi";
import { FaUserGear } from "react-icons/fa6";
import isEmpty from "lodash/isEmpty";
import UserProfileForm from "./UserProfileForm/UserProfileForm.component";
import UserChangePasswordForm from "./UserChangePasswordForm/UserChangePasswordForm.component";

export default function UserProfile() {
  const [userInfo, setUserInfo] = useState<UserInformations>({
    name: "",
    username: "",
    email: "",
    isPermanent: false,
    createdAt: new Date(),
  });
  const [tabKey, setTabKey] = useState("userInfo");

  useEffect(() => {
    fetchUserInformations().then((response) => {
      if (response.success) {
        setUserInfo(response.payload);
      }
    });
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
