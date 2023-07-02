<script setup>
const props = defineProps({
  'option': {
    required: true,
    type: Object,
  },
  'selected':{
    required: false
  },
  'name':{
    required: true
  }
});

defineEmits(['input'])
</script>


<template>
  <div>
  <label :for="props.option.label">
    <input type="radio" :value="props.option.label" :id="props.option.label" @change="$parent.$emit('input', $event.target.value)" 
      :name="props.name" /> {{ props.option.label }}
  </label>
  <br />
</div>
</template>
  
<style scoped>
label {
  cursor: pointer;
}
</style>