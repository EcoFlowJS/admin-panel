import { IconWrapper } from "@ecoflow/components-lib";
import { ModuleResults } from "@ecoflow/types";
import { CSSProperties, cloneElement } from "react";
import { PiPackageFill } from "react-icons/pi";
import {
  Button,
  Divider,
  FlexboxGrid,
  List,
  SelectPicker,
  Stack,
} from "rsuite";
import { GrInstall, GrUpgrade } from "react-icons/gr";
import isString from "lodash/isString";
import isEmpty from "lodash/isEmpty";
import { FaRegUserCircle } from "react-icons/fa";

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

export default function PackageList({ module }: PackageListProps) {
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
              {module.author && isString(module.author)
                ? module.author || "N/A"
                : module.author?.name || "N/A"}
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
        <FlexboxGrid.Item colspan={6} style={styleCenter}>
          <div style={{ textAlign: "right" }}>
            <div style={slimText}>Version Selector</div>
            <div style={{ ...titleStyle, paddingBottom: 0 }}>
              <SelectPicker
                searchable={false}
                data={[
                  ...module.versions.map((version) => ({
                    label: version,
                    value: version,
                  })),
                  {
                    label: "latest",
                    value: "latest",
                  },
                ]}
                defaultValue={
                  !isEmpty(module.installedVersions)
                    ? module.installedVersions
                    : "latest"
                }
              />
            </div>
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
            <Button
              appearance="subtle"
              style={{ minWidth: 100 }}
              title={module.isInstalled ? "Upgrade" : "Install"}
              startIcon={
                <IconWrapper
                  icon={module.isInstalled ? GrUpgrade : GrInstall}
                />
              }
            >
              {module.isInstalled ? "Upgrade" : "Install"}
            </Button>
          </Stack>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </List.Item>
  );
}
