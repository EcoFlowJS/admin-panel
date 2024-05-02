import { ReactNode } from "react";

export interface PermissionList {
  name: string;
  permissions: PermissionsInformation[];
}

export interface PermissionsInformation {
  name: string;
  label: string;
  hint?: string | ReactNode;
}

const permissionList: PermissionList[] = [
  {
    name: "User Management",
    permissions: [
      {
        name: "createUser",
        label: "Create Users",
        hint: "Create users only",
      },
      {
        name: "deleteUser",
        label: "Delete Users",
        hint: "Delete users only",
      },
      {
        name: "updateUser",
        label: "Update Users",
        hint: "Update users only",
      },
      {
        name: "showUser",
        label: "show users",
        hint: "Show users only",
      },
    ],
  },
  {
    name: "Role Management",
    permissions: [
      {
        name: "createRole",
        label: "Create Role",
        hint: "Create role only",
      },
      {
        name: "deleteRole",
        label: "Delete Role",
        hint: "Delete role only",
      },
      {
        name: "updateRole",
        label: "Update role",
        hint: "Update role only",
      },
    ],
  },
  {
    name: "Server Management",
    permissions: [
      {
        name: "serverConfigurationShow",
        label: "Server configuration show",
        hint: "Server configuration show only",
      },
      {
        name: "serverConfigurationUpdate",
        label: "Server configuration update",
        hint: "Server configuration update only",
      },
      {
        name: "stopServer",
        label: "Stop Server",
        hint: "Stop server only",
      },
      {
        name: "restartServer",
        label: "Restart Server",
        hint: "Restart server only",
      },
    ],
  },
  {
    name: "Environment Management",
    permissions: [
      {
        name: "createEnvs",
        label: "Create Envs",
        hint: "Create envs",
      },
      {
        name: "deleteEnvs",
        label: "Delete Envs",
        hint: "Delete",
      },
      {
        name: "updateEnvs",
        label: "Update Envs",
        hint: "Update",
      },
    ],
  },
  {
    name: "Backup and Restore",
    permissions: [
      {
        name: "backup",
        label: "Backup Configurtions",
        hint: "Backup Configurtions",
      },
      {
        name: "restore",
        label: "Restore Configurtions",
        hint: "Restore Configurtions",
      },
    ],
  },
  {
    name: "Editor Management",
    permissions: [
      {
        name: "schemaEditor",
        label: "Schema Editor",
        hint: "schemna editor",
      },
      {
        name: "flowEditor",
        label: "Flow Editor",
        hint: "Flow Editor",
      },
    ],
  },
  {
    name: "Schema Editor",
    permissions: [
      {
        name: "createDBConnection",
        label: "Create DBConnection",
        hint: "Create DBConnection only",
      },
      {
        name: "modifyDBConnection",
        label: "Modify DBConnection",
        hint: "Modify DBConnection",
      },
      {
        name: "removeDBConnection",
        label: "Remove DBConnection",
        hint: "Remove DBConnection",
      },
      {
        name: "createCollectionTable",
        label: "Create Collection Table",
        hint: "Create Collection Table",
      },
      {
        name: "modifyCollectionTable",
        label: "Modify Collection Table",
        hint: "Modify Collection Table",
      },
      {
        name: "removeCollectionTable",
        label: "Remove Collection Table",
        hint: "Remove Collection Table",
      },
      {
        name: "modifyDBStructure",
        label: "Modify DB Structure",
        hint: "Modify DB Structure",
      },
      {
        name: "displayDBRecord",
        label: "Display DB Record",
        hint: "Display DB Record",
      },
      {
        name: "insertDBRecord",
        label: "Insert DB Record",
        hint: "Insert DB Record",
      },
      {
        name: "modifyDBRecord",
        label: "Modify DB Record",
        hint: "Modify DB Record",
      },
      {
        name: "removeDBRecord",
        label: "Remove DB Record",
        hint: "Remove DB Record",
      },
    ],
  },
  {
    name: "Advanced Permissions",
    permissions: [
      {
        name: "auditLogs",
        label: "Audit Logs",
        hint: "Audit Logs",
      },
      {
        name: "administrator",
        label: "Administrator",
        hint: (
          <>
            Members with this permission will have every permission and will
            also bypass all permissions or restrictions (for example, these
            members would get access to all modification permissions).{" "}
            <strong>This is a dangerous permission to grant</strong>.
          </>
        ),
      },
    ],
  },
];

export default permissionList;
