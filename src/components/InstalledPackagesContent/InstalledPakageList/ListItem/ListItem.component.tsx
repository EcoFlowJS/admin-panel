import { IconWrapper } from "@ecoflow/components-lib";
import { InstalledPackagesDescription } from "@ecoflow/types";
import { CSSProperties, cloneElement } from "react";
import { PiPackageFill } from "react-icons/pi";
import { Divider, FlexboxGrid, IconButton, List, Stack, Text } from "rsuite";
import UserCircleIcon from "@rsuite/icons/legacy/UserCircleO";
import { compare } from "compare-versions";
import { GrUpgrade } from "react-icons/gr";
import { BiTrash } from "react-icons/bi";

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
  index?: number;
  isLoading?: boolean;
  ecoPackage: InstalledPackagesDescription;
}

export default function ListItem({
  index,
  isLoading = false,
  ecoPackage,
}: ListItemProps) {
  const removePackageHandler = (name: string) => {
    console.log(name);
  };

  const upgradePackageHandler = (ecoPackage: InstalledPackagesDescription) => {
    console.log(ecoPackage);
  };

  return (
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
                title={ecoPackage.isLocalPackage ? "N/A" : "Upgrade package"}
                disabled={
                  ecoPackage.isLocalPackage ||
                  !compare(
                    ecoPackage.latestVersion,
                    ecoPackage.currentVersion,
                    ">"
                  )
                }
                icon={<IconWrapper icon={GrUpgrade} />}
                onClick={() =>
                  isLoading ? () => {} : upgradePackageHandler(ecoPackage)
                }
              />
              <IconButton
                color="red"
                appearance="subtle"
                disabled={ecoPackage.isInUse}
                title={ecoPackage.isInUse ? "Package is in use" : undefined}
                icon={<IconWrapper icon={BiTrash} />}
                onClick={() =>
                  isLoading ? () => {} : removePackageHandler(ecoPackage.name)
                }
              />
            </Stack>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </div>
    </List.Item>
  );
}
