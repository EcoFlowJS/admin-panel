import axios from "../../utils/axios/axios";
import { AxiosError } from "axios";
import { DataItemValue } from "rsuite/esm/@types/common";

const generateBackupFile = async (backup: DataItemValue[]): Promise<Blob> => {
  const res = await axios.post(
    `backupRestore/backup`,
    { backup },
    {
      headers: { "Content-Type": "application/json" },
      responseType: "blob",
    }
  );

  if (res instanceof AxiosError) throw res.response?.data;
  else return res.data;
};

export default generateBackupFile;
