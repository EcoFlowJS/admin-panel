import { FormGroup } from "@eco-flow/components-lib";
import { configOptions } from "@eco-flow/types";
import React from "react";
import { Input, Toggle } from "rsuite";
import { defaultServerConfigsOptions } from "../../pages/ServerConfigurations/serverConfigList";

interface FlowConfigurationTabProps {
  defaultServerConfigs?: configOptions;
  value: typeof defaultServerConfigsOptions;
}

export default function FlowConfigurationTab({
  defaultServerConfigs,
  value,
}: FlowConfigurationTabProps) {
  return (
    <>
      <FormGroup
        name="flowFile"
        label="Flow File Name :- "
        accepter={Input}
        autoComplete="off"
        placeholder={defaultServerConfigs?.flowFile}
      />
      <FormGroup
        name="flowFilePretty"
        label="Pretty Flow File :- "
        accepter={Toggle}
        defaultChecked={value.flowFilePretty}
      />
    </>
  );
}
