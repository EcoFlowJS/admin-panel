import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  CheckPicker,
  Container,
  Content,
  Divider,
  FlexboxGrid,
  Footer,
  Header,
  Input,
  InputNumber,
  SelectPicker,
  Tabs,
  Toggle,
} from "rsuite";
import AdminLoading from "../../components/Loading/AdminLoading.component";
import getAllServerConfigService from "../../service/config/getAllServerConfig.service";
import {
  Form,
  FormGroup,
  InputEnv,
  InputPasswordEnv,
} from "@eco-flow/components-lib";
import { configOptions } from "@eco-flow/types";
import ServerConfigParser from "./ServerConfigParser";
import routeList from "./routesList";
import {
  DB_DriverList,
  DB_DriverParser,
  defaultServerConfigsOptions,
  logList,
} from "./serverConfigList";
import isEnv from "../../utils/isEnv/inEnv";
import updateConfigs from "../../service/config/updateConfig";
import axios from "../../utils/axios/axios";

export default function ServerConfigurations() {
  const [isLoading, setLoading] = useState(true);
  const [isLoadingError, setLoadingError] = useState(false);
  const [defaultServerConfigs, setDefaultServerConfig] =
    useState<configOptions>();
  const [value, setValue] = useState(defaultServerConfigsOptions);
  const submitButtonRef = useRef(null);

  const [isEnvMongoConnectionString, setEnvMongoConnectionString] =
    useState(false);
  const [
    isEnvMongoConnectionStringChecked,
    setEnvMongoConnectionStringChecked,
  ] = useState(false);
  const [isEnvUsername, setEnvUsername] = useState(false);
  const [isEnvUsernameChecked, setEnvUsernameChecked] = useState(false);
  const [isEnvPassword, setEnvPassword] = useState(false);
  const [isEnvPasswordChecked, setEnvPasswordChecked] = useState(false);
  const [isEnvDatabase, setEnvDatabase] = useState(false);
  const [isEnvDatabaseChecked, setEnvDatabaseChecked] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getAllServerConfigService();
      if (response.success) {
        const { defaultConfig, serverConfig } = response.payload;
        setDefaultServerConfig(defaultConfig);
        const config = ServerConfigParser(serverConfig);
        if (
          typeof config.databaseConfigurationConnectionString !== "undefined"
        ) {
          const [isEnvMongoString, EnvMongoString] = isEnv(
            config.databaseConfigurationConnectionString
          );
          config.databaseConfigurationConnectionString = EnvMongoString;
          setEnvMongoConnectionStringChecked(isEnvMongoString);
          setEnvMongoConnectionString(isEnvMongoString);
        }

        if (typeof config.databaseConfigurationUser !== "undefined") {
          const [isEnvUsername, EnvUsername] = isEnv(
            config.databaseConfigurationUser
          );
          config.databaseConfigurationUser = EnvUsername;
          setEnvUsernameChecked(isEnvUsername);
          setEnvUsername(isEnvUsername);
        }

        if (typeof config.databaseConfigurationPassword !== "undefined") {
          const [isEnvPassword, EnvPassword] = isEnv(
            config.databaseConfigurationPassword
          );
          config.databaseConfigurationPassword = EnvPassword;
          setEnvPasswordChecked(isEnvPassword);
          setEnvPassword(isEnvPassword);
        }

        if (typeof config.databaseConfigurationPassword !== "undefined") {
          const [isEnvDatabase, EnvDatabase] = isEnv(
            config.databaseConfigurationDatabase
          );
          config.databaseConfigurationDatabase = EnvDatabase;
          setEnvDatabaseChecked(isEnvDatabase);
          setEnvDatabase(isEnvDatabase);
        }

        setValue({
          ...value,
          ...config,
          httpCorsExposeHeaders: config.httpCorsExposeHeaders.toString(),
          httpCorsAllowHeaders: config.httpCorsAllowHeaders?.toString(),
          databaseDriver: DB_DriverParser(config.databaseDriver),
        });
      }
      if (response.error) setLoadingError(true);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (value.databaseDriver === "MySQL")
      setValue({ ...value, databaseConfigurationPort: 3306 });

    if (value.databaseDriver === "PostgreSQL")
      setValue({ ...value, databaseConfigurationPort: 5432 });
  }, [value.databaseDriver]);

  const configProcessHandler = () => {
    const SendData = { ...value };
    if (isEnvMongoConnectionString)
      SendData.databaseConfigurationConnectionString = `env(${value.databaseConfigurationConnectionString})`;
    if (isEnvUsername)
      SendData.databaseConfigurationUser = `env(${value.databaseConfigurationUser})`;
    if (isEnvPassword)
      SendData.databaseConfigurationPassword = `env(${value.databaseConfigurationPassword})`;
    if (isEnvDatabase)
      SendData.databaseConfigurationDatabase = `env(${value.databaseConfigurationDatabase})`;

    console.log(SendData);
    updateConfigs(SendData)
      .then((val) => console.log(val))
      .catch((err) => axios(err.payload.config));
  };

  return (
    <>
      {isLoading ? (
        <AdminLoading />
      ) : (
        <Container>
          <Header style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
            <FlexboxGrid justify="space-between">
              <FlexboxGrid.Item>
                <h4>Server Configurations</h4>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item>
                <Button
                  appearance="primary"
                  onClick={() => (submitButtonRef.current! as any).click()}
                >
                  Confirm
                </Button>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </Header>
          <Divider />
          <Content>
            <Form
              disabled={isLoadingError}
              layout="horizontal"
              style={{ paddingTop: "2rem" }}
              checkTrigger="none"
              onChange={(changed) => setValue({ ...value, ...changed })}
              formValue={value}
              onSubmit={(status, event) => {
                event.preventDefault();
                configProcessHandler();
              }}
            >
              <Tabs defaultActiveKey="1" vertical appearance="tabs">
                <Tabs.Tab eventKey="1" title="Server Configutations">
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
                </Tabs.Tab>
                <Tabs.Tab eventKey="2" title="Cors Configutations">
                  <FormGroup
                    name="httpCorsEnabled"
                    label="Enable  "
                    accepter={Toggle}
                    defaultChecked={value.httpCorsEnabled}
                  />
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
                        defaultChecked={value.httpCorsCredentials}
                      />
                      <FormGroup
                        name="httpCorsKeepHeadersOnError"
                        label="Cors KeepHeadersOnError:-"
                        accepter={Toggle}
                        defaultChecked={value.httpCorsKeepHeadersOnError}
                      />
                      <FormGroup
                        name="httpCorsSecureContext"
                        label="Cors SecureContext:-"
                        accepter={Toggle}
                        defaultChecked={value.httpCorsSecureContext}
                      />
                      <FormGroup
                        name="httpCorsPrivateNetworkAccess"
                        label="Cors PrivateNetworkAccess:-"
                        accepter={Toggle}
                        defaultChecked={value.httpCorsPrivateNetworkAccess}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </Tabs.Tab>
                <Tabs.Tab eventKey="3" title="EcoFlow Router Configutations">
                  <FormGroup
                    name="systemRouterOptionsPrefix"
                    label="EcoFlow Router Prefix :- "
                    accepter={Input}
                    autoComplete="off"
                    placeholder={
                      defaultServerConfigs?.systemRouterOptions?.prefix
                    }
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
                    placeholder={
                      defaultServerConfigs?.systemRouterOptions?.routerPath
                    }
                  />
                  <FormGroup
                    name="systemRouterOptionsHost"
                    label="EcoFlow Router Host :- "
                    accepter={Input}
                    autoComplete="off"
                    placeholder={
                      defaultServerConfigs?.systemRouterOptions?.host
                    }
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
                </Tabs.Tab>
                <Tabs.Tab eventKey="4" title="API Router Configutations">
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
                    placeholder={
                      defaultServerConfigs?.apiRouterOptions?.routerPath
                    }
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
                    defaultChecked={value.apiRouterOptionsSensitive}
                  />
                  <FormGroup
                    name="apiRouterOptionsStrict"
                    label="EcoFlow Router Strict Mode "
                    accepter={Toggle}
                    defaultChecked={value.apiRouterOptionsStrict}
                  />
                  <FormGroup
                    name="apiRouterOptionsExclusive"
                    label="EcoFlow Router Exclusive Mode "
                    accepter={Toggle}
                    defaultChecked={value.apiRouterOptionsExclusive}
                  />
                </Tabs.Tab>
                <Tabs.Tab eventKey="5" title="Directory Configutations">
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
                </Tabs.Tab>
                <Tabs.Tab eventKey="6" title="Flow Configutations">
                  <FormGroup
                    name="flowFile"
                    label="Flow File Name :- "
                    accepter={Input}
                    autoComplete="off"
                    placeholder={defaultServerConfigs?.flowFile}
                  />
                  <FormGroup
                    name="flowFilePretty"
                    label="Pretty Flow File :- "
                    accepter={Toggle}
                    defaultChecked={value.flowFilePretty}
                  />
                </Tabs.Tab>
                <Tabs.Tab eventKey="7" title="Logging Configutations">
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
                            mix={1}
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
                </Tabs.Tab>
                <Tabs.Tab eventKey="8" title="Editor Configutations">
                  <FormGroup
                    name="editorEnabled"
                    label="Enable Editors "
                    accepter={Toggle}
                    defaultChecked={value.editorEnabled}
                  />
                  {value.editorEnabled ? (
                    <>
                      <FormGroup
                        name="editorAdmin"
                        label="Enable Admin Editors"
                        accepter={Toggle}
                        defaultChecked={value.editorAdmin}
                      />
                      <FormGroup
                        name="editorFlow"
                        label="Enable FLow Editors "
                        accepter={Toggle}
                        defaultChecked={value.editorFlow}
                      />
                      <FormGroup
                        name="editorSchema"
                        label="Enable Schema Editors "
                        accepter={Toggle}
                        defaultChecked={value.editorSchema}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </Tabs.Tab>
                <Tabs.Tab eventKey="9" title="System Database Configutations">
                  <FormGroup
                    name="databaseDriver"
                    label="Database Driver"
                    accepter={SelectPicker}
                    data={DB_DriverList}
                    style={{ width: 150 }}
                    searchable={false}
                    onClean={() => setValue({ ...value, databaseDriver: "" })}
                  />
                  {value.databaseDriver !== "" ? (
                    value.databaseDriver === "MongoDB" ? (
                      <>
                        <FormGroup
                          name="databaseConfigurationConnectionString"
                          label="Connection String"
                          accepter={InputEnv}
                          autoComplete="off"
                          placeholder="Connection String"
                          style={{ width: 250 }}
                          envCheckbox
                          envCheckboxOnChange={setEnvMongoConnectionString}
                          defaultChecked={isEnvMongoConnectionStringChecked}
                        />
                        {isEnvMongoConnectionStringChecked.toString()}
                      </>
                    ) : value.databaseDriver === "Sqlite" ? (
                      <>
                        <FormGroup
                          name="databaseConfigurationFilename"
                          label="Sqlite File "
                          accepter={Input}
                          autoComplete="off"
                          placeholder="Sqlite File"
                          helperText="File will create automatically if not exists"
                        />
                      </>
                    ) : (
                      <>
                        <FormGroup
                          name="databaseConfigurationHost"
                          label="Host"
                          accepter={Input}
                          autoComplete="off"
                          placeholder="localhost"
                          style={{ width: 250 }}
                        />
                        <FormGroup
                          name="databaseConfigurationPort"
                          label="Port"
                          accepter={InputNumber}
                          placeholder={
                            value.databaseDriver === "MySQL"
                              ? "3306"
                              : value.databaseDriver === "PostgreSQL"
                              ? "5432"
                              : "3000"
                          }
                          min={1}
                          max={65535}
                          style={{ width: 250 }}
                        />
                        <FormGroup
                          name="databaseConfigurationUser"
                          label="Username"
                          accepter={InputEnv}
                          autoComplete="off"
                          placeholder="Username"
                          style={{ width: 250 }}
                          envCheckbox
                          envCheckboxOnChange={setEnvUsername}
                          defaultChecked={isEnvUsernameChecked}
                        />
                        <FormGroup
                          name="databaseConfigurationPassword"
                          label="Password"
                          accepter={InputPasswordEnv}
                          placeholder="Password"
                          style={{ width: 250 }}
                          envCheckbox
                          envCheckboxOnChange={setEnvPassword}
                          defaultChecked={isEnvPasswordChecked}
                        />
                        <FormGroup
                          name="databaseConfigurationDatabase"
                          label="Database Name"
                          accepter={InputEnv}
                          autoComplete="off"
                          placeholder="Database Name"
                          style={{ width: 250 }}
                          envCheckbox
                          envCheckboxOnChange={setEnvDatabase}
                          defaultChecked={isEnvDatabaseChecked}
                        />
                        <FormGroup
                          name="databaseConfigurationSsl"
                          label="SSL  "
                          accepter={Toggle}
                          defaultChecked={value.databaseConfigurationSsl}
                        />
                      </>
                    )
                  ) : (
                    <></>
                  )}
                </Tabs.Tab>
              </Tabs>
              <input type="submit" hidden ref={submitButtonRef} />
            </Form>
          </Content>
        </Container>
      )}
    </>
  );
}
