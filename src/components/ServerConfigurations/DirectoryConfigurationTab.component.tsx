import { configOptions } from "@eco-flow/types";
import React from "react";
import { defaultServerConfigsOptions } from "../../pages/ServerConfigurations/serverConfigList";
import { FormGroup } from "@eco-flow/components-lib";
import { Input } from "rsuite";

interface DirectoryConfigurationTabProps {
  defaultServerConfigs?: configOptions;
  value: typeof defaultServerConfigsOptions;
}

export default function DirectoryConfigurationTab({
  defaultServerConfigs,
  value,
}: DirectoryConfigurationTabProps) {
  return (
    <>
      <FormGroup
        name="userDir"
        label="Base directory :- "
        accepter={Input}
        autoComplete="off"
        placeholder={defaultServerConfigs?.userDir}
      />
      <FormGroup
        name="moduleDir"
        label="Module directory :- "
        accepter={Input}
        autoComplete="off"
        placeholder={defaultServerConfigs?.moduleDir}
      />
      <FormGroup
        name="envDir"
        label="Environment directory :- "
        accepter={Input}
        autoComplete="off"
        placeholder={defaultServerConfigs?.envDir}
      />
      <FormGroup
        name="DB_Directory"
        label="Database directory :- "
        accepter={Input}
        autoComplete="off"
        placeholder={defaultServerConfigs?.DB_Directory}
      />
      <FormGroup
        name="httpStaticRoot"
        label="Static Serve Location :- "
        accepter={Input}
        autoComplete="off"
        placeholder={defaultServerConfigs?.httpStaticRoot}
      />
    </>
  );
}
