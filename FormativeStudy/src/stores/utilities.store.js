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
        console.log('Error', error.message);
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
      console.error("GetNextLogId ERROR: ");
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
        console.log('Error', error.message);
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
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
    return data;
  }

  return {
    postData,
    getNextLogId,
    getData,
  };
});
