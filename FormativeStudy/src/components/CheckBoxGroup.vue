<script setup>
import {ref} from 'vue';
import CheckBox from './CheckBox.vue';

const props = defineProps({
  'options': {
    required: true,
    type: Object,
  }
});
const emit = defineEmits(['optionChecked']);

function update(o, e){
    console.log("updating question", o, e)
    console.log("Does it updates the question?", props.options)
    emit('optionChecked', true)
}

</script>


<template>
  <div v-for="option in props.options">
    <CheckBox :option="option" :checked="option.checked" @optionChecked="e => update(option, e)" />
  </div>
</template>
