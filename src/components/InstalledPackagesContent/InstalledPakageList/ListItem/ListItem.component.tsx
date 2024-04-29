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
  ecoPackage: InstalledPackagesDescription;
}

export default function ListItem({ index, ecoPackage }: ListItemProps) {
  const removePackageHandler = (name: string) => {
    console.log(name);
  };

  return (
    <List.Item index={index}>
      <div style={{ position: "relative" }}>
        <FlexboxGrid>
          {/*icon*/}
          <FlexboxGrid.Item colspan={2} style={styleCenter}>
            {cloneElement(<IconWrapper icon={PiPackageFill} />, {
              style: {
                color: "darkgrey",
                fontSize: "1.5em",
              },
            })}
          </FlexboxGrid.Item>
          {/*base info*/}
          <FlexboxGrid.Item
            colspan={6}
            style={{
              ...styleCenter,
              flexDirection: "column",
              alignItems: "flex-start",
              overflow: "hidden",
            }}
          >
            <div style={titleStyle}>{ecoPackage.name}</div>
            <div style={slimText}>
              <div>version: {ecoPackage.currentVersion}</div>
              <div>
                <UserCircleIcon />
                {" " + ecoPackage.author}
              </div>
            </div>
          </FlexboxGrid.Item>
          {/*peak data*/}
          <FlexboxGrid.Item colspan={6} style={styleCenter}>
            <div style={{ textAlign: "right" }}>
              <div style={slimText}>Downloads</div>
              <Text muted>{ecoPackage.download}</Text>
            </div>
          </FlexboxGrid.Item>
          {/*uv data*/}
          <FlexboxGrid.Item colspan={6} style={styleCenter}>
            <div style={{ textAlign: "right" }}>
              <div style={slimText}>status</div>
              <Text muted>{ecoPackage.isInUse ? "In use" : "Available"}</Text>
            </div>
          </FlexboxGrid.Item>
          {/*uv data*/}
          <FlexboxGrid.Item
            colspan={4}
            style={{
              ...styleCenter,
            }}
          >
            <Stack divider={<Divider vertical />}>
              <IconButton
                appearance="subtle"
                disabled={
                  ecoPackage.isLocalPackage ||
                  !compare(
                    ecoPackage.latestVersion,
                    ecoPackage.currentVersion,
                    ">"
                  )
                }
                icon={<IconWrapper icon={GrUpgrade} />}
              />
              <IconButton
                appearance="subtle"
                color="red"
                icon={<IconWrapper icon={BiTrash} />}
                onClick={() => removePackageHandler(ecoPackage.name)}
              />
            </Stack>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </div>
    </List.Item>
  );
}
