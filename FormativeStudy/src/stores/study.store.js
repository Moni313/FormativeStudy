import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { useAsyncState } from "@vueuse/core";

export const useCategoryStore = defineStore("category", () => {
  const id = "selectedCategory";
  const category = ref();
  const options = ref();
  const showOptions = false;
  const showCheckBoxNumber = 30;
  const orderSelection = ref();
  function setCategory(category) {
    console.log("getting category from database: ", category);
    this.category = category;
    this.showOptions = true;
    this.options = useAsyncState(async () => {
      let url = "/" + category.options;
      const data = await axios.get("" + url).then((t) => t.data);
      console.log("Category in VariableSelection: ", data);
      return data;
    });
    this.showCategory = true;
  }
  function getOptions(category) {
    this.options = useAsyncState(async () => {
      let url = "/" + category.options;
      const data = await axios.get("" + url).then((t) => t.data);
      console.log("Category getOptions: ", data);
      return data;
    });
    return this.options;
  }
  function closeArea() {
    this.category = null;
  }
  function setLimit(limit) {
    this.showCheckBoxNumber = limit;
  }
  function getNexOrder() {}
  function updateOption(updatingId, url) {
    console.log("checking id type", typeof(updatingId))
    this.options.state.filter((obj) => {
      if (obj.id == updatingId) {
        console.log("obj in store", updatingId, obj);
        const response = useAsyncState(async () => {
          const actualUrl = "/" + url + "/" + obj.id;
          if (obj.checked) obj.checked = false;
          else obj.checked = true;
          return await axios.patch("" + actualUrl, obj);
        });
        if (response.isReady) {
            console.log("updated", updatingId, obj);
          this.options = useAsyncState(async() => {
            const data = axios.get("" + url).then((t) => t.data);
            console.log("get options updated");
            return data
          })
        }
      }
    });
  }
  function remove(id, obj, url) {
    const response = useAsyncState(async () => {
      const actualUrl = "/" + url + "/" + id;
      obj.checked = false;
      //rewrite all the obj
      return await axios.patch("" + actualUrl, obj);
    });
    if (response.isReady) {
      console.log("this update is from outside the object")
    }
  }

  return {
    id,
    category,
    options,
    showOptions,
    orderSelection,
    getNexOrder,
    getOptions,
    updateOption,
    showCheckBoxNumber,
    setCategory,
    closeArea,
    setLimit,
    remove
  };
});
