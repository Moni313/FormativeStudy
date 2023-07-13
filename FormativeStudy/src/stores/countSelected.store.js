import { defineStore } from "pinia";
import { ref } from "vue";

export const countSelected = defineStore("count", () => {
  const id = "countSelectedVariables";
  const count = ref(0);

  //todo initialiase counting selected from databse
  function add(){
    this.count++
    console.log("actual count", this.count)
  }
  return {
    id, count, add
  }
});
