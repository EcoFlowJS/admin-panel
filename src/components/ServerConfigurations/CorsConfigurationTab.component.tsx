import { configOptions } from "@ecoflow/types";
import { defaultServerConfigsOptions } from "../../pages/ServerConfigurations/serverConfigList";
import { FormGroup } from "@ecoflow/components-lib";
import { CheckPicker, Input, Toggle } from "rsuite";
import routeList from "./routeList";

interface CorsConfigurationTabProps {
  defaultServerConfigs?: configOptions;
  value: typeof defaultServerConfigsOptions;
}

export default function CorsConfigurationTab({
  defaultServerConfigs,
  value,
}: CorsConfigurationTabProps) {
  return (
    <>
      <FormGroup name="httpCorsEnabled" label="Enable  " accepter={Toggle} />
      {value.httpCorsEnabled ? (
        <>
          <FormGroup
            name="httpCorsOrigin"
            label="Cors Origin :- "
            accepter={Input}
            autoComplete="off"
            placeholder={defaultServerConfigs?.httpCors?.origin}
          />
          <FormGroup
            name="httpCorsAllowMethods"
            label="Cors AllowMethods :- "
            accepter={CheckPicker}
            autoComplete="off"
            searchable={false}
            data={routeList}
            style={{ width: 300 }}
          />
          <FormGroup
            name="httpCorsExposeHeaders"
            label="Cors ExposeHeaders :- "
            accepter={Input}
            autoComplete="off"
            helperTextStyle={{ marginLeft: 242 }}
            helperText={
              <>
                use <strong>,</strong> to separate multiple headers
              </>
            }
          />
          <FormGroup
            name="httpCorsAllowHeaders"
            label="Cors AllowHeaders :- "
            accepter={Input}
            autoComplete="off"
            helperTextStyle={{ marginLeft: 242 }}
            helperText={
              <>
                use <strong>,</strong> to separate multiple headers
              </>
            }
          />
          <FormGroup
            name="httpCorsMaxAge"
            label="Cors MaxAge :-"
            accepter={Input}
            autoComplete="off"
          />
          <FormGroup
            name="httpCorsCredentials"
            label="Cors Credentials :-"
            accepter={Toggle}
          />
          <FormGroup
            name="httpCorsKeepHeadersOnError"
            label="Cors KeepHeadersOnError:-"
            accepter={Toggle}
          />
          <FormGroup
            name="httpCorsSecureContext"
            label="Cors SecureContext:-"
            accepter={Toggle}
          />
          <FormGroup
            name="httpCorsPrivateNetworkAccess"
            label="Cors PrivateNetworkAccess:-"
            accepter={Toggle}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
}
