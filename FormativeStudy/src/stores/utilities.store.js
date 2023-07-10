import { defineStore } from "pinia";
import axios from "axios";

export const utilitiesStore = defineStore("utilities", () => {
  
  async function postData(api, data) {
    console.log("utilities, posting", api, data);
    try {
      const response = await axios
        .post(api, data)
        .then(console.log("posting data", data,  data.status))
        console.log("response in postData", response)
        return response.status
    } catch (error) {
      console.log(error);
      return error.status
    }
  }

  async function getNextLogId(api) {
    console.log("Getting new index for ", api)
    try {
      const a = api + "?_sort=id&_order=desc";
      const response = await axios.get(a).catch((error)=> console.log(error.toJSON()));
      const logs = response.data;
      console.log(api, ": ", logs);
      if (logs.length > 0) {
        const lastLog = logs[0];
        const lastLogId = lastLog.id;
        console.log(api, " id: ", lastLogId); // Last ID of the users
        return lastLogId + 1;
      }
    } catch (error) {
      console.error("GetNextLogId ERROR: ", error);
    }
    return 0;
  }

  return {
    postData,
    getNextLogId,
  };
});
