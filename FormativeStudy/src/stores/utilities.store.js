import { defineStore } from "pinia";
import axios from "axios";

export const utilitiesStore = defineStore("utilities", () => {
  async function postData(api, data) {
    console.log("utilities, postData()", api, data);
    try {
      console.log("AXIOS in study store Utilities postData");
      const response = await axios.post(api, data);
      //console.log("response in postData", response);
      return response.status;
    } catch (error) {
      console.log("ERROR on postData: ", error.toJSON());
      return error.status;
    }
  }

  async function getNextLogId(api) {
    console.log("Getting new index for ", api);
    try {
      const a = api + "?_sort=id&_order=desc";
      console.log("AXIOS in study store utilities getNextLogId");
      const response = await axios.get(a);

      const logs = response.data;
      //console.log(api, ": ", logs);
      if (logs.length > 0) {
        const lastLog = logs[0];
        const lastLogId = lastLog.id;
        console.log(api, " id: ", lastLogId); // Last ID of the users
        return lastLogId + 1;
      }
    } catch (error) {
      console.error("GetNextLogId ERROR: ", error.toJSON());
    }
    return 0;
  }
  async function getData(api){
    const data = await axios.get(api).then(t => t.data)
    return data;
  }

  return {
    postData,
    getNextLogId,
    getData
  };
});
