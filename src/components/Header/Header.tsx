import React from "react";
import { Link } from "react-router-dom";
import { FlexboxGrid, IconButton, Navbar, Stack, Whisper } from "rsuite";
import { FaUserCircle, FaGithub } from "react-icons/fa";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useAtom } from "jotai";
import initStatus from "../../store/initStatusState.store";
import userDropdownMenu from "./userDropdownMenu";
import themeMode from "../../store/theme.mode";

export default function Header() {
  const [status] = useAtom(initStatus);
  const [darkMode, setDarkMode] = useAtom(themeMode);
  const toogleMode = () => setDarkMode(!darkMode);

  return (
    <Navbar
      style={{ borderBottom: "1px solid var(--dashboard-navbar-border-color)" }}
    >
      <Link
        style={{ color: "var(--rs-navbar-default-text)" }}
        to="/admin/dashboard"
      >
        <Navbar.Brand as="div" style={{ width: "260px" }}>
          ECO-FLOW
        </Navbar.Brand>
      </Link>
      <FlexboxGrid justify="end" align="middle" style={{ height: 56 }}>
        <FlexboxGrid.Item>
          <Stack spacing={10} style={{ paddingRight: 18 }}>
            <IconButton
              appearance="subtle"
              style={{ fontSize: "1.5rem" }}
              icon={<FaGithub />}
              href="https://github.com/RomelSikdar/eco-flow"
              target="_blank"
              as="a"
            />
            <IconButton
              appearance="subtle"
              style={{ fontSize: "1.5rem" }}
              icon={darkMode ? <MdLightMode /> : <MdDarkMode />}
              onClick={toogleMode}
            />
            <Whisper
              placement="bottomEnd"
              trigger="click"
              speaker={userDropdownMenu(status)}
            >
              <div
                style={{
                  fontSize: "1.8rem",
                  height: "2rem",
                  cursor: "pointer",
                }}
              >
                <FaUserCircle />
              </div>
            </Whisper>
          </Stack>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Navbar>
  );
}
