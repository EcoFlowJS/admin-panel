import { ApiResponse } from "@eco-flow/types";
import axios from "../../utils/axios/axios";
import { AxiosError } from "axios";

const fetchUserLists = async (
  includeDefault: boolean = false
): Promise<ApiResponse> => {
  const res = await axios.get(
    `admin/users/usernames${includeDefault ? "/system" : ""}`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  if (res instanceof AxiosError) throw res.response?.data as ApiResponse;
  else return res.data as ApiResponse;
};

export default fetchUserLists;
