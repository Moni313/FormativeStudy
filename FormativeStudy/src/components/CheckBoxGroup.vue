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
  'showCheckBoxNumber': {
    required: false,
    default:10
  },
  'allSelection': {
    required: false
  }
});
defineEmits(['input']);

let selected = props.selected;

</script>


<template>
  <div v-for="(option, index) in props.options.options">
    <CheckBox  v-if="index < props.showCheckBoxNumber" :options="option" :key="`${props.options.id}${option.id}`"
      v-model=props.selected :allSelection="props.allSelection"/>
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