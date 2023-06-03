<script setup>
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


</script>


<template>
  <div v-for="(option, index) in props.options">
    <CheckBox  v-if="index < props.showCheckBoxNumber" :options="option" :key="`${props.options.id}${option.id}`"
      v-model=props.selected :allSelection="allSelection"/>
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