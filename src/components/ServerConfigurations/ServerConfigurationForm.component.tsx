import { Form } from "@eco-flow/components-lib";
import React from "react";
import { FormProps, Tabs } from "rsuite";
import ServerConfigurationTab from "./ServerConfigurationTab.component";
import CorsConfigurationTab from "./CorsConfigurationTab.component";
import EcoFlowRouterConfigurationTab from "./EcoFlowRouterConfigurationTab.component";
import ApiRouterConfigurationTab from "./ApiRouterConfigurationTab.component";
import DirectoryConfigurationTab from "./DirectoryConfigurationTab.component";
import FlowConfigurationTab from "./FlowConfigurationTab.component";
import LoggingConfigurationTab from "./LoggingConfigurationTab.component";
import EditorConfigurationTab from "./EditorConfigurationTab.componnent";
import SystemDatabaseConfigurationTab from "./SystemDatabaseConfigurationTab.component";
import { configOptions } from "@eco-flow/types";
import { defaultServerConfigsOptions } from "../../pages/ServerConfigurations/serverConfigList";

interface ServerConfigurationFormProps extends FormProps {
  defaultServerConfigs?: configOptions;
  formValue: [
    typeof defaultServerConfigsOptions,
    React.Dispatch<React.SetStateAction<typeof defaultServerConfigsOptions>>
  ];

  connectionStringEnvs?: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ];
  usernameEnvs?: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  passwordEnvs?: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  databaseEnvs?: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export default function ServerConfigurationForm({
  defaultServerConfigs,
  formValue,
  onChange = () => {},
  connectionStringEnvs,
  usernameEnvs,
  passwordEnvs,
  databaseEnvs,
  ...props
}: ServerConfigurationFormProps) {
  const [value, setValue] = formValue;

  return (
    <>
      <Form
        onChange={(
          formValue: Record<string, any>,
          event?: React.SyntheticEvent<Element, Event> | undefined
        ) => {
          onChange(formValue, event);
          setValue({ ...value, ...formValue });
        }}
        formValue={value}
        {...props}
      >
        <Tabs defaultActiveKey="1" vertical appearance="tabs">
          <Tabs.Tab eventKey="1" title="Server Configutations">
            <ServerConfigurationTab
              defaultServerConfigs={defaultServerConfigs}
              value={value}
            />
          </Tabs.Tab>
          <Tabs.Tab eventKey="2" title="Cors Configutations">
            <CorsConfigurationTab
              defaultServerConfigs={defaultServerConfigs}
              value={value}
            />
          </Tabs.Tab>
          <Tabs.Tab eventKey="3" title="EcoFlow Router Configutations">
            <EcoFlowRouterConfigurationTab
              defaultServerConfigs={defaultServerConfigs}
              value={value}
            />
          </Tabs.Tab>
          <Tabs.Tab eventKey="4" title="API Router Configutations">
            <ApiRouterConfigurationTab
              defaultServerConfigs={defaultServerConfigs}
              value={value}
            />
          </Tabs.Tab>
          <Tabs.Tab eventKey="5" title="Directory Configutations">
            <DirectoryConfigurationTab
              defaultServerConfigs={defaultServerConfigs}
              value={value}
            />
          </Tabs.Tab>
          <Tabs.Tab eventKey="6" title="Flow Configutations">
            <FlowConfigurationTab
              defaultServerConfigs={defaultServerConfigs}
              value={value}
            />
          </Tabs.Tab>
          <Tabs.Tab eventKey="7" title="Logging Configutations">
            <LoggingConfigurationTab
              defaultServerConfigs={defaultServerConfigs}
              value={value}
            />
          </Tabs.Tab>
          <Tabs.Tab eventKey="8" title="Editor Configutations">
            <EditorConfigurationTab
              defaultServerConfigs={defaultServerConfigs}
              value={value}
            />
          </Tabs.Tab>
          <Tabs.Tab eventKey="9" title="System Database Configutations">
            <SystemDatabaseConfigurationTab
              value={value}
              setValue={setValue}
              connectionStringEnvs={connectionStringEnvs}
              usernameEnvs={usernameEnvs}
              passwordEnvs={passwordEnvs}
              databaseEnvs={databaseEnvs}
            />
          </Tabs.Tab>
        </Tabs>
      </Form>
    </>
  );
}
