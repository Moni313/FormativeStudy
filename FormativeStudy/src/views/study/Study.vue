<script setup>
import { reactive, ref, watch } from 'vue';

import axios from 'axios';
import { useAsyncState } from '@vueuse/core';

import { useVariableStore } from '../../stores/variable.store';

import VarSearch from './VarSearch.vue';
import TasksBar from './TasksBar.vue';
import Timeframe from './Timeframe.vue';
import TimeframeNext from './TimeframeNext.vue';
import SepsisQuest from './SepsisQuest.vue';
import ListSelected from './ListSelected.vue';
import InstructionInsideStudy from '../static/InstructionInsideStudy.vue';
import VisArea from './VisArea.vue';
import VariableSelection from './VariableSelection.vue';
import Scenario from './Scenario.vue';


//variables for tasks
const actualTask = 1;
const totalTasks = 12;


//initialise the categories [vitals, labs, medications]
const { state, isReady } = useAsyncState(async () => {
    const data = await axios.get('/categories').then(t => t.data)
    return data
})

//category search
const categories = reactive(state);

function closeArea(e) {
    console.log("what button?", e)
}

//variable
const variable = useVariableStore();
const showGraphicsVariable = reactive(variable);

function showGraphics(e) {
    console.log("showGraphics", e)
    showGraphicsVariable.variable = e
}

//timeframe
const tf = ref(3);
console.log("Study frame: ", tf)
function nextFrame() {
    tf.value = tf.value + 1
    console.log("Timeframe: ", tf.value)
}

watch(() => tf, (n, o) => {
    console.log("next timeframe", n)
}, { deep: true })

watch(() => showGraphicsVariable, (n, o) => {
    console.log("showGraphicsVariable new ", n)
    console.log("showGraphicsVariable old", o)
    if (n.id != null) {

    }
}, { deep: true })

</script>


<template class="container-fluid">
    <div class="row h-100">
        <div class="col-2 h-100">
            <div class="card card-body">
                <TasksBar :actualTask=actualTask :totalTasks=totalTasks
                    class="border-bottom border-3  mt-3 border-secondary">
                </TasksBar>
                <Scenario class="border-bottom border-3  mt-5 border-secondary"></Scenario>
                <InstructionInsideStudy class="mt-5"></InstructionInsideStudy>
            </div>
        </div>
        <div class="col-7 h-100">
            <div class="card-header mb-4">
                <div class="container-fluid">
                    <div class="row">
                        <Timeframe :tf="tf">
                        </Timeframe>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="container-fluid">
                    <div class="row mt-2">
                        <div class="ms-5">
                            <VisArea v-if="showGraphicsVariable.variable.id != null" :actualVariable="showGraphicsVariable"
                                :compareModule="false" :tf="tf"></VisArea>
                            <VariableSelection v-else @closeArea="closeArea">
                            </VariableSelection>
                        </div>



                    </div>
                </div>
            </div>
        </div>
        <div class="col-3 h-100">
            <div class="card">
                <div class=" card-header">
                    <div class="mt-2 mb-2 text-center w-auto">
                        <TimeframeNext class="float-start align-items-center text-center  pt-3" @timeframe="nextFrame"
                            :tf="tf"></TimeframeNext>
                        <VarSearch v-if="isReady" :categories=categories @variableSelected="showGraphics">
                        </VarSearch>
                    </div>
                </div>
                <div class="card-body">
                    <h5 class="text-center">Variables Selected</h5>
                    <ListSelected v-for="c in categories" :c=c :k="c" :compareModule="false"
                        @variableSelected="showGraphics">
                    </ListSelected>

                    <br />

                    <SepsisQuest class="p-3 border-primary border-3"></SepsisQuest>

                </div>
            </div>
        </div>
    </div>
</template>
