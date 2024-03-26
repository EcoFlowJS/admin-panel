import { ApiResponse } from "@eco-flow/types";
import axios from "../../utils/axios/axios";
import { AxiosError } from "axios";

const toggleUser = async (
  userId: string,
  isActiveUser: boolean
): Promise<ApiResponse> => {
  const res = await axios.patch(
    `admin/users/${userId}/ToggleUser`,
    { isActiveUser },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  if (res instanceof AxiosError) throw res.response?.data as ApiResponse;
  else return res.data as ApiResponse;
};

export default toggleUser;
