import { defineStore } from "pinia";
import axios from "axios";

export const utilitiesStore = defineStore("utilities", () => {

  async function postData(api, data) {
    try {
      const response = await axios.post(api, data);
      // Handle the response data
    } catch (error) {
      // Handle any errors
    }
  }

  async function getNextLogId() {
    try {
      const response = await axios.get("/logger?_sort=id&_order=desc");
      const logs = response.data;
      if (logs.length > 0) {
        const lastLog = logs[0];
        const lastLogId = lastLog.id;
        console.log(lastLogId); // Last ID of the users
        return lastLogId + 1;
      }
    } catch (error) {
      console.error(error);
    }
  }

  return{
    postData,
    getNextLogId
  }
});
