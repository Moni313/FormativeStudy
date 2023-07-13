
<script setup>
import {ref, watch} from 'vue';
const props = defineProps(['option', 'checked']);
const emit = defineEmits(['optionChecked']);

const isChecked = ref(props.checked);

watch(isChecked, (newValue) => {
    emit('optionChecked', newValue)
})
function handleChange(){
    isChecked.value = !isChecked.value;
}
</script>


<template>
    <div>
        <label :for="'post_' + props.option.label"><input :id="'post_' + props.option.label" type="checkbox" v-model="props.option.checked"
                @change="handleChange" :name="'post_' + props.option.label" :value="props.option"> {{ props.option.label }}</label>

    </div>
</template>
  