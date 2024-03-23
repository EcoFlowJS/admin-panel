import { Outlet, useLocation } from "react-router-dom";
import { initService } from "../../service/init/init.service";
import useNavagator from "../../utils/redirect/redirect";
import { useEffect, useState } from "react";
import { Container, Content, Divider, FlexboxGrid, Panel } from "rsuite";
import Header from "../../components/Header/Header";
import SideNav from "../../components/SideNav/SideNav";
import { useAtom } from "jotai";
import initStatusState, {
  isLoggedIn,
  isLoggedOut,
} from "../../store/initStatusState.store";
import { AlertModal, useNotification } from "@eco-flow/components-lib";
import { resartModalState } from "../../store/modals.store";
import restartCloseServer from "../../service/server/restartCloseServer.service";
import {
  isClosedServer,
  isRestartingServer,
  serverRestartedResponse,
} from "../../store/server.store";
import { ApiResponse } from "@eco-flow/types";
import isServerOnline from "../../service/server/isServerOnline.service";
import Loading from "../../components/Loading/Loading.component";
import {
  errorNotification,
  successNotification,
} from "../../store/notification.store";
import {
  connectSocketIO,
  disconnectSocketIO,
} from "../../utils/socket.io/socket.io";
import baseSocketIOHndlers from "./baseSocketIO.handlers";
import {
  permissionFetched,
  userPermissions,
  userRolesList,
} from "../../store/users.store";
import fetchUserPermissions from "../../service/user/fetchUserPermissions.service";
import defaultPermissions from "../../defaults/defaultPermissions.default";

const socket = connectSocketIO(["roles", "users"]);

