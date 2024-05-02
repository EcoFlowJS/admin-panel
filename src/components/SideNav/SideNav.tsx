import { Nav, Navbar, Sidebar, Sidenav } from "rsuite";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import GearCircleIcon from "@rsuite/icons/legacy/GearCircle";
import MagicIcon from "@rsuite/icons/legacy/Magic";
import { MdOutlineDashboard } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { SiDotenv } from "react-icons/si";
import { TbPackages, TbUserShield, TbUsers } from "react-icons/tb";
import { ImProfile } from "react-icons/im";
import { IconWrapper } from "@ecoflow/components-lib";
import { GrConfigure } from "react-icons/gr";
import { CiServer, CiViewTimeline } from "react-icons/ci";
import { LuPackageSearch } from "react-icons/lu";
import { useAtom } from "jotai";
import { userPermissions as userPermit } from "../../store/users.store";
import { useState } from "react";
import { RiFolderZipFill } from "react-icons/ri";

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
              eventKey="dashboard"
              active={loc.pathname.startsWith("/admin/dashboard")}
              icon={<IconWrapper icon={MdOutlineDashboard} />}
            >
              Dashboard
            </Nav.Item>
            <Nav.Item divider />
            <Nav.Item
              eventKey="profile"
              active={loc.pathname.startsWith("/admin/profile")}
              icon={<IconWrapper icon={ImProfile} />}
            >
              Profile
            </Nav.Item>
            <Nav.Item divider />
            <Nav.Menu
              eventKey="3"
              trigger="hover"
              title="Advanced"
              icon={<MagicIcon />}
              placement="rightStart"
            >
              <Nav.Item
                eventKey="availablePackages"
                active={loc.pathname.startsWith("/admin/availablePackages")}
                icon={<IconWrapper icon={LuPackageSearch} />}
              >
                Available Packages
              </Nav.Item>
              <Nav.Item
                eventKey="installedPackages"
                active={loc.pathname.startsWith("/admin/installedPackages")}
                icon={<IconWrapper icon={TbPackages} />}
              >
                Installed Packages
              </Nav.Item>
              <Nav.Item
                eventKey="roles"
                active={loc.pathname.startsWith("/admin/roles")}
                icon={<IconWrapper icon={TbUserShield} />}
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
                Roles
              </Nav.Item>
              <Nav.Item
                eventKey="users"
                active={loc.pathname.startsWith("/admin/users")}
                icon={<IconWrapper icon={TbUsers} />}
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
                Users
              </Nav.Item>
              <Nav.Item
                eventKey="auditLogs"
                active={loc.pathname.startsWith("/admin/auditLogs")}
                icon={<IconWrapper icon={CiViewTimeline} />}
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
                Audit Logs
              </Nav.Item>
            </Nav.Menu>
            <Nav.Menu
              eventKey="4"
              trigger="hover"
              title="Settings"
              icon={<GearCircleIcon />}
              placement="rightStart"
            >
              <Nav.Item
                eventKey="server"
                active={loc.pathname.startsWith("/admin/serverSettings")}
                icon={<IconWrapper icon={CiServer} />}
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
                Server
              </Nav.Item>
              <Nav.Item
                eventKey="config"
                active={loc.pathname.startsWith("/admin/configurations")}
                icon={<IconWrapper icon={GrConfigure} />}
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
                Configurations
              </Nav.Item>
              <Nav.Item
                eventKey="env"
                active={loc.pathname.startsWith("/admin/environments")}
                icon={<IconWrapper icon={SiDotenv} />}
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
                Environments
              </Nav.Item>
              <Nav.Item
                eventKey="backup"
                active={loc.pathname.startsWith("/admin/backups")}
                icon={<IconWrapper icon={RiFolderZipFill} />}
                disabled={
                  // !userPermissions.administrator &&
                  !userPermissions.backup && !userPermissions.restore
                }
                style={{
                  color:
                    // !userPermissions.administrator &&
                    !userPermissions.backup && !userPermissions.restore
                      ? "var(--rs-text-disabled)"
                      : "inherit",
                }}
              >
                Backup and restore
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
