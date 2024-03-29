import { ApiResponse } from "@ecoflow/types";
import axios from "../../utils/axios/axios";

const restartServer = ({ Mode } = { Mode: "restart" }): Promise<any> => {
  return new Promise<any>(async (resolve) => {
    axios.post("/server", { Mode }).then(
      (value) => {
        if (typeof value.status === "undefined" || value.status !== 200)
          setTimeout(() => restartServer({ Mode: "status" }), 1000);
        else resolve(value.data);
      },
      (error) => {
        if (error.code !== 504) setTimeout(() => restartServer({ Mode }), 1000);
        else setTimeout(() => restartServer({ Mode: "status" }), 1000);
      }
    );
  });
};

const closeServer = async (): Promise<any> => {
  return (await axios.post("/server", { Mode: "stop" })).data;
};

const restartCloseServer = (mode: "restart" | "stop"): Promise<ApiResponse> => {
  switch (mode) {
    case "restart":
      return restartServer({ Mode: mode });
    case "stop":
      return closeServer();
    default:
      return new Promise<any>((resolve) => resolve(null));
  }
};

export default restartCloseServer;
