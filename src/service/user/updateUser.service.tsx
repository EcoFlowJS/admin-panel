import { ApiResponse, UserInfo } from "@ecoflow/types";
import axios from "../../utils/axios/axios";
import { AxiosError } from "axios";

const updateUser = async (
  userId: string,
  userInfo: UserInfo
): Promise<ApiResponse> => {
  const res = await axios.patch(`admin/users/${userId}`, userInfo, {
    headers: { "Content-Type": "application/json" },
  });

  if (res instanceof AxiosError) throw res.response?.data as ApiResponse;
  else return res.data as ApiResponse;
};

export default updateUser;
