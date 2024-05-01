import { AlertModal, IconWrapper } from "@ecoflow/components-lib";
import { ApiResponse, InstalledPackagesDescription } from "@ecoflow/types";
import { CSSProperties, cloneElement, useEffect, useState } from "react";
import { PiPackageFill } from "react-icons/pi";
import { Divider, FlexboxGrid, IconButton, List, Stack, Text } from "rsuite";
import UserCircleIcon from "@rsuite/icons/legacy/UserCircleO";
import { BiTrash } from "react-icons/bi";
import { FaCircleArrowUp } from "react-icons/fa6";
import { compare } from "compare-versions";
import upgradeDowngradePackage from "../../../../service/module/upgradeDowngradePackage.service";
import { useSetAtom } from "jotai";
import {
  errorNotification,
  successNotification,
} from "../../../../store/notification.store";
import removeEcoPackage from "../../../../service/module/removeEcoPackage.service";

const styleCenter: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "60px",
};

const slimText: CSSProperties = {
  fontSize: "0.666em",
  color: "#97969B",
  fontWeight: "lighter",
  paddingBottom: 5,
};

const titleStyle: CSSProperties = {
  paddingBottom: 5,
  whiteSpace: "nowrap",
  fontWeight: 500,
};

interface ListItemProps {
  ecoPackage: InstalledPackagesDescription;
  index?: number;
  isLoading?: boolean;
  onPackageRemoved?: (ecoPackage: InstalledPackagesDescription) => void;
}

