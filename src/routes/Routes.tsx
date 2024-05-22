import { Error404 } from "@ecoflow/components-lib";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BaseLayout from "../layout/BaseAdminLayout/BaseAdminLayout.layout";
import UserProfile from "../pages/UserProfile/UserProfile";
import UsersDashboard from "../pages/UserDashboard/UsersDashboard";
import ServerConfigurations from "../pages/ServerConfigurations/ServerConfigurations";
import ServerEnvironments from "../pages/ServerEnvironments/ServerEnvironments";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import ServerSettings from "../pages/ServerSettings/ServerSettings";
import RoleManagement from "../pages/RoleManagement/RoleManagement";
import InstalledPackages from "../pages/InstalledPackages/InstalledPackages";
import AvailablePackages from "../pages/AvailablePackages/AvailablePackages";
import AuditLogs from "../pages/AuditLogs/AuditLogs.page";
import BackupRestore from "../pages/BackupRestore/BackupRestore";
import Export from "../pages/Export/Export.page";

export default function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<BaseLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="users" element={<UsersDashboard />} />
          <Route path="configurations" element={<ServerConfigurations />} />
          <Route path="environments" element={<ServerEnvironments />} />
          <Route path="serverSettings" element={<ServerSettings />} />
          <Route path="roles" element={<RoleManagement />} />
          <Route path="InstalledPackages" element={<InstalledPackages />} />
          <Route path="availablePackages" element={<AvailablePackages />} />
          <Route path="auditLogs" element={<AuditLogs />} />
          <Route path="backups" element={<BackupRestore />} />
          <Route path="exports" element={<Export />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}
