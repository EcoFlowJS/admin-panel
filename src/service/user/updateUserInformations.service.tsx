import { ApiResponse } from "@ecoflow/types";
import { AxiosError } from "axios";
import axios from "../../utils/axios/axios";

const updateUserInformations = async (
  userInfo: { [key: string]: any },
  mode: "info" | "PWD" = "info"
): Promise<ApiResponse> => {
  const res = await axios.patch(
    `users`,
    {
      userInfo,
      mode,
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  if (res instanceof AxiosError) throw res.response?.data as ApiResponse;
  else return res.data as ApiResponse;
};

export default updateUserInformations;
