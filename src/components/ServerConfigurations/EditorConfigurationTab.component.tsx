import { defaultServerConfigsOptions } from "../../pages/ServerConfigurations/serverConfigList";
import { FormGroup } from "@ecoflow/components-lib";
import { Toggle } from "rsuite";

interface EditorConfigurationTabProps {
  value: typeof defaultServerConfigsOptions;
}

export default function EditorConfigurationTab({
  value,
}: EditorConfigurationTabProps) {
  return (
    <>
      <FormGroup
        name="editorEnabled"
        label="Enable Editors "
        accepter={Toggle}
      />
      {value.editorEnabled ? (
        <>
          <FormGroup
            name="editorAdmin"
            label="Enable Admin Editors"
            accepter={Toggle}
          />
          <FormGroup
            name="editorFlow"
            label="Enable FLow Editors "
            accepter={Toggle}
          />
          <FormGroup
            name="editorSchema"
            label="Enable Schema Editors "
            accepter={Toggle}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
