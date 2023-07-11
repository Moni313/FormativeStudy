import { defineStore } from "pinia";
import { ref, reactive } from "vue";
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

  //global
  const allSelected = ref(getAllSelected());
  // const selected = reactive([]);

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
    this.options = null;
    this.countSelected = 0; //TODO comment if you want to keep a global sequence of selected for all the tasks
  }
  function setLimit(limit) {
    this.showCheckBoxNumber = limit;
  }

  //selected contains all the option selected, calling this function can add or remove the passed obj from the array
  // function selectedUpdate(obj) {
  //   const p = this.selected.filter((o) => {
  //     return o.id == obj.id;
  //   });
  //   console.log(p, "selected list")
  //   if (p.lenght == 0) {
  //     this.selected.push(obj);
  //   } else
  //     this.selected = this.selected.filter((o) => {
  //       o.id != obj.id;
  //     });

  //   console.log("selectedUpdate: ", this.selected);
  // }

  function updateOption(updatingId, url) {
    this.options.state.filter((obj) => {
      if (obj.id == updatingId) {
        // this.selectedUpdate(obj);
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
          console.log("updating all selected...");
          this.allSelected = getAllSelected();
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

  //global
  function getAllSelected() {
    //TODO hard coded but with API should be easier to get all the variables selected
    let selected = [];
    let opts = useAsyncState(async () => {
      const data = await axios
        .get("/optionsVitalsCategory")
        .then((t) => t.data)
        .then((t) => {
          t.forEach((element) => {
            if (element.checked) {
              selected.push(element);
              console.log("Adding element: ", element);
            }
          });
        });
      return data;
    });

    console.log("1", opts);

    opts = useAsyncState(async () => {
      const data = await axios
        .get("/optionsMedicationsCategory")
        .then((t) => t.data)
        .then((t) => {
          t.forEach((element) => {
            if (element.checked) {
              selected.push(element);
              console.log("Adding element: ", element);
            }
          });
        });
      return data;
    });
    console.log("2", opts);
    opts = useAsyncState(async () => {
      const data = await axios
        .get("/optionsLabsCategory")
        .then((t) => t.data)
        .then((t) => {
          t.forEach((element) => {
            if (element.checked) {
              selected.push(element);
              console.log("Adding element: ", element);
            }
          });
        });
      return data;
    });
    console.log("3", opts);
    console.log("selected from study.store", selected);
    return selected;
  }

  //Global
  function resetAllOptions() {
    let opts = useAsyncState(async () => {
      const data = await axios
        .get("/optionsVitalsCategory")
        .then((t) => t.data);

      data.forEach(async (element) => {
        if (element.checked) {
          element.checked = false;
          const actualUrl = "/optionsVitalsCategory/" + element.id;
          await axios.patch(actualUrl, element);
          console.log("resetting element to false: ", element);
        }
      });

      return data;
    });
    opts = useAsyncState(async () => {
      const data = await axios
        .get("/optionsMedicationsCategory")
        .then((t) => t.data);
      data.forEach(async (element) => {
        if (element.checked) {
          element.checked = false;
          const actualUrl = "/optionsMedicationsCategory/" + element.id;
          await axios.patch(actualUrl, element);
          console.log("resetting element to false: ", element);
        }
      });
      return data;
    });
    opts = useAsyncState(async () => {
      const data = await axios.get("/optionsLabsCategory").then((t) => t.data);
      data.forEach(async (element) => {
        if (element.checked) {
          element.checked = false;
          const actualUrl = "/optionsLabsCategory/" + element.id;
          await axios.patch(actualUrl, element);
          console.log("resetting element to false: ", element);
        }
      });
      return data;
    });
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
