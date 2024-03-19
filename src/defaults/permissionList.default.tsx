const permissionList = [
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
    name: "Editor Management",
    permissions: [
      {
        name: "adminEditor",
        label: "Admin Editor",
        hint: "Admin Editor only",
      },
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
    name: "Advanced Permissions",
    permissions: [
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
