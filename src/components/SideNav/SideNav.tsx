import React, { useEffect } from "react";
import { Nav, Navbar, Sidebar, Sidenav } from "rsuite";

import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import GearCircleIcon from "@rsuite/icons/legacy/GearCircle";
import MagicIcon from "@rsuite/icons/legacy/Magic";
import { MdOutlineDashboard } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { SiDotenv } from "react-icons/si";
import { TbPackages, TbUserShield, TbUsers } from "react-icons/tb";
import { ImProfile } from "react-icons/im";
import { IconWrapper } from "@eco-flow/components-lib";
import { GrConfigure } from "react-icons/gr";
import { CiServer } from "react-icons/ci";
import { LuPackageSearch } from "react-icons/lu";
import { useAtom } from "jotai";
import { userPermissions as userPermit } from "../../store/users.store";

export default function SideNav() {
  const [expand, setExpand] = React.useState(true);
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
      default:
        console.log(eventKey);
    }
  };

  useEffect(() => console.log(userPermissions), [userPermissions]);

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
            <Nav.Item
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
              >
                Roles
              </Nav.Item>
              <Nav.Item
                eventKey="users"
                active={loc.pathname.startsWith("/admin/users")}
                icon={<IconWrapper icon={TbUsers} />}
                disabled={
                  !userPermissions.createUser &&
                  !userPermissions.updateUser &&
                  !userPermissions.deleteUser &&
                  !userPermissions.showUser
                }
              >
                Users
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
                  !userPermissions.stopServer && !userPermissions.restartServer
                }
              >
                Server
              </Nav.Item>
              <Nav.Item
                eventKey="config"
                active={loc.pathname.startsWith("/admin/configurations")}
                icon={<IconWrapper icon={GrConfigure} />}
              >
                Configurations
              </Nav.Item>
              <Nav.Item
                eventKey="env"
                active={loc.pathname.startsWith("/admin/environments")}
                icon={<IconWrapper icon={SiDotenv} />}
                disabled={
                  !userPermissions.createEnvs &&
                  !userPermissions.deleteEnvs &&
                  !userPermissions.updateEnvs
                }
              >
                Environments
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
