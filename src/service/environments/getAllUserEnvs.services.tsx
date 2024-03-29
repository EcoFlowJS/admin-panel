import { Environment } from "@ecoflow/types";
import axios from "../../utils/axios/axios";

const getAllUserEnvsServices = async (): Promise<Environment[]> => {
  return (await axios.get("/admin/environment/userEnvs")).data;
};

export default getAllUserEnvsServices;
