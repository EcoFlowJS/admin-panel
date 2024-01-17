import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "rsuite";

export default function Header() {
  return (
    <Navbar style={{borderBottom:"1px solid var(--dashboard-navbar-border-color)"}}>
      <Link style={{color:"var(--rs-navbar-default-text)"}} to="/admin/dashboard" ><Navbar.Brand>ECO-FLOW</Navbar.Brand></Link>
      <Nav pullRight>
        <Nav.Item>Settings</Nav.Item>
      </Nav>
    </Navbar>
  );
}
