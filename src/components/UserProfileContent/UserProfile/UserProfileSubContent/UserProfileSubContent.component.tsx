import { ReactNode } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FlexboxGrid, Panel, Stack } from "rsuite";

export default function UserProfileSubContent({
  children,
}: {
  children?: ReactNode;
}) {
  return (
    <Stack direction="column" alignItems="stretch">
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item>
          <div
            style={{
              height: 116,
              width: 116,
              transform: "translateY(50%)",
              marginTop: "-50px",
              borderRadius: "50%",
              borderBottom: "2px solid var(--rs-border-primary)",
            }}
          >
            <FaUserCircle
              style={{
                fontSize: 100,
                borderRadius: "inherit",
                backgroundColor: "var(--dashboard-subcontent-background-color)",
                border:
                  "8px solid var(--dashboard-subcontent-background-color)",
              }}
            />
          </div>
        </FlexboxGrid.Item>
      </FlexboxGrid>

      <Panel
        shaded
        bordered
        style={{
          backgroundColor: "var(--card-background-color)",
          paddingTop: 50,
        }}
      >
        {children}
      </Panel>
    </Stack>
  );
}
