import { ApiResponse } from "@ecoflow/types";
import axios from "../../utils/axios/axios";
import { AxiosError } from "axios";

const fetchBackupInfos = async (): Promise<ApiResponse> => {
  const res = await axios.get(`backupRestore?packageInfo=1&databaseNames=1`, {
    headers: { "Content-Type": "application/json" },
  });

  if (res instanceof AxiosError) throw res.response?.data as ApiResponse;
  else return res.data as ApiResponse;
};

export default fetchBackupInfos;
