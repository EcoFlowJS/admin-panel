import { atom } from "jotai";
import permissionFormValueDefault from "../defaults/permissionFormValue.default";
import { UserPermissions } from "@eco-flow/types";

const userPermissions = atom<UserPermissions>(permissionFormValueDefault);

export { userPermissions };
