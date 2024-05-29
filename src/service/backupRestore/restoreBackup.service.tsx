import { ApiResponse } from "@ecoflow/types";
import axios from "../../utils/axios/axios";
import { AxiosError } from "axios";

const formDataProcessor = (file: FileList): FormData => {
  const formData = new FormData();
  formData.append("restoreFile", file[0]);
  return formData;
};

const restoreBackup = async (file: FileList | string): Promise<ApiResponse> => {
  const formData =
    typeof file === "string" ? { file } : formDataProcessor(file);
  const res = await axios.post(`backupRestore/restore`, formData, {
    headers: {
      "Content-Type":
        typeof file === "string" ? "application/json" : "multipart/form-data",
    },
  });

  if (res instanceof AxiosError) throw res.response?.data as ApiResponse;
  else return res.data as ApiResponse;
};

export default restoreBackup;
