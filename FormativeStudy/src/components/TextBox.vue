<script setup>
defineProps({ 'id': String });
defineEmits(['input']);
let message = "";
</script>

<template>
    <textarea class="form-control" rows="1" :ref="id" v-model="message" v-on:input="$emit('input', $event.target.value)" ></textarea>
</template>

