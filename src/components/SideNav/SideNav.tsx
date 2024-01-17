import React, { CSSProperties } from 'react'
import { Nav, Navbar, Sidebar, Sidenav } from 'rsuite'

import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import DashboardIcon from '@rsuite/icons/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';

export default function SideNav() {
    const [expand, setExpand] = React.useState(true);

  return (
    <Sidebar
          style={{ display: 'flex', flexDirection: 'column' }}
          width={expand ? 260 : 56}
          collapsible
        >
          <Sidenav expanded={expand} style={{height:"100%"}}>
            <Sidenav.Body>
              <Nav>
                <Nav.Item eventKey="1" icon={<DashboardIcon />}>
                  Dashboard
                </Nav.Item>
                <Nav.Item eventKey="2" icon={<GroupIcon />}>
                  User Group
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
                  <Nav.Item eventKey="3-5">Visit Depth</Nav.Item>
                </Nav.Menu>
                <Nav.Menu
                  eventKey="4"
                  trigger="hover"
                  title="Settings"
                  icon={<GearCircleIcon />}
                  placement="rightStart"
                >
                  <Nav.Item eventKey="4-1">Applications</Nav.Item>
                  <Nav.Item eventKey="4-2">Websites</Nav.Item>
                  <Nav.Item eventKey="4-3">Channels</Nav.Item>
                  <Nav.Item eventKey="4-4">Tags</Nav.Item>
                  <Nav.Item eventKey="4-5">Versions</Nav.Item>
                </Nav.Menu>
              </Nav>
            </Sidenav.Body>
          </Sidenav>
          <Navbar className="nav-toggle" style={{borderTop:"1px solid var(--dashboard-navbar-border-color)"}}>
      <Nav pullRight>
        <Nav.Item onClick={() => setExpand(!expand)} style={{ width: 56, textAlign: 'center', fontSize:"2rem" }}>
          {expand ? <FaCaretLeft /> : <FaCaretRight />}
        </Nav.Item>
      </Nav>
    </Navbar>
        </Sidebar>
  )
}
