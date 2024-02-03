import axios from "../../utils/axios/axios";

const updateConfigs = (Data: any): Promise<any> => {
  return new Promise<any>(async (resolve) => {
    axios.put("/admin/config", Data).then(
      (value) => {
        console.log(value);

        if (typeof value.status === "undefined" || value.status !== 200)
          setTimeout(() => updateConfigs(Data), 1000);
        else resolve(value.data);
      },
      () => {
        setTimeout(() => updateConfigs(Data), 1000);
      }
    );
  });
};

export default updateConfigs;
