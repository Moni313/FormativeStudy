<script setup>
import { ref } from 'vue';

const props = defineProps(
    {
        'id': {
            required: true,
        },
        'options': {
            required: true,
            default: []
        }
    });

const emit = defineEmits(['input']);

let currentValue = ref('');

function emitSelection(e){
    emit('input', e)
    currentValue = ''
}

</script>

<template>
    <div>
        <input class="form-control " :list="'propsOptions' + props.id" id="'propsOptions'+props.id" name="'propsOptions'" v-model="currentValue"
            placeholder="Type to search..." @input=""  @keydown.enter="emitSelection($event.target.value)" @change="emitSelection($event.target.value)">

        <datalist :id="'propsOptions' + props.id">
            <option id="0" value=""></option>
            <option v-for="opt in props.options" :id=opt :key=opt.itemid><span v-if="opt?.itemid" class="h5">{{ opt.itemid }}</span> {{ opt.label }}</option>
        </datalist>

    </div>
</template>

<!-- 
    options must have id, label
 -->