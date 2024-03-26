import { FlexboxGrid, Panel, Placeholder, Tabs } from "rsuite";
import { useEffect, useState } from "react";
import fetchUserLists from "../../service/user/fetchUserLists.service";
import UserDashBoardForm from "./UserDashBoardForm/UserDashBoardForm.component";
import {
  connectSocketIO,
  disconnectSocketIO,
} from "../../utils/socket.io/socket.io";

interface UserDashboardContentProps {
  isAddClicked: boolean;
  Loading: (isLoading: boolean) => void;
}

export default function UserDashboardContent({
  isAddClicked,
  Loading,
}: UserDashboardContentProps) {
  const [isLoading, setLoading] = useState(false);
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

  const handleUserAddedOrUpdate = (index: number, username: string) => {
    userList.splice(index, 1, username);
    setUserList(userList);
    setTabActiveKey(username);
  };

  const handleUpdateUsernames = (usernames: string[]) => {
    setUserList([
      ...userList,
      ...usernames.filter((username) => {
        return !userList.includes(username);
      }),
    ]);
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
    const socket = connectSocketIO();
    socket.on("createdUser", handleUpdateUsernames);

    fetchUserLists().then((response) => {
      if (response.success) {
        setLoading(false);
        Loading(false);
        setUserList(response.payload);
        setTabActiveKey(response.payload.length > 0 ? response.payload[0] : "");
      }
    }, console.error);

    return disconnectSocketIO(socket);
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
                      {typeof user === "string" && user === tabActiveKey ? (
                        <UserDashBoardForm
                          index={index}
                          username={user}
                          onUserRemoved={handleUserRemoved}
                          onUserAdded={handleUserAddedOrUpdate}
                          onUserUpdated={handleUserAddedOrUpdate}
                        />
                      ) : typeof user !== "string" &&
                        user.value === tabActiveKey ? (
                        <UserDashBoardForm
                          index={index}
                          username={user}
                          onUserRemoved={handleUserRemoved}
                          onUserAdded={handleUserAddedOrUpdate}
                          onUserUpdated={handleUserAddedOrUpdate}
                        />
                      ) : (
                        <></>
                      )}
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
