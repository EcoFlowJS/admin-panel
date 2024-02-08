import React from "react";
import { Nav, Navbar, Sidebar, Sidenav } from "rsuite";

import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import GearCircleIcon from "@rsuite/icons/legacy/GearCircle";
import MagicIcon from "@rsuite/icons/legacy/Magic";
import { MdOutlineDashboard } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { SiDotenv } from "react-icons/si";
import { TbUsers } from "react-icons/tb";
import { ImProfile } from "react-icons/im";
import { IconWrapper } from "@eco-flow/components-lib";
import { GrConfigure } from "react-icons/gr";
import { CiServer } from "react-icons/ci";

export default function SideNav() {
  const [expand, setExpand] = React.useState(true);
  const navigate = useNavigate();
  const loc = useLocation();

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
      default:
        console.log(eventKey);
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
              <Nav.Item eventKey="3-1">Geo</Nav.Item>
              <Nav.Item eventKey="3-2">Devices</Nav.Item>
              <Nav.Item eventKey="3-3">Brand</Nav.Item>
              <Nav.Item eventKey="3-4">Loyalty</Nav.Item>
              <Nav.Item eventKey="3-5" icon={<IconWrapper icon={SiDotenv} />}>
                Visit Depth
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
              >
                Environments
              </Nav.Item>
              <Nav.Item
                eventKey="users"
                active={loc.pathname.startsWith("/admin/users")}
                icon={<IconWrapper icon={TbUsers} />}
              >
                Users
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
