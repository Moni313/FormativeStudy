<script setup>
import { reactive, ref, watch } from 'vue';
import { useVariableStore } from '../../stores/variable.store';
import SubmitButtons from '../../components/SubmitButtons.vue';
import ListSelected from './ListSelected.vue';
import Chart from './chart.vue'

import axios from "axios";
import { useAsyncState } from "@vueuse/core";

//TODO maybe change logic? instead of passing a prop, actualVariable is selected from the store, and it is set on the ListSelected.vue component when clicking on the variable button
// allVariableSelected remain the same without the actualVariable
const props = defineProps(['timeframe', 'actualVariable', 'tf'])

const varsStore = useVariableStore();

//initialise the categories [vitals, labs, medications]
const { state, isReady } = useAsyncState(async () => {
    const data = await axios.get('/categories').then(t => t.data)
    return data
})

//category serach
const categories = reactive(state);


// const labelNo = "Close";
const labelOk = "Compare With";
const compare = ref(false)

function userAction(e) {
    compare.value = true
    console.log("value of compare: ", compare)
}

let compareWithShow = ref(false)
function compareWith(e) {
    console.log("variable to compare:", e)
    compareWithShow.value = true;
    compare.value = false;
    varsStore.setCompareVar(e)
    //TODO here set the second variable for comparison
}
watch(compare, (n, o) => {
    console.log(n, o)
}, { deep: true })
watch(varsStore, (n, o) => {
    console.log(n, o)
}, { deep: true })



const data1 = [
    { date: "24-Apr-07", amount: 93.24 },
    { date: "25-Apr-07", amount: 95.35 },
    { date: "26-Apr-07", amount: 98.84 },
    { date: "27-Apr-07", amount: 99.92 },


];
const data2 = [
    { date: "24-Apr-07", amount: 93.24 },
    { date: "25-Apr-07", amount: 95.35 },
    { date: "26-Apr-07", amount: 98.84 },
    { date: "27-Apr-07", amount: 99.92 },
    { date: "30-Apr-07", amount: 99.8 },
    { date: "1-May-07", amount: 99.47 },
    { date: "2-May-07", amount: 100.39 },
    { date: "3-May-07", amount: 100.4 },

];
const data3 = [
    { date: "24-Apr-07", amount: 93.24 },
    { date: "25-Apr-07", amount: 95.35 },
    { date: "26-Apr-07", amount: 98.84 },
    { date: "27-Apr-07", amount: 99.92 },
    { date: "30-Apr-07", amount: 99.8 },
    { date: "1-May-07", amount: 99.47 },
    { date: "2-May-07", amount: 100.39 },
    { date: "3-May-07", amount: 100.4 },
    { date: "4-May-07", amount: 100.81 },
    { date: "7-May-07", amount: 103.92 },
    { date: "8-May-07", amount: 105.06 },
    { date: "9-May-07", amount: 106.88 },
    { date: "10-May-07", amount: 107.34 },
]

let data = reactive(data1);
//TODO this must be dynamic!
if (props.tf == 2) data = data2
else if (props.tf == 3) data = data3
</script>
<template>
    <section>
        <div class="row mb-5">
            <div class="input-group mb-1 w-auto">
                <span class="input-group-prepend input-group-text sm bg-outline-dark fw-bold"> {{ props.actualVariable.variable.label
                }}</span>
                <button class="btn btn-outline-dark form-control text-start" @click="userAction(labelOk)"> {{
                    labelOk }}</button>
                <!-- <SubmitButtons :label-ok="labelOk" @selected="e => userAction(e)" class="form-control text-start"></SubmitButtons> -->
                <button v-if="varsStore.compareWith?.id != null && varsStore.compareWith?.id != ''"
                    class="input-group-append btn btn-outline-dark input-group-text">{{ varsStore.compareWith.label
                    }}<i class="bi bi-file-excel ps-2 float-end"></i></button>
                
            </div>
            <div class="float-start">
                    <ListSelected v-if="compare" v-for="c in categories" :c=c :k="c" :compareModule="true"
                        :varCompare="props.actualVariable.variable.id" @variableSelected="compareWith"></ListSelected>
                </div>
            <!-- <h4> <span class="float-start">{{ props.actualVariable.variable.label }}</span>
                
                <div class="float-start">
                    <SubmitButtons :label-ok="labelOk" @selected="e => userAction(e)"></SubmitButtons>
                    <div class="float-start">
                        <ListSelected v-if="compare" v-for="c in categories" :c=c :k="c" :compareModule="true"
                            :varCompare="props.actualVariable.variable.id" @variableSelected="compareWith"></ListSelected>
                    </div>
                    <div class="float-end" v-if="varsStore.compareWith?.id != null && varsStore.compareWith?.id != ''">
                    {{ varsStore.compareWith.label }}</div>
                </div>
            </h4> -->
        </div>
        <div>
            <Chart :id="'svg-main'" :v="varsStore.variable" :data="data"></Chart>
            <Chart :id="'svg-compare'" :v="varsStore.compareWith" v-if="compareWithShow" :data="data"></Chart>
        </div>
    </section>
</template>