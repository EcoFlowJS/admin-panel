import { AxiosError } from "axios";
import axios from "../../utils/axios/axios";
import { ApiResponse } from "@ecoflow/types";

const upgradeDowngradePackage = async (
  packageName: string,
  version: string = "latest"
): Promise<ApiResponse> => {
  const res = await axios.patch(
    `module/installPackages`,
    { packageName, version },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  if (res instanceof AxiosError) throw res.response?.data as ApiResponse;
  else return res.data as ApiResponse;
};

export default upgradeDowngradePackage;
