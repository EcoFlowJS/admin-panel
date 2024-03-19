import { ApiResponse } from "@eco-flow/types";
import axios from "../../utils/axios/axios";
import { AxiosError } from "axios";

const fetchUserPermissions = async (userID: string): Promise<ApiResponse> => {
  const res = await axios.get(`users/permissions/${userID}`, {
    headers: { "Content-Type": "application/json" },
  });

  if (res instanceof AxiosError) throw res.response?.data as ApiResponse;
  else return res.data as ApiResponse;
};

export default fetchUserPermissions;
