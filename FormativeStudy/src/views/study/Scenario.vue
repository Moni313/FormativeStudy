<script setup>
import { toRefs, watch } from 'vue';
import axios from 'axios';
import { useAsyncState } from '@vueuse/core';

const props = defineProps(['actualTask']);
const scenario = toRefs(props, 'actualTask');
console.log("scenario as a prop", scenario)

let state = useAsyncState(async () => {
    const url = "/tasks/" + scenario.actualTask.value;
    console.log("Getting scenario for tasks", url)
    const data = await axios.get("" + url).then(t => t.data)
    return data
})


watch(() => scenario, (n) => {
    console.log("new scenario", n)
    state = useAsyncState(async () => {
        const url = "/tasks/" + scenario.actualTask.value;
        console.log("Getting scenario for tasks", url)
        const data = await axios.get("" + url).then(t => t.data)
        return data
    })
    console.log("updating state from scenario", state)
}, { deep: true })

</script>
<template>
    <article v-if="state.isReady">
        <h4 class="text-center">Scenario</h4>
        <p>The patient is a <b>{{ state.state.value }}</b>, <b>{{ typeof(state.state.value) }} years old</b>.</p>
        <p>You are asked to assess wheter the patient has sepsis or is at risk of developing sepsis</p>
    </article>
</template>