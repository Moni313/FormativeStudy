import { defineStore } from "pinia";
import { ref } from "vue";

export const useVariableStore = defineStore("variable", () => {
  const id = "selectedVariable";
  const variable = ref({
    id: null,
    label: null,
    checked: null,
    orderChecked: null,
    fluid: null,
    category: null,
  });
  const compareWith = ref({
    id: null,
    label: null,
    checked: null,
    orderChecked: null,
    fluid: null,
    category: null,
  });
  function setVariable(variable) {
    console.log("variable.store.js -> actual variable shown in the graphic area: ", variable);
    this.variable = variable;
    //here API to retrieve variable of the patient
  }
  function setCompareVar(variable) {
    console.log(
      "variable.store.js -> compare variable ",
      this.variable.label,
      "with ",
      variable.label
    );
    this.compareWith = variable;
  }
  function resetActual() {
    this.variable = {
      id: null,
      label: null,
      checked: null,
      orderChecked: null,
      fluid: null,
      category: null,
    };
  }
  function resetCompare() {
    this.compareWith = {
      id: null,
      label: null,
      checked: null,
      orderChecked: null,
      fluid: null,
      category: null,
    };
  }

  return {
    id,
    variable,
    compareWith,
    setVariable,
    setCompareVar,
    resetActual,
    resetCompare
  };
});
