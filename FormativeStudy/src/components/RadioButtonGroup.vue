<script setup>
import RadioButton from "./RadioButton.vue";
const props = defineProps({
  'options': {
    required: true,
    type: Object,
  },
  'selected': {
    required: false,
    default: null
  },
  'name' : {
    required: true,
    type: String
  }
});

defineEmits(['input']);

let selected = props.selected;

</script>


<template>
  <div class="input-group">
    <RadioButton v-for="option in props.options.options" :option="option" :key="option.label" :name="props.name"
      v-model=props.selected :selected="selected"/>
  </div>
</template>
  
  
<style scoped>
/* .input-group {
    width: 100%;
    margin: 30px auto;
    padding: 15px 20px;
    border: 1px solid black;
    border-radius: 8px;
  
    display: flex;
    justify-content: space-between;
  } */

.input-group {
  display: flex;
  flex-direction: column;
}

label {
  cursor: pointer;
}
</style>