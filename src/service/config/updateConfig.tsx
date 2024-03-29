import { ApiResponse } from "@ecoflow/types";
import axios from "../../utils/axios/axios";

const updateConfigs = async (Data: any): Promise<ApiResponse> => {
  return (await axios.put("/admin/config", Data)).data as ApiResponse;
};

export default updateConfigs;
