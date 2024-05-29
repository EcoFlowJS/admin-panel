import { ApiResponse } from "@ecoflow/types";
import axios from "../../utils/axios/axios";
import { AxiosError } from "axios";

const removeBackup = async (backupName: string): Promise<ApiResponse> => {
  const res = await axios.delete(`backupRestore/backup/${backupName}`, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  if (res instanceof AxiosError) throw res.response?.data as ApiResponse;
  else return res.data as ApiResponse;
};

export default removeBackup;
