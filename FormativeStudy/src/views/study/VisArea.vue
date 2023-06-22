<script setup>
import { reactive, ref, watch } from 'vue';
import { useVariableStore } from '../../stores/variable.store';
import SubmitButtons from '../../components/SubmitButtons.vue';
import ListSelected from './ListSelected.vue';
import Chart from './chart.vue'

import axios from "axios";
import { useAsyncState } from "@vueuse/core";

const varsStore = useVariableStore();
const vars = reactive(varsStore);


//initialise the categories [vitals, labs, medications]
const { state, isReady } = useAsyncState(async () => {
    const data = await axios.get('/categories').then(t => t.data)
    return data
})

//category serach
const categories = reactive(state);


//TODO maybe change logic? instead of passing a prop, actualVariable is selected from the store, and it is set on the ListSelected.vue component when clicking on the variable button
// allVariableSelected remain the same without the actualVariable
const props = defineProps(['timeframe', 'actualVariable'])


// const labelNo = "Close";
const labelOk = "Compare With";
const compare = ref(false)

function userAction(e) {
    compare.value = true
    console.log("value of compare: ", compare)
}

let compareWithShow = ref(false)
function compareWith(e){
    console.log("variable to compare:", e)
    compareWithShow.value = true;
    compare.value =false;
    varsStore.setCompareVar(e)
    //TODO here set the second variable for comparison
}
watch(compare, (n, o) => {
    console.log(n, o)
}, { deep: true })
watch(varsStore, (n, o) => {
    console.log(n, o)
}, { deep: true})
</script>
<template>
    <section>
        <div class="row">
            <h4> <span class="float-start">{{ props.actualVariable.variable.label }}</span>
                <div class="float-start">
                    <SubmitButtons :label-ok="labelOk" @selected="e => userAction(e)"></SubmitButtons>
                    <div class="float-start">
                        
                        
                        <ListSelected v-if="compare" v-for="c in categories" :c=c :k="c" :compareModule="true"
                            :varCompare="props.actualVariable.variable.id" @variableSelected="compareWith"></ListSelected>
                    </div>
                    <div class="float-end" v-if="varsStore.compareWith?.id != null && varsStore.compareWith?.id != ''">
                    {{ varsStore.compareWith.label }}</div>
                </div>

            </h4>

        </div>

        <div>
            <Chart :id="'svg-main'" :v="varsStore.variable"></Chart>
            <Chart :id="'svg-compare'" :v="varsStore.compareWith" v-if="compareWithShow"></Chart>
        </div>






    </section>
</template>