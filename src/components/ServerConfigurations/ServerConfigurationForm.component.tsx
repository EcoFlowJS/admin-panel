import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import { Form, FormProps, Tabs } from "rsuite";
import ServerConfigurationTab from "./ServerConfigurationTab.component";
import CorsConfigurationTab from "./CorsConfigurationTab.component";
import EcoFlowRouterConfigurationTab from "./EcoFlowRouterConfigurationTab.component";
import ApiRouterConfigurationTab from "./ApiRouterConfigurationTab.component";
import DirectoryConfigurationTab from "./DirectoryConfigurationTab.component";
import FlowConfigurationTab from "./FlowConfigurationTab.component";
import LoggingConfigurationTab from "./LoggingConfigurationTab.component";
import EditorConfigurationTab from "./EditorConfigurationTab.componnent";
import SystemDatabaseConfigurationTab from "./SystemDatabaseConfigurationTab.component";
import { configOptions } from "@ecoflow/types";
import { defaultServerConfigsOptions } from "../../pages/ServerConfigurations/serverConfigList";

interface ServerConfigurationFormProps extends FormProps {
  defaultServerConfigs?: configOptions;
  formValue: [
    typeof defaultServerConfigsOptions,
    Dispatch<SetStateAction<typeof defaultServerConfigsOptions>>
  ];

  connectionStringEnvs?: [boolean, Dispatch<SetStateAction<boolean>>];
  usernameEnvs?: [boolean, Dispatch<SetStateAction<boolean>>];
  passwordEnvs?: [boolean, Dispatch<SetStateAction<boolean>>];
  databaseEnvs?: [boolean, Dispatch<SetStateAction<boolean>>];
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
  const [eventKey, setEventKey] = useState("SC");

  return (
    <>
      <Form
        onChange={(
          formValue: Record<string, any>,
          event?: SyntheticEvent<Element, Event> | undefined
        ) => {
          onChange(formValue, event);
          setValue({ ...value, ...formValue });
        }}
        formValue={value}
        {...props}
      >
        <Tabs
          defaultActiveKey="SC"
          vertical
          appearance="tabs"
          onSelect={(eventKey) => setEventKey(eventKey!)}
        >
          <Tabs.Tab eventKey="SC" title="Server Configutations">
            {eventKey === "SC" ? (
              <ServerConfigurationTab
                defaultServerConfigs={defaultServerConfigs}
                value={value}
              />
            ) : (
              <></>
            )}
          </Tabs.Tab>
          <Tabs.Tab eventKey="CC" title="Cors Configutations">
            {eventKey === "CC" ? (
              <CorsConfigurationTab
                defaultServerConfigs={defaultServerConfigs}
                value={value}
              />
            ) : (
              <></>
            )}
          </Tabs.Tab>
          <Tabs.Tab eventKey="ERC" title="EcoFlow Router Configutations">
            {eventKey === "ERC" ? (
              <EcoFlowRouterConfigurationTab
                defaultServerConfigs={defaultServerConfigs}
              />
            ) : (
              <></>
            )}
          </Tabs.Tab>
          <Tabs.Tab eventKey="ARC" title="API Router Configutations">
            {eventKey === "ARC" ? (
              <ApiRouterConfigurationTab
                defaultServerConfigs={defaultServerConfigs}
              />
            ) : (
              <></>
            )}
          </Tabs.Tab>
          <Tabs.Tab eventKey="DC" title="Directory Configutations">
            {eventKey === "DC" ? (
              <DirectoryConfigurationTab
                defaultServerConfigs={defaultServerConfigs}
              />
            ) : (
              <></>
            )}
          </Tabs.Tab>
          <Tabs.Tab eventKey="FC" title="Flow Configutations">
            {eventKey === "FC" ? (
              <FlowConfigurationTab
                defaultServerConfigs={defaultServerConfigs}
                value={value}
              />
            ) : (
              <></>
            )}
          </Tabs.Tab>
          <Tabs.Tab eventKey="LC" title="Logging Configutations">
            {eventKey === "LC" ? (
              <LoggingConfigurationTab value={value} />
            ) : (
              <></>
            )}
          </Tabs.Tab>
          <Tabs.Tab eventKey="EC" title="Editor Configutations">
            {eventKey === "EC" ? (
              <EditorConfigurationTab value={value} />
            ) : (
              <></>
            )}
          </Tabs.Tab>
          <Tabs.Tab eventKey="SDBC" title="System Database Configutations">
            {eventKey === "SDBC" ? (
              <SystemDatabaseConfigurationTab
                value={value}
                setValue={setValue}
                connectionStringEnvs={connectionStringEnvs}
                usernameEnvs={usernameEnvs}
                passwordEnvs={passwordEnvs}
                databaseEnvs={databaseEnvs}
              />
            ) : (
              <></>
            )}
          </Tabs.Tab>
        </Tabs>
      </Form>
    </>
  );
}
