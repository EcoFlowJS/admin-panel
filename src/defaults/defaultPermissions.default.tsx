import { UserPermissions } from "@eco-flow/types";

const defaultPermissions: UserPermissions = {
  createUser: false,
  deleteUser: false,
  updateUser: false,
  showUser: false,
  createRole: false,
  deleteRole: false,
  updateRole: false,
  serverConfigurationShow: false,
  serverConfigurationUpdate: false,
  stopServer: false,
  restartServer: false,
  createEnvs: false,
  deleteEnvs: false,
  updateEnvs: false,
  schemaEditor: false,
  flowEditor: false,
  auditLogs: false,
  administrator: false,
};

export default defaultPermissions;
