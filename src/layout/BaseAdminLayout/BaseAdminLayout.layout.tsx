import { Outlet, useLocation } from "react-router-dom";
import initService from "../../service/init/init.service";
import useNavagator from "../../utils/redirect/redirect";
import { useEffect, useLayoutEffect, useState } from "react";
import { Container, Content, Divider } from "rsuite";
import Header from "../../components/Header/Header";
import SideNav from "../../components/SideNav/SideNav";
import { useAtom } from "jotai";
import initStatus from "../../store/initStatus.store";
import { AlertModal } from "@eco-flow/components-lib";
import { resartModalState } from "../../store/modals.store";

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
  const [_initStatus, setinitStatus] = useAtom(initStatus);
  const [restartModalOpen, setRestartModalOpen] = useAtom(resartModalState);

  useEffect(() => {
    setinitStatus({ ...status });
    if (status.isNew && !status.isLoggedIn) redirect("/auth/setup");
    if (!status.isNew && !status.isLoggedIn) redirect("/auth/login");
    if (!status.isNew && status.isLoggedIn)
      navigate(location.pathname.substring("/admin".length));
    if (location.pathname === "/admin" || location.pathname === "/admin/")
      navigate("/dashboard");
  }, [location.pathname]);

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
        }}
      >
        <h5>Server Restart</h5>
        <Divider />
        <p>Are you sure you want to restart the server?</p>
      </AlertModal>
    </>
  );
}
