import { configOptions } from "@ecoflow/types";
import { FormGroup } from "@ecoflow/components-lib";
import { CheckPicker, Input, Toggle } from "rsuite";
import routeList from "./routeList";

interface ApiRouterConfigurationTabProps {
  defaultServerConfigs?: configOptions;
}

export default function ApiRouterConfigurationTab({
  defaultServerConfigs,
}: ApiRouterConfigurationTabProps) {
  return (
    <>
      <FormGroup
        name="apiRouterOptionsPrefix"
        label="EcoFlow Router Prefix :- "
        accepter={Input}
        autoComplete="off"
        placeholder={defaultServerConfigs?.apiRouterOptions?.prefix}
      />
      <FormGroup
        name="apiRouterOptionsMethods"
        label="EcoFlow Router AllowMethods :- "
        accepter={CheckPicker}
        autoComplete="off"
        searchable={false}
        data={routeList}
        style={{ width: 300 }}
      />
      <FormGroup
        name="apiRouterOptionsRouterPath"
        label="EcoFlow Router Path :- "
        accepter={Input}
        autoComplete="off"
        placeholder={defaultServerConfigs?.apiRouterOptions?.routerPath}
      />
      <FormGroup
        name="apiRouterOptionsHost"
        label="EcoFlow Router Host :- "
        accepter={Input}
        autoComplete="off"
        placeholder={defaultServerConfigs?.apiRouterOptions?.host}
      />
      <FormGroup
        name="apiRouterOptionsSensitive"
        label="EcoFlow Router case-sensitive :- "
        accepter={Toggle}
      />
      <FormGroup
        name="apiRouterOptionsStrict"
        label="EcoFlow Router Strict Mode "
        accepter={Toggle}
      />
      <FormGroup
        name="apiRouterOptionsExclusive"
        label="EcoFlow Router Exclusive Mode "
        accepter={Toggle}
      />
    </>
  );
}
