import { Outlet, useLocation } from "react-router-dom";
import initService from "../../service/init/init.service";
import useNavagator from "../../utils/redirect/redirect";
import { useEffect, useLayoutEffect, useState } from "react";
import { Container, Content, Divider, Loader } from "rsuite";
import Header from "../../components/Header/Header";
import SideNav from "../../components/SideNav/SideNav";
import { useAtom } from "jotai";
import initStatusState from "../../store/initStatusState.store";
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

export default function BaseAdminLayout() {
  useLayoutEffect(() => {
    document.title = "Admin Dashboard";
  }, []);

  const redirect = (url: string) => () => {
    window.location.replace(window.location.origin + url);
  };
  const status = initService();
  const navigate = useNavagator();
  const location = useLocation();
  const [_initStatus, setinitStatus] = useAtom(initStatusState);
  const [restartModalOpen, setRestartModalOpen] = useAtom(resartModalState);
  const [_restartingServer, setRestartingServer] = useAtom(isRestartingServer);
  const [_clsoeServer, setCloseServer] = useAtom(isClosedServer);
  const [response, setResponse] = useState<ApiResponse>({});
  const [onServerRestartedResponse, setOnServerRestartedResponse] = useAtom(
    serverRestartedResponse
  );

  useEffect(() => {
    setinitStatus({ ...status });
    if (status.isNew && !status.isLoggedIn) redirect("/auth/setup");
    if (!status.isNew && !status.isLoggedIn) redirect("/auth/login");
    if (!status.isNew && status.isLoggedIn)
      navigate(location.pathname.substring("/admin".length));
    if (location.pathname === "/admin" || location.pathname === "/admin/")
      navigate("/dashboard");
  }, [location.pathname]);

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
      }, 2 * 1000);
    }
  }, [response]);

  useEffect(() => {
    console.log(onServerRestartedResponse);

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
      <Container style={{ minHeight: "100vh" }}>
        <Header />
        <Container>
          <SideNav />
          <Content style={{ position: "relative" }}>
            <Container
              style={{
                padding: "2rem",
                backgroundColor: "var(--dashboard-content-background-color)",
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
  );
}
