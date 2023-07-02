<script setup>
import {computed} from 'vue'
const props = defineProps(['tf'])
const emit = defineEmits(['timeframe']);

const checkLast = computed(() => {
    if (props.tf == 12) return true //TODO make 12 as a variable
    else return false
})
</script>

<template>
    <h4 class="align-items-center text-center">Time Slot<br />
        <!-- <button v-if="props.tf == 12" class="btn btn-dark text-center mt-3" disabled><b class="h5"><i class="bi bi-chevron-double-right"></i></b></button> -->
        <button class="btn btn-success text-center mt-3" :disabled="checkLast" v-on:click="$parent.$emit('timeframe')"><b class="h4"><i class="bi bi-chevron-double-right"></i></b></button>
    </h4>
</template>