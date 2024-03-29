import { configOptions } from "@ecoflow/types";
import React from "react";
import { defaultServerConfigsOptions } from "../../pages/ServerConfigurations/serverConfigList";
import { FormGroup } from "@ecoflow/components-lib";
import { Toggle } from "rsuite";

interface EditorConfigurationTabProps {
  defaultServerConfigs?: configOptions;
  value: typeof defaultServerConfigsOptions;
}

export default function EditorConfigurationTab({
  defaultServerConfigs,
  value,
}: EditorConfigurationTabProps) {
  return (
    <>
      <FormGroup
        name="editorEnabled"
        label="Enable Editors "
        accepter={Toggle}
        defaultChecked={value.editorEnabled}
      />
      {value.editorEnabled ? (
        <>
          <FormGroup
            name="editorAdmin"
            label="Enable Admin Editors"
            accepter={Toggle}
            defaultChecked={value.editorAdmin}
          />
          <FormGroup
            name="editorFlow"
            label="Enable FLow Editors "
            accepter={Toggle}
            defaultChecked={value.editorFlow}
          />
          <FormGroup
            name="editorSchema"
            label="Enable Schema Editors "
            accepter={Toggle}
            defaultChecked={value.editorSchema}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
