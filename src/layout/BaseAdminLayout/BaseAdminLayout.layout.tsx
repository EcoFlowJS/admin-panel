import { Outlet, useLocation } from "react-router-dom";
import initService from "../../service/init/init.service";
import useNavagator from "../../utils/redirect/redirect";
import { useEffect, useLayoutEffect } from "react";
import {
  Container,
  Content,
} from "rsuite";
import Header from "../../components/Header/Header";
import SideNav from "../../components/SideNav/SideNav";

export default function BaseAdminLayout() {

  useLayoutEffect(() =>{
    document.title = "Admin Dashboard";
  },[]);

  const redirect = (url: string) => () => {
    window.location.replace(window.location.origin + url);
  };
  const status = initService();
  const navigate = useNavagator();
  const location = useLocation();

  useEffect(() => {
    if (status.isNew && !status.isLoggedIn) redirect("/auth/setup");
    if (!status.isNew && !status.isLoggedIn) redirect("/auth/login");
    if (!status.isNew && status.isLoggedIn)
      navigate(location.pathname.substring("/admin".length));
    if (location.pathname === "/admin" || location.pathname === "/admin/")
      navigate("/dashboard");
  }, [location.pathname]);

  return (
    <Container style={{minHeight:"100vh"}}>
      <Header />
      <Container>
        <SideNav />
        <Container style={{padding: "2rem", backgroundColor:"var(--dashboard-content-background-color)"}}>
          <Content><Outlet /></Content>
        </Container>
      </Container>
    </Container>
  );
}
