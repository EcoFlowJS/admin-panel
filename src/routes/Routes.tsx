import { Error404 } from "@eco-flow/components-lib";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import BaseLayout from "../layout/BaseAdminLayout/BaseAdminLayout.layout";
import UserProfile from "../pages/UserProfile/UserProfile";
import UsersDashboard from "../pages/UserDashboard/UsersDashboard";
import ServerConfigurations from "../pages/ServerConfigurations/ServerConfigurations";
import ServerEnvironments from "../pages/ServerEnvironments/ServerEnvironments";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";

const Redirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/admin");
  }, []);
  return null;
};

export default function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Redirect />} />
        <Route path="/admin" element={<BaseLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="users" element={<UsersDashboard />} />
          <Route path="configurations" element={<ServerConfigurations />} />
          <Route path="environments" element={<ServerEnvironments />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}