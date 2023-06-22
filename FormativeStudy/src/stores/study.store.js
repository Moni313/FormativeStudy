import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { useAsyncState } from "@vueuse/core";
import { countSelected } from "./countSelected.store";

export const useCategoryStore = defineStore("category", () => {
  const id = "selectedCategory";
  const category = ref();
  const options = ref();
  const showOptions = false;
  const showCheckBoxNumber = 30;
  const orderSelection = ref();
  const count = countSelected();
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
  function updateOption(updatingId, url) {
    this.options.state.filter((obj) => {
      if (obj.id == updatingId) {
        console.log("obj in store", updatingId, obj);
        const response = useAsyncState(async () => {
          const actualUrl = "/" + url + "/" + obj.id;
          count.add(); //this should keep the order going on
          if (obj.checked) {
            obj.checked = false;
            obj.orderChecked = 0;
            console.log("removing", count.count);
          } else {
            obj.checked = true;
            obj.orderChecked = count.count;
          }
          return await axios.patch("" + actualUrl, obj);
        });
        if (response.isReady) {
          console.log("updated", updatingId, obj);
          this.options = useAsyncState(async () => {
            const data = axios.get("" + url).then((t) => t.data);
            console.log("get options updated");
            return data;
          });
        }
      }
    });
  }

  return {
    id,
    category,
    options,
    showOptions,
    orderSelection,
    showCheckBoxNumber,
    getOptions,
    updateOption,
    setCategory,
    closeArea,
    setLimit,
  };
});


