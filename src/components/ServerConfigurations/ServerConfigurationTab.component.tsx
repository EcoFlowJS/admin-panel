import { FormGroup } from "@eco-flow/components-lib";
import { configOptions } from "@eco-flow/types";
import { Input, InputNumber, Tabs, Toggle } from "rsuite";
import { defaultServerConfigsOptions } from "../../pages/ServerConfigurations/serverConfigList";

interface ServerConfigurationTabProps {
  defaultServerConfigs?: configOptions;
  value: typeof defaultServerConfigsOptions;
}

export default function ServerConfigurationTab({
  defaultServerConfigs,
  value,
}: ServerConfigurationTabProps) {
  return (
    <>
      <FormGroup
        name="Host"
        label="Host :- "
        accepter={Input}
        autoComplete="off"
        placeholder={defaultServerConfigs?.Host}
      />
      <FormGroup
        name="Port"
        label="Port :- "
        accepter={InputNumber}
        autoComplete="off"
        placeholder={defaultServerConfigs?.Port}
        max={65535}
        min={1}
      />
      <FormGroup
        name="httpStatic"
        label="Static Serve Uri :- "
        accepter={Input}
        autoComplete="off"
        placeholder={defaultServerConfigs?.httpStatic}
      />
      <FormGroup
        name="httpsEnabled"
        label="Https :- "
        accepter={Toggle}
        defaultChecked={value.httpsEnabled}
      />
      {value.httpsEnabled ? (
        <>
          <FormGroup
            name="httpsKey"
            label="Https key :- "
            accepter={Input}
            autoComplete="off"
            placeholder={defaultServerConfigs?.https?.key}
          />
          <FormGroup
            name="httpsCert"
            label="Https Certificate :- "
            accepter={Input}
            autoComplete="off"
            placeholder={defaultServerConfigs?.https?.cert}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
