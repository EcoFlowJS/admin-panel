import { atom } from "jotai";
import { UserPermissions } from "@eco-flow/types";
import defaultPermissions from "../defaults/defaultPermissions.default";

const userRolesList = atom<Array<any>>([]);
const userPermissions = atom<UserPermissions>(defaultPermissions);
const permissionFetched = atom(false);

export { userPermissions, userRolesList, permissionFetched };
