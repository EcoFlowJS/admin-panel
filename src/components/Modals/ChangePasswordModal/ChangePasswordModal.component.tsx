import { useAtom } from "jotai";
import { changePWDModal } from "../../../store/modals.store";
import { useState } from "react";
import { Modal } from "rsuite";
import UserChangePasswordForm from "../../UserProfileContent/UserProfile/UserChangePasswordForm/UserChangePasswordForm.component";

export default function ChangePasswordModal() {
  const [open, setOpen] = useAtom(changePWDModal);
  const [isOpened, setOpened] = useState(true);

  return (
    <Modal
      open={open && isOpened}
      onClose={() => setOpened(false)}
      onExited={() => setOpen(false)}
    >
      <Modal.Header>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UserChangePasswordForm onSuccess={() => setOpened(false)} />
      </Modal.Body>
    </Modal>
  );
}
