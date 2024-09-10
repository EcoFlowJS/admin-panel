import { ApiResponse } from "@ecoflow/types";
import axios from "../../utils/axios/axios";

const updateConfigs = async (
  data: any,
  migrate?:
    | true
    | {
        name: string;
        username: string;
        password: string;
        email: string;
      }
): Promise<ApiResponse> =>
  (await axios.put("/admin/config", { ...data, migrate })).data as ApiResponse;

export default updateConfigs;
