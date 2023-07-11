<script setup>
import { reactive, ref, watch, watchEffect } from 'vue';

import axios from 'axios';
import { useAsyncState } from '@vueuse/core';

import { useVariableStore } from '../../stores/variable.store';
import { useCategoryStore } from '../../stores/study.store';
import { utilitiesStore } from '../../stores/utilities.store';
import { sepsisQuestStore } from "../../stores/sepsisquest.store";

import VarSearch from './VarSearch.vue';
import TasksBar from './TasksBar.vue';
import Timeframe from './Timeframe.vue';
import SepsisQuest from './SepsisQuest.vue';
import ListSelected from './ListSelected.vue';
import InstructionInsideStudy from '../static/InstructionInsideStudy.vue';
import VisArea from './VisArea.vue';
import VariableSelection from './VariableSelection.vue';
import SortSelected from './SortSelected.vue';
import AllSelected from './AllSelected.vue';


//variables for tasks
const actualTask = ref(1);
const totalTasks = 12;

//initialise the categories [vitals, labs, medications]
const { state, isReady } = useAsyncState(async () => {
    const data = await axios.get('/categories').then(t => t.data);
    return data
})
console.log("Study state: ", state)

//variable
const variable = useVariableStore();
const showGraphicsVariable = reactive(variable);

//timeframe
const tf = ref(0);
console.log("Study frame: ", tf)
//SepsisQuestion
const sepsisQAnswered = ref(false);
const sepsisQuest = sepsisQuestStore();
const options = useCategoryStore();

function closeArea(e) {
    console.log("what button?", e)
}

function showGraphics(e) {
    console.log("showGraphics", e)
    if (e.id != null && tf.value == 0) tf.value = 1;
    sepsisQAnswered.value = false
    showGraphicsVariable.variable = e
}

const refresh = ref(false)
function nextTask() {
    if (actualTask.value == totalTasks) {
        console.log("All the tasks have been completed")
        //TODO here need to go to post quests
    }
    else {
        //TODO check everything is reset to default, especially options of categories
        tf.value = 0;
        sepsisQAnswered.value = false;
        sepsisQuest.sepsisquest.answer = null;
        options.resetAllOptions();
        // options.selected = [];
        showGraphicsVariable.resetActual();
        options.showOptions = false;

        actualTask.value = actualTask.value + 1
        console.log("Task: ", actualTask.value);

        refresh.value = true;
        //TODO deselect all the options!!
    }
}
function nextFrame() {
    tf.value = tf.value + 1
}

function logTimeframe(n){
    const d = new Date();
    const ind = utilities.getNextLogId('/logger');
    console.log("logTimeFrame new index: ", ind.value);
    const log = {
        "id": ind.value,
        "timestamp": d,
        "action": "Next timeframe",
        "variableName": "Timeframe",
        "value": n,
        "order": "",
        "participantId": user.id
    }
    return log()
}

watch(() => tf.value, async (n) => {
    console.log("Timeframe", n);
    const log = logTimeframe(n);
    await utilities.postData("/logger", log)
})

watch(() => showGraphicsVariable.variable, (n) => {
    console.log("showGraphicsVariable new ", n)
})

watch(() => sepsisQAnswered.value, (n) => {
    console.log("isSepsis: ", n)
})


function refreshComponent() {
    ({ state, isReady } = useAsyncState(async () => {
        const data = await axios.get('/categories').then(t => t.data);
        return data
    }))
    console.log("from watchEffect: ", state)
}

//to reset all the options to false
//called when refresh is true and this is set when a task is completed
watchEffect(() => {
    if (refresh.value) {
        refreshComponent();
        refresh.value = false; // Reset the trigger value
    }
});

const utilities = utilitiesStore();
</script>


<template class="container-fluid">
    <div class="row h-100">
        <div class="col-2 h-100">
            <div class="card card-body">
                <TasksBar :actualTask=actualTask :totalTasks=totalTasks
                    class="border-bottom border-3  mt-3 border-secondary">
                </TasksBar>
                <!-- <Scenario class="border-bottom border-3  mt-5 border-secondary" :actualTask=actualTask></Scenario> -->
                <InstructionInsideStudy class="mt-5"></InstructionInsideStudy>
            </div>
        </div>
        <div class="col-7 h-100">
            <div class="card">
                <div v-if="!sepsisQAnswered" class="card-header mb-4">
                    <Timeframe :tf="tf" :actualTask=actualTask :totalTasks="totalTasks" @timeframe="nextFrame">
                    </Timeframe>
                </div>
                <div class="card-body">
                    <div class="container-fluid">
                        <div class="row mt-2">

                            <div v-if="!sepsisQAnswered">
                                <VisArea v-if="showGraphicsVariable.variable.id != null"
                                    :actualVariable="showGraphicsVariable" :compareModule="false" :tf="tf"></VisArea>
                                <VariableSelection v-else @closeArea="closeArea">
                                </VariableSelection>
                            </div>
                            <div v-else>
                                <SortSelected @next-task="nextTask"></SortSelected>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!sepsisQAnswered" class="col-3 h-100">
            <div class="card">
                <div class=" card-header">
                    <div class="mt-2 mb-2 text-center w-auto">
                        <!-- <TimeframeNext class="float-start align-items-center text-center  pt-3" @timeframe="nextFrame"
                            :tf="tf"></TimeframeNext> -->
                        <VarSearch v-if="isReady" :categories=state @variableSelected="showGraphics">
                        </VarSearch>
                    </div>
                </div>
                <div class="card-body">
                    <h5 class="text-center">Variables Selected</h5>
                    <ListSelected v-for="c in state" :c=c :k="c" :compareModule="false" @variableSelected="showGraphics">
                    </ListSelected>
                    <!-- <AllSelected @variableSelected="showGraphics"></AllSelected> -->
                    <br />

                    <SepsisQuest class="p-3 border-primary border-3" @sepsisQuestion="e => sepsisQAnswered = e">
                    </SepsisQuest>

                </div>
            </div>
        </div>
    </div>
</template>
