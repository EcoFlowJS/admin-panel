import { ApiResponse } from "@ecoflow/types";
import axios from "../../utils/axios/axios";
import { AxiosError } from "axios";

const createRoleService = async (
  roleName: string,
  roleLike: string
): Promise<ApiResponse> => {
  const res = await axios.post(
    `role`,
    { roleName, roleLike },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  if (res instanceof AxiosError) throw res.response?.data as ApiResponse;
  else return res.data as ApiResponse;
};

export default createRoleService;
