import { configOptions } from "@eco-flow/types";
import React from "react";
import { defaultServerConfigsOptions } from "../../pages/ServerConfigurations/serverConfigList";
import {
  FormGroup,
  InputEnv,
  InputPasswordEnv,
} from "@eco-flow/components-lib";
import { Input, InputNumber, SelectPicker, Toggle } from "rsuite";
import DB_DriverList from "./DB_DriverList";

interface SystemDatabaseConfigurationTabProps {
  defaultServerConfigs?: configOptions;
  value: typeof defaultServerConfigsOptions;
  setValue: React.Dispatch<
    React.SetStateAction<typeof defaultServerConfigsOptions>
  >;
  connectionStringEnvs?: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ];
  usernameEnvs?: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  passwordEnvs?: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  databaseEnvs?: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export default function SystemDatabaseConfigurationTab({
  defaultServerConfigs,
  value,
  setValue,
  connectionStringEnvs,
  usernameEnvs,
  passwordEnvs,
  databaseEnvs,
}: SystemDatabaseConfigurationTabProps) {
  const [isEnvMongoConnectionStringChecked, setEnvMongoConnectionString] =
    connectionStringEnvs
      ? connectionStringEnvs
      : [false, (_value: boolean) => {}];

  const [isEnvUsernameChecked, setEnvUsername] = usernameEnvs
    ? usernameEnvs
    : [false, (_value: boolean) => {}];

  const [isEnvPasswordChecked, setEnvPassword] = passwordEnvs
    ? passwordEnvs
    : [false, (_value: boolean) => {}];

  const [isEnvDatabaseChecked, setEnvDatabase] = databaseEnvs
    ? databaseEnvs
    : [false, (_value: boolean) => {}];

  return (
    <>
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
          </>
        ) : value.databaseDriver === "Sqlite" ? (
          <>
            <FormGroup
              name="databaseConfigurationFilename"
              label="Sqlite File "
              accepter={Input}
              autoComplete="off"
              placeholder="Sqlite File"
              helperTextStyle={{ marginLeft: 242 }}
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
    </>
  );
}
