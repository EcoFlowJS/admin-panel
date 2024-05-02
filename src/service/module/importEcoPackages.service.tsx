import { ApiResponse } from "@ecoflow/types";
import axios from "../../utils/axios/axios";
import { AxiosError } from "axios";

const importEcoPackages = async (files: FileList): Promise<ApiResponse> => {
  const formData = new FormData();
  for (var x = 0; x < files.length; x++) formData.append("packages", files[x]);

  const res = await axios.post(`module/installPackages/import`, formData, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });

  if (res instanceof AxiosError) throw res.response?.data as ApiResponse;
  else return res.data as ApiResponse;
};

export default importEcoPackages;
