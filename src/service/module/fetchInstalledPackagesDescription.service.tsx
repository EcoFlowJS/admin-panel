import { AxiosError } from "axios";
import axios from "../../utils/axios/axios";
import { ApiResponse } from "@ecoflow/types";

const fetchInstalledPackagesDescription = async (name: string) => {
  const res = await axios.get(`module/installedPackages/id/${name}`, {
    headers: { "Content-Type": "application/json" },
  });

  if (res instanceof AxiosError) throw res.response?.data as ApiResponse;
  else return res.data as ApiResponse;
};

export default fetchInstalledPackagesDescription;
