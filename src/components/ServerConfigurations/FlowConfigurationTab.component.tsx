import { FormGroup } from "@ecoflow/components-lib";
import { configOptions } from "@ecoflow/types";
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
        name="flowNodeDefinitions"
        label="Flow definitions file name :- "
        accepter={Input}
        autoComplete="off"
        placeholder={defaultServerConfigs?.flowNodeDefinitions}
      />
      <FormGroup
        name="flowNodeConnections"
        label="Flow connections file name :- "
        accepter={Input}
        autoComplete="off"
        placeholder={defaultServerConfigs?.flowNodeConnections}
      />
      <FormGroup
        name="flowNodeConfigurations"
        label="Flow node configurations file name :- "
        accepter={Input}
        autoComplete="off"
        placeholder={defaultServerConfigs?.flowNodeConfigurations}
      />
      <FormGroup
        name="flowFilePretty"
        label="Pretty Flow File :- "
        accepter={Toggle}
        checked={value.flowFilePretty}
      />
    </>
  );
}
