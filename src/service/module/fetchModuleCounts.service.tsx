import { AxiosError } from "axios";
import axios from "../../utils/axios/axios";
import { ApiResponse } from "@ecoflow/types";

const fetchAvailableModuleCounts = async (): Promise<ApiResponse> => {
  const res = await axios.get(`module/searchPackagesCounts`, {
    headers: { "Content-Type": "application/json" },
  });

  if (res instanceof AxiosError) throw res.response?.data as ApiResponse;
  else return res.data as ApiResponse;
};

export default fetchAvailableModuleCounts;
