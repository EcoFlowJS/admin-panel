import { AlertModal } from "@ecoflow/components-lib";
import { Dispatch, SetStateAction } from "react";
import { Divider } from "rsuite";

interface SaveConfigAlertModalProps {
  modalControl?: [boolean, Dispatch<SetStateAction<boolean>>];
  handler?: () => void;
}

export default function SaveConfigAlertModal({
  modalControl,
  handler = () => {},
}: SaveConfigAlertModalProps) {
  const [modalOpen, setModalOpen] = modalControl
    ? modalControl
    : [false, () => {}];

  return (
    <>
      <AlertModal
        open={modalOpen}
        confirmButtonText="Confirm"
        CancelButtonText="Cancel"
        confirmButtonProps={{
          color: "green",
          onClick: () => {
            setModalOpen(false);
            handler();
          },
        }}
        CancelButtonProps={{
          appearance: "default",
          onClick: () => {
            setModalOpen(false);
          },
        }}
        size="sm"
      >
        <AlertModal.Body>
          <h5>Are You Sure?</h5>
          <Divider />
          <p>
            Updating configuration need to restart the server for the updated
            configuration to be get effective.
            <br />
            Please be patients be patient and restart the server once
            configuration successfully gets updated.
          </p>
        </AlertModal.Body>
      </AlertModal>
    </>
  );
}
