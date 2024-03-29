import { ApiResponse } from "@ecoflow/types";
import { AxiosError } from "axios";
import axios from "../../utils/axios/axios";

const fetchUserDetails = async (username: string): Promise<ApiResponse> => {
  const res = await axios.get(`admin/users/${username}`, {
    headers: { "Content-Type": "application/json" },
  });

  if (res instanceof AxiosError) throw res.response?.data as ApiResponse;
  else return res.data as ApiResponse;
};

export default fetchUserDetails;
