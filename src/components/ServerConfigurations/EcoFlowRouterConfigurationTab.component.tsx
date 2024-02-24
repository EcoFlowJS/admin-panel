import { FormGroup } from "@eco-flow/components-lib";
import { configOptions } from "@eco-flow/types";
import React from "react";
import { defaultServerConfigsOptions } from "../../pages/ServerConfigurations/serverConfigList";
import { CheckPicker, Input, Toggle } from "rsuite";
import routeList from "./routeList";

interface EcoFlowRouterConfigurationTabProps {
  defaultServerConfigs?: configOptions;
  value: typeof defaultServerConfigsOptions;
}

export default function EcoFlowRouterConfigurationTab({
  defaultServerConfigs,
  value,
}: EcoFlowRouterConfigurationTabProps) {
  return (
    <>
      <FormGroup
        name="systemRouterOptionsPrefix"
        label="EcoFlow Router Prefix :- "
        accepter={Input}
        autoComplete="off"
        placeholder={defaultServerConfigs?.systemRouterOptions?.prefix}
      />
      <FormGroup
        name="systemRouterOptionsMethods"
        label="EcoFlow Router AllowMethods :- "
        accepter={CheckPicker}
        autoComplete="off"
        searchable={false}
        data={routeList}
        style={{ width: 300 }}
      />
      <FormGroup
        name="systemRouterOptionsRouterPath"
        label="EcoFlow Router Path :- "
        accepter={Input}
        autoComplete="off"
        placeholder={defaultServerConfigs?.systemRouterOptions?.routerPath}
      />
      <FormGroup
        name="systemRouterOptionsHost"
        label="EcoFlow Router Host :- "
        accepter={Input}
        autoComplete="off"
        placeholder={defaultServerConfigs?.systemRouterOptions?.host}
      />
      <FormGroup
        name="systemRouterOptionsSensitive"
        label="EcoFlow Router case-sensitive :- "
        accepter={Toggle}
        defaultChecked={value.systemRouterOptionsSensitive}
      />
      <FormGroup
        name="systemRouterOptionsStrict"
        label="EcoFlow Router Strict Mode "
        accepter={Toggle}
        defaultChecked={value.systemRouterOptionsStrict}
      />
      <FormGroup
        name="systemRouterOptionsExclusive"
        label="EcoFlow Router Exclusive Mode "
        accepter={Toggle}
        defaultChecked={value.systemRouterOptionsExclusive}
      />
    </>
  );
}
