import { defineStore } from "pinia";
import axios from "axios";

export const utilitiesStore = defineStore("utilities", () => {
  async function postData(api, data) {
    const ind = await getNextLogId(api);
    console.log("Value of the new index", ind);
    data.id = ind

    console.log("utilities, postData()", api, data);
    try {
      console.log("AXIOS in study store Utilities postData", api);
      await axios.post(api, data);
    } catch (error) {
      if (error.response) {
        // The request was made, but the server responded with a status code outside the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made, but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.log("Error", error.message);
      }
      console.log(error.config);
      return error.status;
    }
  }

  async function getNextLogId(api) {
    console.log("Getting new index for ", api);
    try {
      const a = api + "?_sort=id&_order=desc";
      console.log("AXIOS in study store utilities getNextLogId");
      const logs = await axios.get(a).data;
      if (logs == undefined) {
        console.log("No entries in logger so return 0")
        return 0;
      }
      console.log("Logs", logs);
      if (logs.length > 0) {
        //we ordered desc so logs[0] is the last index
        const lastLog = logs[0];
        const lastLogId = lastLog.id;
        console.log(api, " id: ", lastLogId); // Last ID of the users
        return lastLogId + 1;
      }
    } catch (error) {
      if (error.response) {
        // The request was made, but the server responded with a status code outside the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made, but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
    return 0;
  }

  async function getData(api) {
    const data = await axios
      .get(api)
      .then((t) => t.data)
      .catch((error) => {
        if (error.response) {
          // The request was made, but the server responded with a status code outside the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made, but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
    console.log("Getting data: ", data)
    return data
  }

  return {
    postData,
    getData,
  };
});
