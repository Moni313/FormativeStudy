<script setup>
import { number } from 'yup';
import CheckBox from './CheckBox.vue';

const props = defineProps({
  'options': {
    required: true,
    type: Object,
  },
  'selected': {
    required: false,
    default: null
  },
});
defineEmits(['input']);

let selected = props.selected;

</script>


<template>
  <div>
    <CheckBox v-for="option in props.options.options" :options="option" :key="`${props.options.id}${option.id}`"
      v-model=props.selected />
  </div>
</template>
  
  
<style scoped>

.input-group {
  display: flex;
  flex-direction: column;
}

label {
  cursor: pointer;
}
</style>