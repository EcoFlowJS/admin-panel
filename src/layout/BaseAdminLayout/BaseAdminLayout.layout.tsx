import { Outlet, useLocation } from "react-router-dom";
import { initService } from "../../service/init/init.service";
import useNavagator from "../../utils/redirect/redirect";
import { useEffect, useState } from "react";
import { Container, Content, Divider, FlexboxGrid, Loader } from "rsuite";
import Header from "../../components/Header/Header";
import SideNav from "../../components/SideNav/SideNav";
import { useAtom } from "jotai";
import initStatusState, {
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
    }
  }, [loggedOut]);

  useEffect(() => {
    if (!isLoading) {
      if (initStatus.isNew && !initStatus.isLoggedIn) redirect("/auth/setup");
      if (!initStatus.isNew && !initStatus.isLoggedIn) redirect("/auth/login");
      if (!initStatus.isNew && initStatus.isLoggedIn)
        navigate(location.pathname.substring("/admin".length));
      if (location.pathname === "/admin" || location.pathname === "/admin/")
        navigate("/dashboard");
    }
  }, [location.pathname, initStatus]);

  useEffect(() => {
    if (response.error) errorRestartNotification.show();
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
    if (onServerRestartedResponse.success) successRestart.show();
  }, [onServerRestartedResponse]);

  const successRestart = useNotification({
    header: "Server Successfully Restarted",
    type: "success",
    children: <>Server successfully restarted and ready to serve again</>,
  });

  const warnRestartNotification = useNotification({
    header: "Warning",
    type: "warning",
    children: <>{response.payload}</>,
  });

  const errorRestartNotification = useNotification({
    header: "Server Stop Failed",
    type: "error",
    children: <>{response.error ? response.payload.toString() : <></>}</>,
  });

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
                  <Outlet />
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
            <h5>Server Restart</h5>
            <Divider />
            <p>Are you sure you want to restart the server?</p>
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
