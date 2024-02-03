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
  Tabs,
  Toggle,
} from "rsuite";
import AdminLoading from "../../components/Loading/AdminLoading.component";
import getAllServerConfigService from "../../service/config/getAllServerConfig.service";
import { Form, FormGroup } from "@eco-flow/components-lib";
import { configOptions } from "@eco-flow/types";
import ServerConfigParser from "./ServerConfigParser";
import routeList from "./routesList";

export default function ServerConfigurations() {
  const [isLoading, setLoading] = useState(true);
  const [isLoadingError, setLoadingError] = useState(false);
  const [defaultServerConfigs, setDefaultServerConfig] =
    useState<configOptions>();
  const [value, setValue] = useState({
    userDir: "",
    moduleDir: "",
    envDir: "",
    DB_Directory: "",
    flowFile: "",
    flowFilePretty: false,
    Host: "",
    Port: 0,
    httpsEnabled: false,
    httpsKey: "",
    httpsCert: "",
    httpCorsEnabled: false,
    httpCorsOrigin: "",
    httpCorsAllowMethods: [],
    httpCorsExposeHeaders: "",
    httpCorsAllowHeaders: "",
    httpCorsCredentials: false,
    httpCorsKeepHeadersOnError: false,
    httpCorsSecureContext: false,
    httpCorsPrivateNetworkAccess: false,
    systemRouterOptionsPrefix: "",
    systemRouterOptionsMethods: [],
    systemRouterOptionsRouterPath: "",
    systemRouterOptionsSensitive: false,
    systemRouterOptionsStrict: false,
    systemRouterOptionsExclusive: false,
    systemRouterOptionsHost: "",
    apiRouterOptionsPrefix: "",
    apiRouterOptionsMethods: [],
    apiRouterOptionsRouterPath: "",
    apiRouterOptionsSensitive: false,
    apiRouterOptionsStrict: false,
    apiRouterOptionsExclusive: false,
    apiRouterOptionsHost: "",
    httpStatic: "",
    httpStaticRoot: "",
  });
  const submitButtonRef = useRef(null);

  useEffect(() => {
    (async () => {
      const response = await getAllServerConfigService();
      if (response.success) {
        const { defaultConfig, serverConfig } = response.payload;
        setDefaultServerConfig(defaultConfig);
        const config = ServerConfigParser(serverConfig);
        setValue({
          ...value,
          ...config,
          httpCorsExposeHeaders: config.httpCorsExposeHeaders.toString(),
          httpCorsAllowHeaders: config.httpCorsAllowHeaders?.toString(),
        });
      }
      if (response.error) setLoadingError(true);
      setLoading(false);
    })();
  }, []);

  // useEffect(() => console.log(isSSL), [isSSL]);

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
                console.log(value, Object.keys(value).length);
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
                <Tabs.Tab
                  eventKey="7"
                  title="Logging Configutations"
                ></Tabs.Tab>
                <Tabs.Tab eventKey="8" title="Editor Configutations"></Tabs.Tab>
                <Tabs.Tab
                  eventKey="9"
                  title="System Database Configutations"
                ></Tabs.Tab>
              </Tabs>
              <input type="submit" hidden ref={submitButtonRef} />
            </Form>
          </Content>
        </Container>
      )}
    </>
  );
}
