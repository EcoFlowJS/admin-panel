import { ApiResponse } from "@ecoflow/types";
import axios from "../../utils/axios/axios";

const isBackedEndOnlineService = async (): Promise<ApiResponse> => {
  try {
    return (await axios.get("/server/isOnline")).data as ApiResponse;
  } catch {
    return {
      error: true,
      payload: { isServerOnline: false },
    };
  }
};

const isServerOnline = ([
  setClosedServer,
  setRestartingServer,
  successNotification,
]: [Awaited<any>, any, any | undefined]) => {
  return new Promise<void>((resolve) =>
    isBackedEndOnlineService().then((val) => {
      if (val.success)
        setTimeout(() => {
          setClosedServer(false);
          setRestartingServer(false);
          if (successNotification !== null)
            successNotification({
              success: true,
              payload: "Server successfully restarted and ready to serve again",
            });
          resolve();
        }, 1000);
      if (val.error) {
        setRestartingServer(true);
        setTimeout(
          () =>
            resolve(
              isServerOnline([
                setClosedServer,
                setRestartingServer,
                successNotification,
              ])
            ),
          1000
        );
      }
    })
  );
};

export default isServerOnline;
