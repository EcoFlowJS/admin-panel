import { IconWrapper } from "@ecoflow/components-lib";
import { ApiResponse, ModuleResults } from "@ecoflow/types";
import { CSSProperties, cloneElement, useState } from "react";
import { PiPackageFill } from "react-icons/pi";
import {
  Button,
  Divider,
  FlexboxGrid,
  List,
  SelectPicker,
  Stack,
} from "rsuite";
import { GrInstall } from "react-icons/gr";
import isString from "lodash/isString";
import isEmpty from "lodash/isEmpty";
import { FaRegUserCircle } from "react-icons/fa";
import { compare } from "compare-versions";
import { FaCircleArrowDown, FaCircleArrowUp } from "react-icons/fa6";
import installEcoPackages from "../../../service/module/installEcoPackages.service";
import { useSetAtom } from "jotai";
import { errorNotification } from "../../../store/notification.store";

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

interface PackageListProps {
  module: ModuleResults;
}

export default function PackageList({
  module: searchModule,
}: PackageListProps) {
  const [module, setModule] = useState(searchModule);
  const [version, setVersion] = useState<string | null>(
    !isEmpty(module.installedVersions)
      ? module.installedVersions
      : module.latestVersion
  );
  const [isLoading, setLoading] = useState(false);

  //Notifications
  const setErrorNotification = useSetAtom(errorNotification);

  const upgradeDowngradeHandler = () => {
    const moduleName = module.name;
    const moduleVersion = version;

    if (moduleVersion === null) {
      setErrorNotification({
        show: true,
        header: "Installation Error",
        message: "Version is required.",
      });
      return;
    }

    moduleName;
  };

  const installHandler = () => {
    const moduleName = module.name;
    const moduleVersion = version || "latest";
    setLoading(true);
    installEcoPackages(moduleName, moduleVersion).then(
      ({ success, payload }) => {
        setLoading(false);
        if (success)
          setModule({
            ...module,
            isInstalled: true,
            installedVersions: payload.version,
          });
      },
      (reject: ApiResponse) => {
        setLoading(false);
        if (reject.error) {
          console.error(reject);
          setErrorNotification({
            show: true,
            header: "Installation Error",
            message: "Error downloading and installing packages.",
          });
        }
      }
    );
  };

  return (
    <List.Item>
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
          <div style={titleStyle}>{module.name}</div>
          <div style={slimText}>
            <div>version: {module.latestVersion}</div>
            <div>
              <IconWrapper icon={FaRegUserCircle} />{" "}
              {module.author
                ? isString(module.author)
                  ? module.author || "N/A"
                  : module.author?.name || "N/A"
                : "N/A"}
            </div>
          </div>
        </FlexboxGrid.Item>
        {/*Status*/}
        <FlexboxGrid.Item colspan={6} style={styleCenter}>
          <div style={{ textAlign: "right" }}>
            <div style={slimText}>Status</div>
            <div style={{ ...titleStyle, paddingBottom: 0 }}>
              {module.isInstalled ? "Installed" : "Available"}
            </div>
            <div style={slimText}>
              version: {module.isInstalled ? module.installedVersions : "N/A"}
            </div>
          </div>
        </FlexboxGrid.Item>
        {/*version Selector*/}
        <FlexboxGrid.Item colspan={5} style={styleCenter}>
          <FlexboxGrid justify="end" style={{ width: "100%" }}>
            <FlexboxGrid.Item>
              <div style={{ textAlign: "right" }}>
                <div style={slimText}>Version Selector</div>
                <div style={{ ...titleStyle, paddingBottom: 0 }}>
                  <SelectPicker
                    searchable={false}
                    data={module.versions.map((version) => ({
                      label:
                        version === module.latestVersion
                          ? `${version} (latest)`
                          : version,
                      value: version,
                    }))}
                    onChange={setVersion}
                    onClean={() => setVersion(null)}
                    value={version}
                  />
                </div>
              </div>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </FlexboxGrid.Item>
        {/*Actions*/}
        <FlexboxGrid.Item
          colspan={5}
          style={{
            ...styleCenter,
          }}
        >
          <Stack divider={<Divider vertical />}>
            <Button
              loading={isLoading}
              appearance="subtle"
              style={{ minWidth: 100 }}
              disabled={
                module.isInstalled && version !== null
                  ? compare(version, module.installedVersions!, "=")
                  : version === null
                  ? true
                  : false
              }
              startIcon={
                <IconWrapper
                  icon={
                    module.isInstalled
                      ? version !== null
                        ? compare(version, module.installedVersions!, ">") ||
                          compare(version, module.installedVersions!, "=")
                          ? FaCircleArrowUp
                          : FaCircleArrowDown
                        : FaCircleArrowUp
                      : GrInstall
                  }
                />
              }
              onClick={
                module.isInstalled ? upgradeDowngradeHandler : installHandler
              }
            >
              {module.isInstalled
                ? version !== null
                  ? compare(version, module.installedVersions!, ">") ||
                    compare(version, module.installedVersions!, "=")
                    ? "Upgrade"
                    : "Downgrade"
                  : "Upgrade"
                : "Install"}
            </Button>
          </Stack>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </List.Item>
  );
}
