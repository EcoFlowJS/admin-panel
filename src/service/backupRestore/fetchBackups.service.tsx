import { ApiResponse } from "@ecoflow/types";
import axios from "../../utils/axios/axios";
import { AxiosError } from "axios";

const fetchBackups = async (): Promise<ApiResponse> => {
  const res = await axios.get(`backupRestore/backup`, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  if (res instanceof AxiosError) throw res.response?.data as ApiResponse;
  else return res.data as ApiResponse;
};

export default fetchBackups;
