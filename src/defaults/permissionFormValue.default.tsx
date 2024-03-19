import { UserPermissions } from "@eco-flow/types";
import permissionList from "./permissionList.default";

const permissionFormValueDefault: UserPermissions = (() => {
  const result = Object.create({});
  permissionList.map((permission) => {
    permission.permissions.map((permission) => {
      result[permission.name] = false;
    });
  });
  return result;
})();

export default permissionFormValueDefault;
