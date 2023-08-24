<script setup>
import { reactive, ref, watch, toRefs, computed } from 'vue';
import { useAsyncState } from "@vueuse/core";
import axios from "axios";

import { useVariableStore } from '../../stores/variable.store';
import { utilitiesStore } from '../../stores/utilities.store';

import AllSelected from './AllSelected.vue';
import Chart from './Chart.vue'

//TODO maybe change logic? instead of passing a prop, actualVariable is selected from the store, and it is set on the ListSelected.vue component when clicking on the variable button
// allVariableSelected remain the same without the actualVariable
const props = defineProps(['actualVariable', 'tf'])

const varsStore = useVariableStore();
const utilities = utilitiesStore();

//initialise the categories [vitals, labs, medications]

const { state } = useAsyncState(() => {
    const data = axios.get('/categories').then(t => t.data)
    return data
})

//category serach
const categories = reactive(state);


// const labelNo = "Close";
const labelOk = "Compare With";
const compare = ref(false)

const timeframe = toRefs(props, 'tf');


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
]
const data3 = [
    { date: "24-Apr-07", amount: 93.24 },
    { date: "25-Apr-07", amount: 95.35 },
    { date: "26-Apr-07", amount: 98.84 },
    { date: "27-Apr-07", amount: 99.92 },
    { date: "30-Apr-07", amount: 99.8 },
    { date: "1-May-07", amount: 99.47 },
    { date: "2-May-07", amount: 100.39 },
    { date: "3-May-07", amount: 100.4 }
]
const data4 = [
    { date: "24-Apr-07", amount: 93.24 },
    { date: "25-Apr-07", amount: 95.35 },
    { date: "26-Apr-07", amount: 98.84 },
    { date: "27-Apr-07", amount: 99.92 },
    { date: "30-Apr-07", amount: 99.8 },
    { date: "1-May-07", amount: 99.47 },
    { date: "2-May-07", amount: 100.39 },
    { date: "3-May-07", amount: 100.4 },
    { date: "4-May-07", amount: 100.81 },
    { date: "7-May-07", amount: 103.92 }]
const data5 = [
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
    { date: "9-May-07", amount: 106.88 }]
const data6 = [
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
    { date: "10-May-07", amount: 107.34 }
]


const data = ref(data1)

function resetCompareVar() {
    varsStore.resetCompare()
}

function userAction(e) {
    resetCompareVar()
    compare.value = true
    console.log("ViArea -> value of compare: ", compare.value)
}

function compareWith(e) {
    console.log("ViArea -> variable to compare:", e)
    compare.value = false;
    varsStore.setCompareVar(e)
}

watch(() => timeframe, (n) => {
    console.log("VisArea -> timeframe", n)
    if (timeframe.tf.value <= 1) data.value = data1;
    else if (timeframe.tf.value <=2) data.value = data2;
    else if (timeframe.tf.value <=3) data.value = data3;
    else if (timeframe.tf.value <=4) data.value = data4;
    else if ( timeframe.tf.value <=5) data.value = data5;
    else  data.value = data6;

    console.log("data is updated?", data)
}, { deep: true })

watch(compare, (n, o) => {
    console.log("ViArea -> compare n, o", n, o)
}, { deep: true })
// watch(varsStore, (n, o) => {
//     console.log("ViArea ->  varstore n, o", n, o)
// }, { deep: true })
</script>
<template>
    <div class="container">

        <div class="float-start">
            <div class="input-group mb-5">
                <span class="input-group-prepend input-group-text sm bg-outline-dark fw-bold"> {{
                    props.actualVariable.variable.label
                }}</span>
            </div>
            <div>
                <Chart :id="'svg-main'" :v="varsStore.variable" :data="data"></Chart>
                <button v-if="varsStore.compareWith?.id != null && varsStore.compareWith?.id != ''"
                    v-on:click="resetCompareVar" class="input-group-append btn btn-outline-dark input-group-text mb-3">{{
                        varsStore.compareWith.label
                    }}<i class="bi bi-file-excel ps-2 float-end"></i></button>
                <Chart :id="'svg-compare'" :v="varsStore.compareWith" v-if="varsStore.compareWith.id != null" :data="data">
                </Chart>
            </div>
            <div class="float-start">
            <button class="btn btn-outline-secondary form-control text-start" @click="userAction(labelOk)"> {{
                labelOk }}</button>
            <AllSelected v-if="compare" v-for="c in categories" :c=c :k="'allSelected_' + c"
                :varCompare="props.actualVariable.variable.id" @variableSelected="compareWith"></AllSelected>

        </div>
        </div>
        

        [dev: tf={{ props.tf }}]
    </div>
</template>