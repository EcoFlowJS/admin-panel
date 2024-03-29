import { ApiResponse, Permissions } from "@ecoflow/types";
import axios from "../../utils/axios/axios";
import { AxiosError } from "axios";

const updateRoleService = async (
  id: string,
  permissions: Permissions
): Promise<ApiResponse> => {
  const res = await axios.patch(
    `role`,
    {
      id,
      permissions,
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  if (res instanceof AxiosError) throw res.response?.data as ApiResponse;
  else return res.data as ApiResponse;
};

export default updateRoleService;
