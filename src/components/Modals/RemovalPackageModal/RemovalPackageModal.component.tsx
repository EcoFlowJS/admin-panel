import { AlertModal, IconWrapper } from "@ecoflow/components-lib";
import { BiTrash } from "react-icons/bi";

interface RemovalPackageModalProps {
  open?: boolean;
  loading?: boolean;
  onClose?: () => void;
  onRemove?: () => void;
}

export default function RemovalPackageModal({
  open = false,
  loading = false,
  onClose = () => {},
  onRemove = () => {},
}: RemovalPackageModalProps) {
  return (
    <AlertModal
      open={open}
      onClose={onClose}
      CancelButtonProps={{
        appearance: "subtle",
        onClick: onClose,
      }}
      confirmButtonText="Remove"
      confirmButtonProps={{
        appearance: "subtle",
        loading: loading,
        color: "red",
        startIcon: <IconWrapper icon={BiTrash} />,
        onClick: onRemove,
      }}
    >
      <AlertModal.Header>Are you sure?</AlertModal.Header>
      <AlertModal.Body>
        Removing the package will also remove the flow connectable nodes.
      </AlertModal.Body>
    </AlertModal>
  );
}
