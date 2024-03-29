import { ApiResponse, Environment } from "@ecoflow/types";
import axios from "../../utils/axios/axios";

interface EnvsLists extends Environment {
  id: number;
  status?: "EDIT" | null;
}

const commitEnvs = async (
  type: "system" | "user",
  envList: EnvsLists[]
): Promise<ApiResponse> => {
  const finalEnvs = envList.map((env) => {
    return { name: env.name, value: env.value } as Environment;
  });

  const res = (await axios.post("/admin/environment/envs", { type, finalEnvs }))
    .data;

  console.log(res);

  return res;
};

export default commitEnvs;
