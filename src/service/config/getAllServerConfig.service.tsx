import { ConnectionResponse } from "@eco-flow/types";
import axios from "../../utils/axios/axios";

const getAllServerConfigService = async (): Promise<ConnectionResponse> => {
  try {
    const res: ConnectionResponse = (await axios.get("admin/config")).data;
    if (res.error)
      return {
        error: true,
        payload: res.payload,
      };

    return {
      success: true,
      payload: res.payload,
    };
  } catch (err) {
    return {
      error: true,
      payload: err,
    };
  }
};

export default getAllServerConfigService;