export default function ListItem({
  index,
  isLoading = false,
  ecoPackage: installedPackagesDescription,
  onPackageRemoved = () => {},
}: ListItemProps) {
  const [ecoPackage, setEcoPackage] = useState(installedPackagesDescription);
  const [openUpgrade, setOpenUpgrade] = useState(false);
  const [openRemoval, setOpenRemoval] = useState(false);
  const [isLoadingUpgrade, setLoadingUpgrade] = useState(false);
  const [isLoadingRemoval, setLoadingRemoval] = useState(false);

  //Notifications
  const setSuccessNotification = useSetAtom(successNotification);
  const setErrorNotification = useSetAtom(errorNotification);

  const removePackageHandler = () => {
    const { name } = ecoPackage;

    setLoadingRemoval(true);
    removeEcoPackage(name).then(
      ({ success }: ApiResponse) => {
        setLoadingRemoval(false);
        setOpenRemoval(false);
        if (success) {
          onPackageRemoved(ecoPackage);
          setSuccessNotification({
            show: true,
            header: "Success Removal",
            message: "Package removed successfully",
          });
        }
      },
      ({ error, payload }: ApiResponse) => {
        setLoadingRemoval(false);
        if (error) {
          console.error(payload);
          setErrorNotification({
            show: true,
            header: "Installation Error",
            message: "Error downloading and installing packages.",
          });
        }
      }
    );
  };

  const upgradeDowngradeHandler = () => {
    const { name: moduleName, latestVersion: moduleVersion } = ecoPackage;

    setLoadingUpgrade(true);
    upgradeDowngradePackage(moduleName, moduleVersion).then(
      ({ success, payload }: ApiResponse) => {
        setLoadingUpgrade(false);
        setOpenUpgrade(false);
        if (success)
          setEcoPackage({
            ...ecoPackage,
            currentVersion: payload.version,
          });
      },
      ({ error, payload }: ApiResponse) => {
        setLoadingUpgrade(false);
        if (error) {
          console.error(payload);
          setErrorNotification({
            show: true,
            header: "Installation Error",
            message: "Error downloading and installing packages.",
          });
        }
      }
    );
  };

  useEffect(
    () => setEcoPackage(installedPackagesDescription),
    [installedPackagesDescription]
  );

  return (
    <>
      <List.Item index={index}>
        <div style={{ position: "relative" }}>
          <FlexboxGrid>
            {/*Icon*/}
            <FlexboxGrid.Item colspan={2} style={styleCenter}>
              {cloneElement(<IconWrapper icon={PiPackageFill} />, {
                style: {
                  color: "darkgrey",
                  fontSize: "1.5em",
                },
              })}
            </FlexboxGrid.Item>
            {/*Package Details*/}
            <FlexboxGrid.Item
              colspan={6}
              style={{
                ...styleCenter,
                flexDirection: "column",
                alignItems: "flex-start",
                overflow: "hidden",
              }}
            >
              <div style={titleStyle}>
                {ecoPackage.name}{" "}
                {ecoPackage.isLocalPackage ? <>(Local)</> : <></>}
              </div>
              <div style={slimText}>
                <div>version: {ecoPackage.currentVersion}</div>
                <div>
                  <UserCircleIcon />
                  {" " + ecoPackage.author}
                </div>
              </div>
            </FlexboxGrid.Item>
            {/*Downloads*/}
            <FlexboxGrid.Item colspan={6} style={styleCenter}>
              <div style={{ textAlign: "right" }}>
                <div style={slimText}>Downloads</div>
                <Text muted>{ecoPackage.download}</Text>
              </div>
            </FlexboxGrid.Item>
            {/*Status*/}
            <FlexboxGrid.Item colspan={6} style={styleCenter}>
              <div style={{ textAlign: "right" }}>
                <div style={slimText}>status</div>

                <Text muted>
                  {isLoading
                    ? "N/A"
                    : ecoPackage.isInUse
                    ? "In use"
                    : "Available"}
                </Text>
              </div>
            </FlexboxGrid.Item>
            {/*Actions*/}
            <FlexboxGrid.Item
              colspan={4}
              style={{
                ...styleCenter,
              }}
            >
              <Stack divider={<Divider vertical />}>
                <IconButton
                  appearance="subtle"
                  title={
                    ecoPackage.isLocalPackage
                      ? "N/A"
                      : "Upgrade package to Latest."
                  }
                  disabled={
                    ecoPackage.isLocalPackage ||
                    !compare(
                      ecoPackage.latestVersion,
                      ecoPackage.currentVersion,
                      ">"
                    )
                  }
                  icon={<IconWrapper icon={FaCircleArrowUp} />}
                  onClick={isLoading ? () => {} : () => setOpenUpgrade(true)}
                />
                <IconButton
                  color="red"
                  appearance="subtle"
                  disabled={ecoPackage.isInUse}
                  title={ecoPackage.isInUse ? "Package is in use" : undefined}
                  icon={<IconWrapper icon={BiTrash} />}
                  onClick={isLoading ? () => {} : () => setOpenRemoval(true)}
                />
              </Stack>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </div>
      </List.Item>
      {/* Upgrade Modal */}
      <AlertModal
        open={openUpgrade}
        CancelButtonProps={{
          appearance: "subtle",
          onClick: () => setOpenUpgrade(false),
        }}
        confirmButtonText="Upgrade"
        confirmButtonProps={{
          appearance: "subtle",
          loading: isLoadingUpgrade,
          color: "red",
          startIcon: <IconWrapper icon={FaCircleArrowUp} />,
          onClick: upgradeDowngradeHandler,
        }}
      >
        <AlertModal.Header>Are you sure?</AlertModal.Header>
        <AlertModal.Body>
          Upgrading or Downgrading version may leads to crash of application and
          re-setup of the flow.
        </AlertModal.Body>
      </AlertModal>
      {/* Remove Modal */}
      <AlertModal
        open={openRemoval}
        CancelButtonProps={{
          appearance: "subtle",
          onClick: () => setOpenRemoval(false),
        }}
        confirmButtonText="Remove"
        confirmButtonProps={{
          appearance: "subtle",
          loading: isLoadingRemoval,
          color: "red",
          startIcon: <IconWrapper icon={BiTrash} />,
          onClick: removePackageHandler,
        }}
      >
        <AlertModal.Header>Are you sure?</AlertModal.Header>
        <AlertModal.Body>
          Removing the package will also remove the flow connectable nodes.
        </AlertModal.Body>
      </AlertModal>
    </>
  );
}
