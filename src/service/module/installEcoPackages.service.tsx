import { ApiResponse } from "@ecoflow/types";
import axios from "../../utils/axios/axios";
import { AxiosError } from "axios";

const installEcoPackages = async (
  packageName: string,
  version: string
): Promise<ApiResponse> => {
  const res = await axios.post(
    `module/installPackages`,
    { packageName, version },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  if (res instanceof AxiosError) throw res.response?.data as ApiResponse;
  else return res.data as ApiResponse;
};

export default installEcoPackages;
