import { Nav, Navbar, Sidebar, Sidenav } from "rsuite";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { SiDotenv } from "react-icons/si";
import { TbPackages, TbUserShield, TbUsers } from "react-icons/tb";
import { ImProfile } from "react-icons/im";
import { IconWrapper } from "@ecoflow/components-lib";
import { CiServer, CiViewTimeline } from "react-icons/ci";
import { LuPackageSearch, LuSettings2 } from "react-icons/lu";
import { useAtom } from "jotai";
import { userPermissions as userPermit } from "../../store/users.store";
import { useState } from "react";
import { RiFolderZipFill } from "react-icons/ri";
import { TiExport } from "react-icons/ti";
import { GiGears } from "react-icons/gi";
import NavLabel from "./NavLabel/NavLabel.component";
import { HiWrenchScrewdriver } from "react-icons/hi2";

export default function SideNav() {
  const [expand, setExpand] = useState(true);
  const navigate = useNavigate();
  const loc = useLocation();
  const [userPermissions] = useAtom(userPermit);

  const navigationHandler = (eventKey: string) => {
    switch (eventKey) {
      case "dashboard":
        navigate("/admin/dashboard");
        break;
      case "profile":
        navigate("/admin/profile");
        break;
      case "config":
        navigate("/admin/configurations");
        break;
      case "env":
        navigate("/admin/environments");
        break;
      case "users":
        navigate("/admin/users");
        break;
      case "server":
        navigate("/admin/serverSettings");
        break;
      case "roles":
        navigate("/admin/roles");
        break;
      case "installedPackages":
        navigate("/admin/installedPackages");
        break;
      case "availablePackages":
        navigate("/admin/availablePackages");
        break;
      case "auditLogs":
        navigate("/admin/auditLogs");
        break;
      case "backup":
        navigate("/admin/backups");
        break;
      case "exports":
        navigate("/admin/exports");
        break;
    }
  };

  return (
    <Sidebar
      style={{ display: "flex", flexDirection: "column" }}
      width={expand ? 260 : 56}
      collapsible
    >
      <Sidenav expanded={expand} style={{ height: "100%" }}>
        <Sidenav.Body>
          <Nav onSelect={navigationHandler}>
            <Nav.Item
              as="div"
              eventKey="dashboard"
              active={loc.pathname.startsWith("/admin/dashboard")}
              icon={<IconWrapper icon={MdOutlineDashboard} />}
            >
              Dashboard
            </Nav.Item>
            <Nav.Item
              as="div"
              eventKey="profile"
              active={loc.pathname.startsWith("/admin/profile")}
              icon={<IconWrapper icon={ImProfile} />}
            >
              Profile
            </Nav.Item>
            <Nav.Menu
              eventKey="3"
              trigger="hover"
              title="Advanced"
              icon={<IconWrapper icon={GiGears} />}
              placement="rightStart"
            >
              <Nav.Item
                as="div"
                eventKey="availablePackages"
                active={loc.pathname.startsWith("/admin/availablePackages")}
              >
                <NavLabel icon={LuPackageSearch} label="Available Packages" />
              </Nav.Item>
              <Nav.Item
                as="div"
                eventKey="installedPackages"
                active={loc.pathname.startsWith("/admin/installedPackages")}
              >
                <NavLabel icon={TbPackages} label="Installed Packages" />
              </Nav.Item>
              <Nav.Item
                as="div"
                eventKey="roles"
                active={loc.pathname.startsWith("/admin/roles")}
                disabled={
                  !userPermissions.administrator &&
                  !userPermissions.createRole &&
                  !userPermissions.deleteRole &&
                  !userPermissions.updateRole
                }
                style={{
                  color:
                    !userPermissions.administrator &&
                    !userPermissions.createRole &&
                    !userPermissions.deleteRole &&
                    !userPermissions.updateRole
                      ? "var(--rs-text-disabled)"
                      : "inherit",
                }}
              >
                <NavLabel icon={TbUserShield} label="Roles" />
              </Nav.Item>
              <Nav.Item
                as="div"
                eventKey="users"
                active={loc.pathname.startsWith("/admin/users")}
                disabled={
                  !userPermissions.administrator &&
                  !userPermissions.createUser &&
                  !userPermissions.updateUser &&
                  !userPermissions.deleteUser &&
                  !userPermissions.showUser
                }
                style={{
                  color:
                    !userPermissions.administrator &&
                    !userPermissions.createUser &&
                    !userPermissions.updateUser &&
                    !userPermissions.deleteUser &&
                    !userPermissions.showUser
                      ? "var(--rs-text-disabled)"
                      : "inherit",
                }}
              >
                <NavLabel icon={TbUsers} label="Users" />
              </Nav.Item>
              <Nav.Item
                as="div"
                eventKey="auditLogs"
                active={loc.pathname.startsWith("/admin/auditLogs")}
                disabled={
                  !userPermissions.administrator && !userPermissions.auditLogs
                }
                style={{
                  color:
                    !userPermissions.administrator && !userPermissions.auditLogs
                      ? "var(--rs-text-disabled)"
                      : "inherit",
                }}
              >
                <NavLabel icon={CiViewTimeline} label="Audit Logs" />
              </Nav.Item>
            </Nav.Menu>
            <Nav.Menu
              eventKey="4"
              trigger="hover"
              title="Settings"
              icon={<IconWrapper icon={LuSettings2} />}
              placement="rightStart"
            >
              <Nav.Item
                as="div"
                eventKey="server"
                active={loc.pathname.startsWith("/admin/serverSettings")}
                disabled={
                  !userPermissions.administrator &&
                  !userPermissions.stopServer &&
                  !userPermissions.restartServer
                }
                style={{
                  color:
                    !userPermissions.administrator &&
                    !userPermissions.stopServer &&
                    !userPermissions.restartServer
                      ? "var(--rs-text-disabled)"
                      : "inherit",
                }}
              >
                <NavLabel icon={CiServer} label="Server" />
              </Nav.Item>
              <Nav.Item
                as="div"
                eventKey="config"
                active={loc.pathname.startsWith("/admin/configurations")}
                disabled={
                  !userPermissions.administrator &&
                  !userPermissions.serverConfigurationShow &&
                  !userPermissions.serverConfigurationUpdate
                }
                style={{
                  color:
                    !userPermissions.administrator &&
                    !userPermissions.serverConfigurationShow &&
                    !userPermissions.serverConfigurationUpdate
                      ? "var(--rs-text-disabled)"
                      : "inherit",
                }}
              >
                <NavLabel icon={HiWrenchScrewdriver} label="Configurations" />
              </Nav.Item>
              <Nav.Item
                as="div"
                eventKey="env"
                active={loc.pathname.startsWith("/admin/environments")}
                disabled={
                  !userPermissions.administrator &&
                  !userPermissions.createEnvs &&
                  !userPermissions.deleteEnvs &&
                  !userPermissions.updateEnvs
                }
                style={{
                  color:
                    !userPermissions.administrator &&
                    !userPermissions.createEnvs &&
                    !userPermissions.deleteEnvs &&
                    !userPermissions.updateEnvs
                      ? "var(--rs-text-disabled)"
                      : "inherit",
                }}
              >
                <NavLabel icon={SiDotenv} label="Environments" />
              </Nav.Item>
              <Nav.Item
                as="div"
                eventKey="backup"
                active={loc.pathname.startsWith("/admin/backups")}
                disabled={
                  !userPermissions.administrator &&
                  !userPermissions.backup &&
                  !userPermissions.restore
                }
                style={{
                  color:
                    !userPermissions.administrator &&
                    !userPermissions.backup &&
                    !userPermissions.restore
                      ? "var(--rs-text-disabled)"
                      : "inherit",
                }}
              >
                <NavLabel icon={RiFolderZipFill} label="Backup and restore" />
              </Nav.Item>
              <Nav.Item
                as="div"
                eventKey="exports"
                active={loc.pathname.startsWith("/admin/exports")}
              >
                <NavLabel icon={TiExport} label="Exports" />
              </Nav.Item>
            </Nav.Menu>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
      <Navbar
        className="nav-toggle"
        style={{ borderTop: "1px solid var(--dashboard-navbar-border-color)" }}
      >
        <Nav pullRight>
          <Nav.Item
            as="div"
            onClick={() => setExpand(!expand)}
            style={{ width: 56, textAlign: "center", fontSize: "2rem" }}
          >
            {expand ? <FaCaretLeft /> : <FaCaretRight />}
          </Nav.Item>
        </Nav>
      </Navbar>
    </Sidebar>
  );
}
