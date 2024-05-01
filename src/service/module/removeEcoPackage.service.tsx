import { ApiResponse } from "@ecoflow/types";
import axios from "../../utils/axios/axios";
import { AxiosError } from "axios";

const removeEcoPackage = async (packageName: string): Promise<ApiResponse> => {
  const res = await axios.delete(`module/installPackages/${packageName}`, {
    headers: { "Content-Type": "application/json" },
  });

  if (res instanceof AxiosError) throw res.response?.data as ApiResponse;
  else return res.data as ApiResponse;
};

export default removeEcoPackage;
