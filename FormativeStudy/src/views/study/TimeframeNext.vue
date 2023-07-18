<script setup>
import {computed} from 'vue'
const props = defineProps(['tf', 'totalTasks'])
const emit = defineEmits(['timeframe']);

const checkLast = computed(() => {
    if (props.tf == props.totalTasks) return true //TODO make 12 as a variable
    else return false
})

function selectNextTimeframe(){
    emit('timeframe')
}
</script>

<template>
    <p class="align-items-center text-center"><span class="h4">Time Slot</span><br />
        <button class="btn btn-success text-center mt-3" :disabled="checkLast" v-on:click="selectNextTimeframe"><b class="h4"><i class="bi bi-chevron-double-right"></i></b></button><br/>
       <b>Do not overuse me!</b>
    </p>
</template>