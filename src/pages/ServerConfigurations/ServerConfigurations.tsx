import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Content,
  Divider,
  FlexboxGrid,
  Header,
} from "rsuite";
import AdminLoading from "../../components/Loading/AdminLoading.component";
import getAllServerConfigService from "../../service/config/getAllServerConfig.service";
import { ApiResponse, configOptions } from "@ecoflow/types";
import ServerConfigParser from "./ServerConfigParser";
import {
  DB_DriverParser,
  defaultServerConfigsOptions,
} from "./serverConfigList";
import isEnv from "../../utils/isEnv/inEnv";
import updateConfigs from "../../service/config/updateConfig";
import { resartModalState } from "../../store/modals.store";
import { useAtom } from "jotai";
import SaveConfigAlertModal from "../../components/ServerConfigurations/SaveConfigAlertModal.componnent";
import ServerConfigurationForm from "../../components/ServerConfigurations/ServerConfigurationForm.component";
import {
  errorNotification,
  successNotification,
} from "../../store/notification.store";
import { useNotification } from "@ecoflow/components-lib";
import { useNavigate } from "react-router-dom";
import { permissionFetched, userPermissions } from "../../store/users.store";

export default function ServerConfigurations() {
  // Importing user Permissions
  const navigate = useNavigate();
  const [permissionsList] = useAtom(userPermissions);
  const [isPermissionFetched] = useAtom(permissionFetched);
  // Loading state
  const [isLoading, setLoading] = useState(true);
  const [isLoadingError, setLoadingError] = useState(false);

  // Component states
  const [defaultServerConfigs, setDefaultServerConfig] =
    useState<configOptions>();
  const [value, setValue] = useState(defaultServerConfigsOptions);
  const [modalOpen, setModalOpen] = useState(false);
  const [_restartModalOpen, setRestartModalOpen] = useAtom(resartModalState);

  //Env Inputs states
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

  // Response state
  const [serverConfigs, setServerConfig] = useState({});
  const [responseLoading, setResponseLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse>({});

  //Notifications state
  const setSuccessNotification = useAtom(successNotification)[1];
  const setErrorNotification = useAtom(errorNotification)[1];

  useEffect(() => {
    (async () => {
      const response = await getAllServerConfigService();
      if (response.success) {
        const { defaultConfig, serverConfig } = response.payload;
        setDefaultServerConfig(defaultConfig);
        const config = ServerConfigParser(serverConfig);
        processEnvs(config);
        updateState(config, serverConfig);
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

  useEffect(() => {
    if (response.error)
      setErrorNotification({
        show: true,
        header: "Configuration Update Error",
        message: response.payload,
      });
    if (response.success) {
      setSuccessNotification({
        show: true,
        header: "Configuration Update Success",
        message: response.payload.msg,
      });
      const config = ServerConfigParser(response.payload.newConfigs);
      processEnvs(config);
      updateState(config, response.payload.newConfigs);
      setResponseLoading(false);
      setRestartModalOpen(true);
    }
  }, [response]);

  const processEnvs = (config: any) => {
    if (typeof config.databaseConfigurationConnectionString !== "undefined") {
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
  };

  const updateState = (config: any, serverConfig: any) => {
    setValue({
      ...value,
      ...config,
      httpCorsExposeHeaders:
        typeof config.httpCorsExposeHeaders !== "undefined"
          ? config.httpCorsExposeHeaders.toString()
          : "",
      httpCorsAllowHeaders:
        typeof config.httpCorsAllowHeaders !== "undefined"
          ? config.httpCorsAllowHeaders.toString()
          : "",
      databaseDriver: DB_DriverParser(config.databaseDriver),
    });
    setServerConfig({
      ...value,
      ...ServerConfigParser(serverConfig),
      httpCorsExposeHeaders:
        typeof config.httpCorsExposeHeaders !== "undefined"
          ? config.httpCorsExposeHeaders.toString()
          : "",
      httpCorsAllowHeaders:
        typeof config.httpCorsAllowHeaders !== "undefined"
          ? config.httpCorsAllowHeaders.toString()
          : "",
      databaseDriver: DB_DriverParser(config.databaseDriver),
    });
  };

  const warningResponse = useNotification({
    header: "Configuration update warning",
    type: "warning",
    children: <>No configuration is changed to be get updated.</>,
  });

  const configProcessHandler = () =>
    (async () => {
      const SendData = { ...value };
      if (isEnvMongoConnectionString)
        SendData.databaseConfigurationConnectionString = `env(${value.databaseConfigurationConnectionString})`;
      if (isEnvUsername)
        SendData.databaseConfigurationUser = `env(${value.databaseConfigurationUser})`;
      if (isEnvPassword)
        SendData.databaseConfigurationPassword = `env(${value.databaseConfigurationPassword})`;
      if (isEnvDatabase)
        SendData.databaseConfigurationDatabase = `env(${value.databaseConfigurationDatabase})`;

      if (JSON.stringify(SendData) === JSON.stringify(serverConfigs)) {
        warningResponse.show();
        return;
      }
      setResponseLoading(true);
      setResponse(await updateConfigs(SendData));
    })();

  useEffect(() => {
    if (
      isPermissionFetched &&
      !permissionsList.administrator &&
      !permissionsList.serverConfigurationShow &&
      !permissionsList.serverConfigurationUpdate
    )
      navigate("/admin/403");
  }, [permissionsList, isPermissionFetched]);

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
                  onClick={() => setModalOpen(true)}
                  loading={responseLoading}
                  disabled={
                    isLoadingError ||
                    (!permissionsList.administrator &&
                      !permissionsList.serverConfigurationUpdate)
                  }
                >
                  Confirm
                </Button>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </Header>
          <Divider />
          <Content>
            <ServerConfigurationForm
              disabled={
                isLoadingError ||
                responseLoading ||
                (!permissionsList.administrator &&
                  !permissionsList.serverConfigurationUpdate)
              }
              layout="horizontal"
              style={{ paddingTop: "2rem" }}
              checkTrigger="none"
              defaultServerConfigs={defaultServerConfigs}
              formValue={[value, setValue]}
              connectionStringEnvs={[
                isEnvMongoConnectionStringChecked,
                setEnvMongoConnectionString,
              ]}
              usernameEnvs={[isEnvUsernameChecked, setEnvUsername]}
              passwordEnvs={[isEnvPasswordChecked, setEnvPassword]}
              databaseEnvs={[isEnvDatabaseChecked, setEnvDatabase]}
            />
          </Content>
        </Container>
      )}

      <SaveConfigAlertModal
        handler={configProcessHandler}
        modalControl={[modalOpen, setModalOpen]}
      />
    </>
  );
}
