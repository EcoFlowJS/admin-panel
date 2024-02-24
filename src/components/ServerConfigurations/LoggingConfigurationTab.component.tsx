import { configOptions } from "@eco-flow/types";
import React from "react";
import { defaultServerConfigsOptions } from "../../pages/ServerConfigurations/serverConfigList";
import { FormGroup } from "@eco-flow/components-lib";
import { Input, InputNumber, SelectPicker, Toggle } from "rsuite";
import logList from "./logList";

interface LoggingConfigurationTabProps {
  defaultServerConfigs?: configOptions;
  value: typeof defaultServerConfigsOptions;
}

export default function LoggingConfigurationTab({
  defaultServerConfigs,
  value,
}: LoggingConfigurationTabProps) {
  return (
    <>
      <FormGroup
        name="loggingEnabled"
        label="Enable Logs "
        accepter={Toggle}
        defaultChecked={value.loggingEnabled}
      />
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
            defaultChecked={value.loggingPrettyPrint}
          />
          <FormGroup
            name="loggingLableEnable"
            label="Logs Lable Enable "
            accepter={Toggle}
            defaultChecked={value.loggingLableEnable}
          />
          {value.loggingLableEnable ? (
            <FormGroup
              name="loggingLableLable"
              label="Logs Lable :- "
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
            defaultChecked={value.loggingConsole}
          />
          <FormGroup
            name="loggingFileEnabled"
            label="Logs Enable File "
            accepter={Toggle}
            defaultChecked={value.loggingFileEnabled}
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
            defaultChecked={value.loggingWebEnabled}
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
