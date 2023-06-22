<script setup>

const props = defineProps(['tf'])
const emit = defineEmits(['timeframe']);

function nextFrame() {
    console.log(props.tf)
    emit('timeframe')
}
</script>

<template>
    <h4>Timeframe <br />
        <button v-if="props.tf == 12" class="btn btn-dark text-center mt-3" disabled><b class="h4">Next</b></button>
        <button v-else class="btn btn-success text-center mt-3" v-on:click="nextFrame"><b class="h4">Next</b></button>
    </h4>
</template>