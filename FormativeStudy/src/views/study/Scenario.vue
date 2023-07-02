<script setup>
import { toRefs, watch } from 'vue';
import axios from 'axios';
import { useAsyncState } from '@vueuse/core';

const props = defineProps(['actualTask']);
const scenario = toRefs(props, 'actualTask');
//TODO add to log
//console.log("scenario as a prop", scenario)

const { state, isReady }= useAsyncState(async () => {
    const url = "/tasks/" + scenario.actualTask.value;
    console.log("Getting scenario for tasks", url)
    const data = await axios.get("" + url).then(t => t.data)
    console.log("retrieved scenario: ", data)
    return data
})

</script>
<template>
    <article v-if="isReady">
        <h4 class="text-center pb-3">Scenario</h4>
        <div class="h5">
        <p>Patient: </p><p><b>{{ state.gender }}</b></p><p><b>{{ state.age }} years old</b></p></div>
        
    </article>
</template>