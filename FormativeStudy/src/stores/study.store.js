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

  const arrayApi = [
    "/optionsVitalsCategory",
    "/optionsMedicationsCategory",
    "/optionsLabsCategory",
  ];

  //global
  const allSelected = ref(getAllSelected());
  // const selected = reactive([]);

  function setCategory(category) {
    //console.log("getting category from database: ", category);
    this.category = category;
    this.showOptions = true;
    this.options = useAsyncState(async () => {
      let url = "/" + category.options;
      console.log("AXIOS in study store setCategory");
      const data = await axios.get("" + url).then((t) => t.data);
      //console.log("Category in VariableSelection: ", data);
      return data;
    });
    this.showCategory = true;
  }
  function getOptions(category) {
    this.options = useAsyncState(async () => {
      let url = "/" + category.options;
      console.log("AXIOS in study store getOptions");
      const data = await axios.get("" + url).then((t) => t.data);
      //console.log("Category getOptions: ", data);
      return data;
    });
    return this.options;
  }
  function closeArea() {
    this.category = null;
    this.options = null;
    this.countSelected = 0; //TODO comment if you want to keep a global sequence of selected for all the tasks
  }
  function setLimit(limit) {
    this.showCheckBoxNumber = limit;
  }



  function updateOption(updatingId, url) {
    this.options.state.filter((obj) => {
      if (obj.id == updatingId) {
        // this.selectedUpdate(obj);
        //console.log("obj in store", updatingId, obj);
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
          console.log("updating all selected...");
          this.allSelected = getAllSelected();
          //console.log("updated", updatingId, obj);
          this.options = useAsyncState(async () => {
            console.log("AXIOS in study store updateOptions");
            const data = axios.get("" + url).then((t) => t.data);
            //console.log("get options updated");
            return data;
          });
        }
      }
    });
  }

  //global
  function getAllSelected() {
    //TODO hard coded but with API should be easier to get all the variables selected
    let selected = [];
    arrayApi.forEach((api) => {
      console.log("AXIOS in study store get all selected for ", api);
      const opts = useAsyncState(async () => {
        const data = await axios
          .get(api)
          .then((t) => t.data)
          .then((t) => {
            t.forEach((element) => {
              if (element.checked) {
                selected.push(element);
                console.log("Adding element vitals: ", element);
              }
            });
          });
        return data;
      });
      console.log("--- ", api, opts);
    });
    console.log("selected from study.store", selected);
    return selected;
  }

  //Global
  function resetAllOptions() {
    console.log("rewset all options is called");
    arrayApi.forEach((api) => {
      const opts = useAsyncState( async () => {
        const data = await axios
          .get(api)
          .then((t) => t.data)
          .then((data) => {
            data.forEach(async (element) => {
              if (element.checked) {
                element.checked = false;
                const actualUrl = api + "/" + element.id;
                console.log("AXIOS in study store PATCH", actualUrl);
                await axios.patch("" + actualUrl, element).catch((error) => {
                  console.error(error.toJSON());
                });
              }
            });
          }).catch(error => {console.error(error.toJSON())});
        return data;
      });
      console.log(opts);
    });
    this.allSelected = [];
    console.log("are all option reset to false? ", this.allSelected);
  }

  return {
    id,
    category,
    options,
    showOptions,
    orderSelection,
    showCheckBoxNumber,
    allSelected,
    getOptions,
    updateOption,
    setCategory,
    closeArea,
    setLimit,
    getAllSelected,
    resetAllOptions,
    // selectedUpdate,
    // selected,
  };
});
