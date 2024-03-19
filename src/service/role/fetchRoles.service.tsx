import { ApiResponse } from "@eco-flow/types";
import { AxiosError } from "axios";
import axios from "../../utils/axios/axios";

const fetchRolesService = async (): Promise<ApiResponse> => {
  const res = await axios.get(`role`, {
    headers: { "Content-Type": "application/json" },
  });

  if (res instanceof AxiosError) throw res.response?.data as ApiResponse;
  else return res.data as ApiResponse;
};

export default fetchRolesService;
