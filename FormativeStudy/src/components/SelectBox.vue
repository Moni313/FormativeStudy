<script setup>
const props = defineProps(['id', 'options']);
defineEmits(['input']);
let selected = "";
</script>

<template>
    <select class="form-select" size="3" aria-label="size 3 select example" v-model="selected"
        v-on:change="$parent.$emit('input', $event.target.value)">
        <option value=""></option>
        <option v-for="opt in options" :value="opt" :id="(options.indexOf(opt) + 1)">{{ opt }}</option>
    </select>
</template>