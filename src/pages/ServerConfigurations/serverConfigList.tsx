import { DB_Drivers, LogLevel } from "@eco-flow/types";

const defaultServerConfigsOptions = {
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
  loggingEnabled: false,
  loggingLevel: "",
  loggingFormat: "",
  loggingPrettyPrint: false,
  loggingLableEnable: false,
  loggingLableLable: "",
  loggingConsole: false,
  loggingFileEnabled: false,
  loggingFileLocation: "",
  loggingFileFilename: "",
  loggingWebEnabled: false,
  loggingWebHost: "",
  loggingWebPort: 0,
  loggingWebPath: "",
  editorEnabled: false,
  editorAdmin: false,
  editorFlow: false,
  editorSchema: false,
  databaseDriver: "",
  databaseConfigurationConnectionString: "",
  databaseConfigurationFilename: "",
  databaseConfigurationHost: "",
  databaseConfigurationPort: 0,
  databaseConfigurationUser: "",
  databaseConfigurationPassword: "",
  databaseConfigurationDatabase: "",
  databaseConfigurationSsl: false,
};
const logLevel: LogLevel = {
  ERROR: 0,
  WARNING: 1,
  INFO: 2,
  VERBOSE: 4,
  DEBUG: 5,
};

const DB_DriverList = ["MongoDB", "MySQL", "PostgreSQL", "Sqlite"].map(
  (item) => ({
    label: item,
    value: item,
  })
);

const logList = Object.keys(logLevel).map((item) => {
  const value = logLevel as any;
  return {
    label: item,
    value: value[item],
  };
});

const DB_DriverParser = (driver: DB_Drivers): string => {
  switch (driver) {
    case "MONGO":
      return "MongoDB";
    case "SQLite":
      return "Sqlite";
    case "PGSQL":
      return "PostgreSQL";
    case "MYSQL":
      return "MySQL";
    default:
      return "Sqlite";
  }
};

export { defaultServerConfigsOptions, logList, DB_DriverList, DB_DriverParser };
