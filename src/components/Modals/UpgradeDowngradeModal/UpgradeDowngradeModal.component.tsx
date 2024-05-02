import { AlertModal, IconWrapper } from "@ecoflow/components-lib";
import { compare } from "compare-versions";
import { FaCircleArrowDown, FaCircleArrowUp } from "react-icons/fa6";

interface UpgradeDowngradeModalProps {
  open?: boolean;
  loading?: boolean;
  version?: string | null;
  installedVersion?: string | null;
  onClose?: () => void;
  onUpgrade?: () => void;
}

export default function UpgradeDowngradeModal({
  open = false,
  loading = false,
  version = null,
  installedVersion = null,
  onClose = () => {},
  onUpgrade = () => {},
}: UpgradeDowngradeModalProps) {
  return (
    <AlertModal
      open={open}
      onClose={onClose}
      CancelButtonProps={{
        appearance: "subtle",
        onClick: onClose,
      }}
      confirmButtonText="Upgrade"
      confirmButtonProps={{
        appearance: "subtle",
        loading: loading,
        color: "red",
        startIcon: (
          <IconWrapper
            icon={
              version !== null && installedVersion !== null
                ? compare(version, installedVersion, ">") ||
                  compare(version, installedVersion, "=")
                  ? FaCircleArrowUp
                  : FaCircleArrowDown
                : FaCircleArrowUp
            }
          />
        ),
        onClick: onUpgrade,
      }}
    >
      <AlertModal.Header>Are you sure?</AlertModal.Header>
      <AlertModal.Body>
        Upgrading or Downgrading version may leads to crash of application and
        re-setup of the flow.
      </AlertModal.Body>
    </AlertModal>
  );
}
