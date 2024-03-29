import { ApiResponse } from "@ecoflow/types";
import axios from "../../utils/axios/axios";
import { AxiosError } from "axios";

const fetchAuditLogs = async (page: number = 1): Promise<ApiResponse> => {
  const res = await axios.get(`auditLogs/${page}`, {
    headers: { "Content-Type": "application/json" },
  });

  if (res instanceof AxiosError) throw res.response?.data as ApiResponse;
  else return res.data as ApiResponse;
};

export default fetchAuditLogs;
