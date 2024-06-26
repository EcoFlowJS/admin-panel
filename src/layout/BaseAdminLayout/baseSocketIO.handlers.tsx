import { UserPermissions } from "@ecoflow/types";
import { Socket } from "socket.io-client";

const handlers = (IO: Socket) => {
  return {
    onRoleUpdate: (
      callback: (result: {
        isActiveUser: boolean;
        roles: UserPermissions;
      }) => void
    ) => {
      IO.on("roleUpdateResponse", callback);
      return handlers(IO);
    },
    onUserRoleListUpdate: (
      callback: (result: { isActiveUser: boolean; roles: Array<any> }) => void
    ) => {
      IO.on("userRoleListUpdateResponse", callback);
      return handlers(IO);
    },
  };
};

const baseSocketIOHndlers = (IO: Socket, UserID: string) => {
  IO.on("roleUpdated", () => {
    IO.emit("fetchRole", { roomID: UserID });
  });

  IO.on("userUpdated", () => {
    IO.emit("fetchRole", { roomID: UserID });
    IO.emit("fetchUserRoleListUpdate", { roomID: UserID });
  });

  return handlers(IO);
};

export default baseSocketIOHndlers;
