<script setup>
const props = defineProps(["id", "min", "max"]);
defineEmits(['input']);
let yearExperience = 0;
</script>

<template>
    <input type="number" :ref="props.id" v-model="yearExperience" v-on:input="$emit('input', $event.target.value)" :min="props.min" :max="props.max"/>
</template>