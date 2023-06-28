import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { useAsyncState } from "@vueuse/core";

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
    console.log("actual variable shown in the graphic area: ", variable);
    this.variable = variable;
    //here API to retrieve variable of the patient
  }
  function setCompareVar(variable) {
    console.log(
      "compare variable ",
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

  return {
    id,
    variable,
    setVariable,
    setCompareVar,
    resetActual,
    compareWith
  };
});
