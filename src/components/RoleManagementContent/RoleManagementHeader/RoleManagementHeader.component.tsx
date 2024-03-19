import React from "react";
import { Button, ButtonProps, Divider, FlexboxGrid } from "rsuite";

interface RoleManagementHeaderProps {
  createButtonProps?: ButtonProps;
  refreshButtonProps?: ButtonProps;
}

export default function RoleManagementHeader({
  createButtonProps,
  refreshButtonProps,
}: RoleManagementHeaderProps) {
  return (
    <FlexboxGrid
      justify="space-between"
      align="middle"
      style={{ paddingBottom: "1rem" }}
    >
      <FlexboxGrid.Item>
        <p
          style={{
            padding: "0 10px",
            fontSize: "large",
            color: "var(--text-info-color)",
          }}
        >
          Create and customise roles.
        </p>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item>
        <Button
          {...createButtonProps}
          style={
            createButtonProps?.style
              ? createButtonProps.style
              : {
                  minWidth: 80,
                }
          }
        >
          New Role
        </Button>
        <Divider vertical />
        <Button
          {...refreshButtonProps}
          style={
            refreshButtonProps?.style
              ? refreshButtonProps.style
              : {
                  minWidth: 80,
                }
          }
        >
          Refresh
        </Button>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
}