export default function BaseAdminLayout() {
  const redirect = (url: string) => {
    window.location.replace(window.location.origin + url);
  };
  const navigate = useNavagator();
  const location = useLocation();
  const [isLoading, setLoading] = useState(true);
  const [initStatus, setinitStatus] = useAtom(initStatusState);
  const [restartModalOpen, setRestartModalOpen] = useAtom(resartModalState);
  const [_restartingServer, setRestartingServer] = useAtom(isRestartingServer);
  const [_clsoeServer, setCloseServer] = useAtom(isClosedServer);
  const [response, setResponse] = useState<ApiResponse>({});
  const [onServerRestartedResponse, setOnServerRestartedResponse] = useAtom(
    serverRestartedResponse
  );
  const [loggedOut, setLoggedOut] = useAtom(isLoggedOut);
  const [loggedIn, setLoggedIn] = useAtom(isLoggedIn);
  const setUserPermissions = useAtom(userPermissions)[1];
  const setPermissionFetched = useAtom(permissionFetched)[1];
  const [userRoleList, setUserRolesList] = useAtom(userRolesList);
  const [isDisConnectedAfterConnect, setIsDisConnectedAfterConnect] =
    useState(false);

  socket.on("connect", () => setIsDisConnectedAfterConnect(true));

  const [successNotificationMessage, setSuccessNotificationMessage] =
    useAtom(successNotification);
  const [errorNotificationMessage, setErrorNotificationMessage] =
    useAtom(errorNotification);

  useEffect(() => {
    document.title = "Admin Dashboard";
    initService().then((status) => {
      setinitStatus({ ...status });
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (loggedOut) {
      setLoggedOut(false);
      setinitStatus({ ...initStatus, isLoggedIn: false });
      disconnectSocketIO(socket);
    }
  }, [loggedOut]);

  useEffect(() => {
    if (loggedIn) {
      setLoggedIn(false);
      setinitStatus({ ...initStatus, isLoggedIn: true });
      if (socket.disconnected && isDisConnectedAfterConnect) socket.connect();
    }
  }, [loggedIn]);

  useEffect(() => {
    if (!isLoading) {
      disconnectSocketIO(socket);
      if (initStatus.isNew && !initStatus.isLoggedIn) redirect("/auth/setup");
      if (!initStatus.isNew && !initStatus.isLoggedIn) redirect("/auth/login");
      if (!initStatus.isNew && initStatus.isLoggedIn) {
        navigate(location.pathname.substring("/admin".length));
        if (location.pathname === "/admin" || location.pathname === "/admin/")
          navigate("/dashboard");
        if (socket.disconnected && isDisConnectedAfterConnect) socket.connect();
        baseSocketIOHndlers(socket, initStatus.userID!)
          .onRoleUpdate((value) =>
            setUserPermissions({ ...defaultPermissions, ...value })
          )
          .onUserRoleListUpdate(setUserRolesList);
        fetchUserPermissions().then((response) => {
          if (response.success) {
            setPermissionFetched(true);
            setUserPermissions({
              ...defaultPermissions,
              ...response.payload.permissions,
            });
            setUserRolesList(response.payload.rolesList);
          }
        });
      }
    }
  }, [initStatus]);

  useEffect(() => {
    if (typeof initStatus.userID !== "undefined")
      fetchUserPermissions().then((response) => {
        if (response.success) {
          setUserPermissions({
            ...defaultPermissions,
            ...response.payload.permissions,
          });
        }
      });
  }, [userRoleList]);

  useEffect(() => {
    if (response.error)
      setErrorNotificationMessage({
        show: true,
        header: "Server Stop Failed",
        message: response.payload.toString(),
      });
    if (response.success) {
      setRestartModalOpen(false);
      warnRestartNotification.show();
      setTimeout(() => {
        setRestartingServer(true);
        isServerOnline([
          setCloseServer,
          setRestartingServer,
          setOnServerRestartedResponse,
        ]);
      }, 30 * 1000);
    }
  }, [response]);

  useEffect(() => {
    if (onServerRestartedResponse.success)
      setSuccessNotificationMessage({
        show: true,
        header: "Server Successfully Restarted",
        message: "Server successfully restarted and ready to serve again",
      });
  }, [onServerRestartedResponse]);

  const warnRestartNotification = useNotification({
    header: "Warning",
    type: "warning",
    children: <>{response.payload}</>,
  });

  const errorNoti = useNotification({
    type: "error",
    header: (
      <>
        {errorNotificationMessage.header ? errorNotificationMessage.header : ""}
      </>
    ),
    placement: errorNotificationMessage.placement,
    children: (
      <>
        {errorNotificationMessage.message
          ? errorNotificationMessage.message
          : ""}
      </>
    ),
  });

  const successNoti = useNotification({
    type: "success",
    header: (
      <>
        {successNotificationMessage.header
          ? successNotificationMessage.header
          : ""}
      </>
    ),
    placement: successNotificationMessage.placement,
    children: (
      <>
        {successNotificationMessage.message
          ? successNotificationMessage.message
          : ""}
      </>
    ),
  });

  useEffect(() => {
    if (successNotificationMessage.show) {
      setSuccessNotificationMessage({
        ...successNotificationMessage,
        show: false,
      });
      successNoti.show();
    }
  }, [successNotificationMessage]);

  useEffect(() => {
    if (errorNotificationMessage.show) {
      setErrorNotificationMessage({
        ...errorNotificationMessage,
        show: false,
      });
      errorNoti.show();
    }
  }, [errorNotificationMessage]);

  useEffect(() => {
    return disconnectSocketIO(socket);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (!initStatus.isNew && initStatus.isLoggedIn) ||
        (initStatus.isNew && initStatus.isLoggedIn) ? (
        <>
          <Container style={{ minHeight: "100vh" }}>
            <Header />
            <Container>
              <SideNav />
              <Content style={{ position: "relative" }}>
                <Container
                  style={{
                    padding: "2rem",
                    backgroundColor:
                      "var(--dashboard-content-background-color)",
                    overflowY: "auto",
                    position: "absolute",
                    top: "0",
                    bottom: "0",
                    right: "0",
                    left: "0",
                  }}
                >
                  <FlexboxGrid
                    style={{ alignItems: "stretch", minHeight: "100%" }}
                  >
                    <FlexboxGrid.Item colspan={24}>
                      <FlexboxGrid
                        style={{
                          padding: 20,
                          borderRadius: 6,
                          alignItems: "stretch",
                          boxSizing: "inherit",
                          minHeight: "100%",
                          overflow: "visible",
                          backgroundColor:
                            "var(--dashboard-subcontent-background-color)",
                        }}
                      >
                        <FlexboxGrid.Item colspan={24}>
                          <Outlet />
                        </FlexboxGrid.Item>
                      </FlexboxGrid>
                    </FlexboxGrid.Item>
                  </FlexboxGrid>
                </Container>
              </Content>
            </Container>
          </Container>
          <AlertModal
            open={restartModalOpen}
            CancelButtonProps={{
              onClick: () => setRestartModalOpen(false),
              color: "green",
            }}
            confirmButtonProps={{
              onClick: () => {
                restartCloseServer("restart").then(setResponse, setResponse);
              },
              color: "red",
            }}
          >
            <AlertModal.Body>
              <h5>Server Restart</h5>
              <Divider />
              <p>Are you sure you want to restart the server?</p>
            </AlertModal.Body>
          </AlertModal>
        </>
      ) : (
        <>
          <FlexboxGrid
            style={{ height: "100vh" }}
            justify="center"
            align="middle"
          >
            {initStatus.isNew && !initStatus.isLoggedIn
              ? "Redirecting to setup"
              : ""}
            {!initStatus.isNew && !initStatus.isLoggedIn
              ? "Redirecting to Login"
              : ""}
          </FlexboxGrid>
        </>
      )}
    </>
  );
}
