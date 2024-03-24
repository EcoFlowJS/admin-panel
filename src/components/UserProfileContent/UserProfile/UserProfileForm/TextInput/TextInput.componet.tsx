import { IconWrapper } from "@eco-flow/components-lib";
import { useEffect, useState } from "react";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { Input, InputGroup } from "rsuite";

export default function TextInput({
  readOnly = false,
  disabled = false,
  ...props
}: any) {
  const [isReadOnly, setReadOnly] = useState(readOnly);

  useEffect(() => setReadOnly(readOnly ? readOnly : true), [disabled]);
  return (
    <InputGroup>
      <Input {...props} readOnly={isReadOnly} disabled={disabled} />
      <InputGroup.Button
        onClick={() => setReadOnly(!isReadOnly)}
        appearance={isReadOnly ? "subtle" : "primary"}
        style={{
          backgroundColor: isReadOnly
            ? "var(--rs-btn-default-bg)"
            : "var(--rs-btn-primary-bg)",
        }}
      >
        <IconWrapper icon={HiMiniPencilSquare} />
      </InputGroup.Button>
    </InputGroup>
  );
}
