import { defaultServerConfigsOptions } from "../../pages/ServerConfigurations/serverConfigList";
import { FormGroup } from "@ecoflow/components-lib";
import { Input, InputNumber, SelectPicker, Toggle } from "rsuite";
import logList from "./logList";

interface LoggingConfigurationTabProps {
  value: typeof defaultServerConfigsOptions;
}

export default function LoggingConfigurationTab({
  value,
}: LoggingConfigurationTabProps) {
  return (
    <>
      <FormGroup name="loggingEnabled" label="Enable Logs " accepter={Toggle} />
      {value.loggingEnabled ? (
        <>
          <FormGroup
            name="loggingLevel"
            label="Logs Level "
            accepter={SelectPicker}
            data={logList}
            style={{ width: 150 }}
            searchable={false}
          />
          <FormGroup
            name="loggingFormat"
            label="Logs Format :- "
            accepter={Input}
            placeholder={value.loggingFormat}
          />
          <FormGroup
            name="loggingPrettyPrint"
            label="Logs Pretty Print "
            accepter={Toggle}
          />
          <FormGroup
            name="loggingLableEnable"
            label="Logs Label Enable "
            accepter={Toggle}
          />
          {value.loggingLableEnable ? (
            <FormGroup
              name="loggingLableLable"
              label="Logs Label :- "
              accepter={Input}
              placeholder={value.loggingLableLable}
            />
          ) : (
            <></>
          )}
          <FormGroup
            name="loggingConsole"
            label="Logs Enable Console "
            accepter={Toggle}
          />
          <FormGroup
            name="loggingFileEnabled"
            label="Logs Enable File "
            accepter={Toggle}
          />
          {value.loggingFileEnabled ? (
            <>
              <FormGroup
                name="loggingFileLocation"
                label="Logs File Location :- "
                accepter={Input}
                placeholder={value.loggingFileLocation}
              />
              <FormGroup
                name="loggingFileFilename"
                label="Logs Filename :- "
                accepter={Input}
                placeholder={value.loggingFileFilename}
              />
            </>
          ) : (
            <></>
          )}

          <FormGroup
            name="loggingWebEnabled"
            label="Logs Enable Web "
            accepter={Toggle}
          />
          {value.loggingWebEnabled ? (
            <>
              <FormGroup
                name="loggingWebHost"
                label="Logs Web Host :- "
                accepter={Input}
                placeholder={value.loggingWebHost}
              />
              <FormGroup
                name="loggingWebPort"
                label="Logs Web Port :- "
                accepter={InputNumber}
                max={65535}
                min={1}
                placeholder={value.loggingWebPort}
              />
              <FormGroup
                name="loggingWebPath"
                label="Logs Web Path :- "
                accepter={Input}
                placeholder={value.loggingWebPath}
              />
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
}
