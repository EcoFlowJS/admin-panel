import { IconWrapper } from "@ecoflow/components-lib";
import { FC, HTMLAttributes } from "react";
import { FlexboxGrid } from "rsuite";

interface NavLabelProps {
  icon?: FC<HTMLAttributes<SVGElement>>;
  label?: string;
}

export default function NavLabel({ icon, label }: NavLabelProps) {
  return (
    <FlexboxGrid align="middle">
      {icon ? (
        <>
          <IconWrapper icon={icon} />
          <div style={{ width: "0.3rem" }} />
        </>
      ) : (
        <></>
      )}
      {label}
    </FlexboxGrid>
  );
}
