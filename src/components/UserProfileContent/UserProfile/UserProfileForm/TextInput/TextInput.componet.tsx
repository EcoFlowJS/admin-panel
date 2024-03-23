import { IconWrapper } from "@eco-flow/components-lib";
import { useState } from "react";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { Input, InputGroup } from "rsuite";

export default function TextInput({ disabled = false, ...props }: any) {
  const [isDisabled, setDisabled] = useState(disabled);

  return (
    <InputGroup inside>
      <Input {...props} disabled={isDisabled} />
      <InputGroup.Button onClick={() => setDisabled(!isDisabled)}>
        <IconWrapper icon={HiMiniPencilSquare} />
      </InputGroup.Button>
    </InputGroup>
  );
}
