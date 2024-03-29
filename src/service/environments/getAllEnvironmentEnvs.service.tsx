import { Environment } from "@ecoflow/types";
import axios from "../../utils/axios/axios";

const getAllEnvironmentEnvsService = async (): Promise<{
  systemEnvs: Environment[];
  userEnvs: Environment[];
}> => {
  return (await axios.get("/admin/environment/envs")).data;
};

export default getAllEnvironmentEnvsService;
