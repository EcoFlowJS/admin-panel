import { ApiResponse, UserInfo } from "@eco-flow/types";
import axios from "../../utils/axios/axios";
import { AxiosError } from "axios";

const createUser = async (userInfos: UserInfo): Promise<ApiResponse> => {
  const res = await axios.post(`admin/users`, userInfos, {
    headers: { "Content-Type": "application/json" },
  });

  if (res instanceof AxiosError) throw res.response?.data as ApiResponse;
  else return res.data as ApiResponse;
};

export default createUser;
