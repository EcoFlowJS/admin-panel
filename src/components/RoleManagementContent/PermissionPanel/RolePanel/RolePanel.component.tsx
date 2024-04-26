import { ReactNode } from "react";
import { FlexboxGrid, Panel, Toggle } from "rsuite";

interface RolePanelProps {
  roleName?: string;
  hintText?: string | ReactNode;
  value: any;
}

export default function RolePanel({
  roleName,
  hintText,
  value,
  ...props
}: RolePanelProps) {
  return (
    <Panel>
      <FlexboxGrid justify="space-between" style={{ paddingBottom: 10 }}>
        <FlexboxGrid.Item>
          <strong>{roleName}</strong>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item>
          <Toggle {...props} checked={value} color="green" />
        </FlexboxGrid.Item>
      </FlexboxGrid>
      <FlexboxGrid>
        <FlexboxGrid.Item colspan={20}>
          <small style={{ color: "var(--text-info-color)" }}>{hintText}</small>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Panel>
  );
}
