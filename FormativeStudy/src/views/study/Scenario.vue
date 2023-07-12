<script setup>
import { toRefs, watch } from 'vue';
import axios from 'axios';
import { useAsyncState } from '@vueuse/core';

const props = defineProps(['actualScenario']);
const scenario = toRefs(props.actualScenario);

console.log(scenario)
const { state, isReady }= useAsyncState( () => {
    const url = "/scenarios/" + scenario.value;
    console.log("AXIOS Getting scenario for tasks", url)
    const data = axios.get(url).then(t => t.data);
    console.log("retrieved scenario: ", data)
    return data
})
console.log("Scenario state", state)

</script>
<template>
    <article v-if="isReady">
        <h4 class="text-center pb-3">Scenario</h4>
        <div class="h5">
        <p>Patient: </p><p><b>{{ state.gender }}</b></p><p><b>{{ state.age }} years old</b></p></div>
        
    </article>
</template>