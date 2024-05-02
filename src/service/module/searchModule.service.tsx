import { ApiResponse } from "@ecoflow/types";
import axios from "../../utils/axios/axios";
import { AxiosError } from "axios";

const searchModule = async (packageName: string): Promise<ApiResponse> => {
  const res = await axios.get(`module/searchPackages/${packageName}`, {
    headers: { "Content-Type": "application/json" },
  });

  if (res instanceof AxiosError) throw res.response?.data as ApiResponse;
  else return res.data as ApiResponse;
};

export default searchModule;
