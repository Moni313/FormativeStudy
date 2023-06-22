<script setup>
const props = defineProps({
  'option': {
    required: true,
    type: Object,
  },
  'selected':{
    required: false
  }
});

</script>


<template>
  <div>
  <label :for="option.id">
    <input type="radio" :value="props.option.label" :id="props.option.id" @change="$parent.$emit('input', $event.target.value)" :checked="props.option == props.selected? true: false"
      name="radio-input" /> {{ props.option.label }}
  </label>
  <br />
</div>
</template>
  
<style scoped>
label {
  cursor: pointer;
}
</style>