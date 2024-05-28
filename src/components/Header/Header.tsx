import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FlexboxGrid,
  IconButton,
  Navbar,
  Stack,
  Tooltip,
  Whisper,
} from "rsuite";
import { FaUserCircle, FaGithub } from "react-icons/fa";
import { MdLightMode, MdDarkMode, MdSpaceDashboard } from "react-icons/md";
import { useAtom } from "jotai";
import initStatus from "../../store/initStatusState.store";
import userDropdownMenu from "./userDropdownMenu";
import themeMode from "../../store/theme.mode";

export default function Header() {
  const [status] = useAtom(initStatus);
  const [darkMode, setDarkMode] = useAtom(themeMode);
  const toogleMode = () => setDarkMode(!darkMode);
  const [userWhisperShow, setUserWhisperShow] = useState(true);
  const [userWhisperShowMouseHover, setUserWhisperShowMouseHover] =
    useState(false);

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
            <Whisper
              placement="bottom"
              speaker={<Tooltip arrow={false}>GitHub Repo</Tooltip>}
            >
              <IconButton
                appearance="subtle"
                style={{ fontSize: "1.5rem" }}
                icon={<FaGithub />}
                href="https://github.com/EcoFlowJS/eco-flow"
                target="_blank"
                as="a"
              />
            </Whisper>
            <Whisper
              placement="bottom"
              speaker={<Tooltip arrow={false}>Toggle Light/Dark</Tooltip>}
            >
              <IconButton
                appearance="subtle"
                style={{ fontSize: "1.5rem" }}
                icon={darkMode ? <MdLightMode /> : <MdDarkMode />}
                onClick={toogleMode}
              />
            </Whisper>
            <Whisper
              placement="bottom"
              speaker={<Tooltip arrow={false}>Main Dashboaard</Tooltip>}
            >
              <IconButton
                appearance="subtle"
                style={{ fontSize: "1.5rem" }}
                icon={<MdSpaceDashboard />}
                as="a"
                href={`${window.location.origin}/auth`}
              />
            </Whisper>
            <Whisper
              placement="bottomEnd"
              trigger="click"
              speaker={userDropdownMenu(status)}
              onOpen={() => setUserWhisperShow(false)}
              onClose={() => setUserWhisperShow(true)}
            >
              <div>
                <Whisper
                  open={userWhisperShow && userWhisperShowMouseHover}
                  placement="bottom"
                  speaker={<Tooltip arrow={false}>Settings</Tooltip>}
                >
                  <div
                    style={{
                      fontSize: "1.8rem",
                      height: "2rem",
                      cursor: "pointer",
                    }}
                    onMouseEnter={() => setUserWhisperShowMouseHover(true)}
                    onMouseLeave={() => setUserWhisperShowMouseHover(false)}
                  >
                    <FaUserCircle />
                  </div>
                </Whisper>
              </div>
            </Whisper>
          </Stack>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Navbar>
  );
}
