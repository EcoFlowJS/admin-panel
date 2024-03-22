import { Role, UserPermissions } from "@eco-flow/types";
import { Socket } from "socket.io-client";

const handlers = (IO: Socket) => {
  return {
    onRoleUpdate: (callback: (role: UserPermissions) => void) => {
      IO.on("roleUpdateResponse", callback);
      return handlers(IO);
    },
    onUserRoleListUpdate: (callback: (rolesID: Array<any>) => void) => {
      IO.on("userRoleListUpdateResponse", callback);
      return handlers(IO);
    },
  };
};

const baseSocketIOHndlers = (IO: Socket, UserID: string) => {
  IO.on("roleUpdated", () => {
    IO.emit("fetchRole", { roomID: ["roles"], UserID: UserID });
  });
  IO.on("userUpdated", () => {
    IO.emit("fetchRole", { roomID: ["users"], UserID: UserID });
    IO.emit("fetchUserRoleListUpdate", { roomID: ["users"], UserID: UserID });
  });
  return handlers(IO);
};

export default baseSocketIOHndlers;
