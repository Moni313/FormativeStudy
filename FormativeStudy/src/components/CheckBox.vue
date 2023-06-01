<script setup>
const props = defineProps({
  'options': {
    required: true,
    type: Object,
  },
  'itemid': {
    required: true
  },
  'name': {
    required: true
  }
});

</script>


<template>
  <div>
  <label :for="options.id"> 
    <input type="checkbox" :value="props.options.itemid" :id="props.options.id" @change="$parent.$emit('input', $event.target.value)"
      name="radio-input" /> <span v-if="props.options?.itemid" class="sm">{{ props.options.itemid }}</span> {{ props.options.label }}
  </label>
  <br />
</div>
</template>
  
<style scoped>
label {
  cursor: pointer;
}
</style>