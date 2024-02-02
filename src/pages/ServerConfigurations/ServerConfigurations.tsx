import React, { useEffect, useState } from "react";
import {
  CheckPicker,
  Container,
  Content,
  Divider,
  Footer,
  Header,
  Input,
  InputNumber,
  Panel,
  Toggle,
} from "rsuite";
import AdminLoading from "../../components/Loading/AdminLoading.component";
import getAllServerConfigService from "../../service/config/getAllServerConfig.service";
import { Form, FormGroup } from "@eco-flow/components-lib";
import { configOptions } from "@eco-flow/types";
import ServerConfigParser from "./ServerConfigParser";
import routeList from "./routesList";

interface ServerConfig {
  userDir?: string;
  moduleDir?: string;
  envDir?: string;
  DB_Directory?: string;
  flowFile?: string;
  flowFilePretty?: boolean;
  Host?: string;
  Port?: number;
  httpsEnabled?: boolean;
  httpsKey?: string;
  httpsCert?: string;
  httpCorsEnabled?: boolean;
  httpCorsOrigin?: string;
  httpCorsExposeHeaders?: string;
  httpCorsAllowHeaders?: string;
  httpCorsCredentials?: boolean;
  httpCorsKeepHeadersOnError?: boolean;
  httpCorsSecureContext?: boolean;
  httpCorsPrivateNetworkAccess?: boolean;
}

export default function ServerConfigurations() {
  const [isLoading, setLoading] = useState(true);
  const [isLoadingError, setLoadingError] = useState(false);
  const [defaultServerConfigs, setDefaultServerConfig] =
    useState<configOptions>();
  const [value, setValue] = useState<ServerConfig>({});

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

  // useEffect(() => console.log(value), [value]);

  return (
    <>
      {isLoading ? (
        <AdminLoading />
      ) : (
        <Container>
          <Header>
            <h4>Server Configurations</h4>
          </Header>
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
              <Panel header={<h5>Configutations</h5>} bordered>
                <Panel bodyFill header={<h6>Server Configutations</h6>}>
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
                    name="httpsEnabled"
                    label="Https :- "
                    accepter={Toggle}
                    checked={value.httpsEnabled}
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

                  <FormGroup
                    name="httpCorsEnabled"
                    label="Cors :- "
                    accepter={Toggle}
                    checked={value.httpCorsEnabled}
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
                        checked={value.httpCorsCredentials}
                      />
                      <FormGroup
                        name="httpCorsKeepHeadersOnError"
                        label="CorsKeepHeadersOnError:-"
                        accepter={Toggle}
                        checked={value.httpCorsKeepHeadersOnError}
                      />
                      <FormGroup
                        name="httpCorsSecureContext"
                        label="Cors SecureContext:-"
                        accepter={Toggle}
                        checked={value.httpCorsSecureContext}
                      />
                      <FormGroup
                        name="httpCorsPrivateNetworkAccess"
                        label="CorsPrivateNetworkAccess:-"
                        accepter={Toggle}
                        checked={value.httpCorsPrivateNetworkAccess}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </Panel>
                <Divider />
                <Panel bodyFill header={<h6>Router Configutations</h6>}>
                  {/* //To-Do: Router configuration */}
                </Panel>
                <Divider />
                <Panel bodyFill header={<h6>Directory Configutations</h6>}>
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
                </Panel>
                <Divider />
                <Panel bodyFill header={<h6>Flow Configutations</h6>}>
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
                    checked={value.flowFilePretty}
                  />
                </Panel>
                <Divider />
              </Panel>
              <input type="submit" value="submit" />
            </Form>
          </Content>
          <Footer>Footer</Footer>
        </Container>
      )}
    </>
  );
}
