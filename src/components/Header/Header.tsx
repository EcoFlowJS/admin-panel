import React from "react";
import { Nav, Navbar } from "rsuite";

export default function Header() {
  return (
    <Navbar>
      <Navbar.Brand href="#">ECO-FLOW</Navbar.Brand>
      <Nav pullRight>
        <Nav.Item>Settings</Nav.Item>
      </Nav>
    </Navbar>
  );
}
