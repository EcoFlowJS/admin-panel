import { Dropdown, Popover } from "rsuite";
import HelpOutlineIcon from "@rsuite/icons/HelpOutline";
import { useAtom } from "jotai";
import { isLoggedOut } from "../../store/initStatusState.store";
import { useNavigate } from "react-router-dom";
import userSignoutService from "../../service/user/userSignout.service";
import { ApiResponse } from "@ecoflow/types";

const userDropdownMenu =
  (status: any) =>
  ({ onClose, left, top, className }: any, ref: any) => {
    const navigate = useNavigate();
    const [_signedOut, setSignOut] = useAtom(isLoggedOut);

    const signoutHandler = (setSignOut: any) => {
      userSignoutService().then((response: ApiResponse) => {
        if (response.success) setSignOut(true);
      });
    };

    const handleSelect = (eventKey: string | undefined) => {
      onClose();
      switch (eventKey) {
        case "profile":
          navigate("/admin/profile");
          break;
        case "signout":
          signoutHandler(setSignOut);
          break;
      }
    };
    return (
      <Popover ref={ref} className={className} style={{ left, top }} full>
        <Dropdown.Menu onSelect={handleSelect}>
          <Dropdown.Item panel style={{ padding: 10, width: 160 }}>
            <p>Signed in as</p>
            <strong>{status.userID}</strong>
          </Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item eventKey="changePWD">Change Password</Dropdown.Item>
          <Dropdown.Item eventKey="profile">Profile & account</Dropdown.Item>
          <Dropdown.Item eventKey="feedback">Feedback</Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item eventKey="signout" disabled={!status.isAuth}>
            Sign out
          </Dropdown.Item>
          <Dropdown.Item
            icon={<HelpOutlineIcon />}
            href="#"
            target="_blank"
            as="a"
          >
            Help{" "}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Popover>
    );
  };

export default userDropdownMenu;
