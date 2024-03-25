import { Button, FlexboxGrid, Panel, Placeholder, Tabs } from "rsuite";
import { IconWrapper } from "@eco-flow/components-lib";
import { LuUserPlus } from "react-icons/lu";
import { useEffect, useState } from "react";
import fetchUserLists from "../../service/user/fetchUserLists.service";
import UserDashBoardForm from "./UserDashBoardForm/UserDashBoardForm.component";
import { useAtom } from "jotai";
import { userPermissions } from "../../store/users.store";

interface UserDashboardContentProps {
  isAddClicked: boolean;
  Loading: (isLoading: boolean) => void;
}

export default function UserDashboardContent({
  isAddClicked,
  Loading,
}: UserDashboardContentProps) {
  const [permissionsList] = useAtom(userPermissions);

  const [isLoading, setLoading] = useState(false);
  const [isAddUserLoading, setAddUserLoading] = useState(false);
  const [tabActiveKey, setTabActiveKey] = useState<string | undefined>("");
  const [userList, setUserList] = useState<
    (
      | string
      | {
          value: string;
          label: string;
        }
    )[]
  >([]);

  const handleUserRemoved = (index: number) => {
    userList.splice(index, 1);
    setUserList(userList);
    setTabActiveKey(
      userList.length > 0
        ? typeof userList[0] === "string"
          ? userList[0]
          : userList[0].value
        : ""
    );
  };

  useEffect(() => {
    if (isAddClicked) {
      setUserList((userList) => {
        setTabActiveKey(`${userList.length + 1}`);
        return [
          ...userList,
          {
            label: "New User",
            value: `${userList.length + 1}`,
          },
        ];
      });
    }
  }, [isAddClicked]);

  useEffect(() => {
    setLoading(true);
    Loading(true);
    fetchUserLists().then((response) => {
      if (response.success) {
        setLoading(false);
        Loading(false);
        setUserList(response.payload);
        setTabActiveKey(response.payload.length > 0 ? response.payload[0] : "");
      }
    }, console.error);
  }, []);
  return (
    <>
      <Panel>
        {isLoading ? (
          <Placeholder.Paragraph rows={5} active />
        ) : (
          <>
            {userList.length > 0 ? (
              <Tabs
                activeKey={tabActiveKey}
                vertical
                onSelect={setTabActiveKey}
              >
                {userList.map((user, index) => {
                  return (
                    <Tabs.Tab
                      key={index}
                      eventKey={typeof user === "string" ? user : user.value}
                      title={typeof user === "string" ? user : user.label}
                    >
                      <UserDashBoardForm
                        index={index}
                        username={user}
                        onUserRemoved={handleUserRemoved}
                      />
                    </Tabs.Tab>
                  );
                })}
              </Tabs>
            ) : (
              <FlexboxGrid
                style={{ height: 300 }}
                justify="center"
                align="middle"
              >
                <FlexboxGrid.Item>No users available</FlexboxGrid.Item>
              </FlexboxGrid>
            )}
          </>
        )}
      </Panel>
    </>
  );
}
