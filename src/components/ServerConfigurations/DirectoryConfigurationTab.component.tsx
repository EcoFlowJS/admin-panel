import { configOptions } from "@ecoflow/types";
import { FormGroup } from "@ecoflow/components-lib";
import { Input } from "rsuite";

interface DirectoryConfigurationTabProps {
  defaultServerConfigs?: configOptions;
}

export default function DirectoryConfigurationTab({
  defaultServerConfigs,
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
        name="flowDir"
        label="Flow directory :- "
        accepter={Input}
        autoComplete="off"
        placeholder={defaultServerConfigs?.flowDir}
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
