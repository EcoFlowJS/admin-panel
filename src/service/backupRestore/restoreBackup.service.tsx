import { ApiResponse } from "@ecoflow/types";
import axios from "../../utils/axios/axios";
import { AxiosError } from "axios";

const restoreBackup = async (file: FileList): Promise<ApiResponse> => {
  const formData = new FormData();
  formData.append("restoreFile", file[0]);
  const res = await axios.post(`backupRestore/restore`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  if (res instanceof AxiosError) throw res.response?.data as ApiResponse;
  else return res.data as ApiResponse;
};

export default restoreBackup;
