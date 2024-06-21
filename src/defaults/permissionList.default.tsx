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
        label: "Create/Assign Users.",
        hint: "Members with this specified permission allowed to create or assign new users.",
      },
      {
        name: "deleteUser",
        label: "Remove/Disable Users.",
        hint: "Members with this specified permission allowed to delete/disable users.",
      },
      {
        name: "updateUser",
        label: "Edit/Modify Users.",
        hint: "Members with this specified permission allowed to Edit/modify user information.",
      },
      {
        name: "showUser",
        label: "Available Users.",
        hint: "Members with this specified permission allowed to view all the available users.",
      },
    ],
  },
  {
    name: "Role Management",
    permissions: [
      {
        name: "createRole",
        label: "Create new role.",
        hint: "Members with this specified permission allowed to create new roles.",
      },
      {
        name: "deleteRole",
        label: "Drop/Remove Role.",
        hint: "Members with this specified permission allowed to delete roles.",
      },
      {
        name: "updateRole",
        label: "Edit/Modify role.",
        hint: "Members with this specified permission allowed to update/modify roles with this specified permission.",
      },
    ],
  },
  {
    name: "Server Management",
    permissions: [
      {
        name: "serverConfigurationShow",
        label: "Preview server configuration.",
        hint: "Members with this specified permission allowed to view the server configurations.",
      },
      {
        name: "serverConfigurationUpdate",
        label: "Edit/Modify server configuration.",
        hint: "Members with this specified permission allowed to update/modify the server configurations",
      },
      {
        name: "stopServer",
        label: "Stop the server.",
        hint: "Members with this specified permission allowed to stop the server.",
      },
      {
        name: "restartServer",
        label: "Restart the server",
        hint: "Members with this specified permission allowed to restart the server.",
      },
    ],
  },
  {
    name: "Environment Management",
    permissions: [
      {
        name: "createEnvs",
        label: "Create/Assign new Environment variables.",
        hint: "Members with this specified permission allowed to create/assign new environment variables to the server.",
      },
      {
        name: "deleteEnvs",
        label: "Drop/Remove Environment variables.",
        hint: "Members with this specified permission allowed to drop/remove already existing environment variables of the server.",
      },
      {
        name: "updateEnvs",
        label: "Edit/Modify Environment variables.",
        hint: "Members with this specified permission allowed to edit/modify environment variables to the server.",
      },
    ],
  },
  {
    name: "Backup and Restore",
    permissions: [
      {
        name: "backup",
        label: "Backup server configurations.",
        hint: "Members with this specified permission allowed to backup the server configurations.",
      },
      {
        name: "restore",
        label: "Restore server configurations.",
        hint: "Members with this specified permission allowed to restore the server configurations.",
      },
    ],
  },
  {
    name: "Editor Management",
    permissions: [
      {
        name: "schemaEditor",
        label: "Access schema editor.",
        hint: (
          <>
            Members with this specified permission allowed to access the{" "}
            <strong>Schema Editor</strong>.
          </>
        ),
      },
      {
        name: "flowEditor",
        label: "Access flow editor.",
        hint: (
          <>
            Members with this specified permission allowed to access the{" "}
            <strong>Flow Editor</strong>.
          </>
        ),
      },
    ],
  },
  {
    name: "Schema Editor",
    permissions: [
      {
        name: "createDBConnection",
        label: "Create/Assign a new database connection.",
        hint: "Members with this specified permission allowed to only to create a database connection.",
      },
      {
        name: "modifyDBConnection",
        label: "Edit/Modify database connection.",
        hint: "Members with this specified permission allowed to edit/modify database connection.",
      },
      {
        name: "removeDBConnection",
        label: "Drop/Remove database connection.",
        hint: "Members with this specified permission allowed to drop/remove database connection.",
      },
      {
        name: "createCollectionTable",
        label: "Create new collection table.",
        hint: "Members with this specified permission allowed to create/assign database a new collection table.",
      },
      {
        name: "modifyCollectionTable",
        label: "Edit/Modify collection table.",
        hint: "Members with this specified permission allowed to edit/modify database collection tables.",
      },
      {
        name: "removeCollectionTable",
        label: "Drop/Remove collection table.",
        hint: "Members with this specified permission allowed to drop/remove database collection tables.",
      },
      {
        name: "modifyDBStructure",
        label: "Edit/Modify database structure.",
        hint: "Members with this specified permission allowed to edit/modify database structure.",
      },
      {
        name: "displayDBRecord",
        label: "Display database records.",
        hint: "Members with this specified permission allowed to preview database records.",
      },
      {
        name: "insertDBRecord",
        label: "Insert database records.",
        hint: "Members with this specified permission allowed to insert database records.",
      },
      {
        name: "modifyDBRecord",
        label: "Edit/Modify database records.",
        hint: "Members with this specified permission allowed to edit/modify database records.",
      },
      {
        name: "removeDBRecord",
        label: "Drop/Remove database records.",
        hint: "Members with this specified permission allowed to drop/remove database records.",
      },
    ],
  },
  {
    name: "Advanced Permissions",
    permissions: [
      {
        name: "auditLogs",
        label: "Audit Logs",
        hint: "Members with this specified permission allowed to preview the audit logs.",
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
