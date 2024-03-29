import { Environment } from "@ecoflow/types";
import axios from "../../utils/axios/axios";

const getAllSystemEnvsServices = async (): Promise<Environment[]> => {
  return (await axios.get("/admin/environment/systemEnvs")).data;
};

export default getAllSystemEnvsServices;
