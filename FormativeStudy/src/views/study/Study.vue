<script setup>
import { reactive, ref, watch, computed } from 'vue';
import { storeToRefs } from 'pinia';

import axios from 'axios';
import { useAsyncState } from '@vueuse/core';

import { useVariableStore } from '../../stores/variable.store';
import { useCategoryStore } from '../../stores/study.store';
import { utilitiesStore } from '../../stores/utilities.store';
import { sepsisQuestStore } from "../../stores/sepsisquest.store";
import { useAuthStore } from '../../stores';

import VarSearch from './VarSearch.vue';
import TasksBar from './TasksBar.vue';
import Timeframe from './Timeframe.vue';
import SepsisQuest from './SepsisQuest.vue';
import ListSelected from './ListSelected.vue';
import InstructionInsideStudy from '../static/InstructionInsideStudy.vue';
import VisArea from './VisArea.vue';
import VariableSelection from './VariableSelection.vue';
import SortSelected from './SortSelected.vue';


//variables for tasks
const actualTask = ref(11);
const totalTasks = 12;



//initialise the categories [vitals, labs, medications]
const { state, isReady } = useAsyncState(() => {
    return axios.get('/categories').then(t => t.data)
})
if (isReady) console.log("Study state: ", state)

//variable
const variable = useVariableStore();
const showGraphicsVariable = reactive(variable);
import { router } from '../../router';
//timeframe
const tf = ref(0);
//console.log("Study frame: ", tf)
//SepsisQuestion
const sepsisQAnswered = ref(false);
const sepsisQuest = sepsisQuestStore();
const options = useCategoryStore();
options.resetAllOptions();

//TODO this actually does nothing
function closeArea(e) {
    console.log("what button?", e)
}

function showGraphics(e) {
    console.log("Study -> showGraphics", e)
    if (e.id != null && tf.value == 0) tf.value = 1;
    sepsisQAnswered.value = false
    showGraphicsVariable.variable = e
}

// const refresh = ref(false)
function nextTask() {
    console.log("----------------------- Start new task");
    if (actualTask.value == totalTasks) {
        console.log("Study -> All the tasks have been completed")
        //TODO here need to go to post quests
        router.push('/poststudy');
    }
    else {
        //TODO check everything is reset to default, especially options of categories
        tf.value = 0;
        sepsisQAnswered.value = false;
        sepsisQuest.sepsisquest.answer = null;

        //TODO deselect all the options!!
        showGraphicsVariable.resetActual();
        showGraphicsVariable.resetCompare();
        options.showOptions = false;
        actualTask.value = actualTask.value + 1
        console.log("Study -> New Task: ", actualTask.value);
        //need this to refres the categories
        options.resetAllOptions();
        //refresh.value = true;

        //TODO update initialise to keep trace of work

    }
}
function nextFrame() {
    tf.value = tf.value + 1
}

const utilities = utilitiesStore();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);



watch(() => tf.value, async (n) => {
    console.log("Timeframe", n);
    const d = new Date();
    console.log("logTimeFrame new index: ",);
    const log = {
        "id": '',
        "scenario": actualTask.value,
        "timestamp": d,
        "action": "Next timeframe",
        "variableName": "Timeframe",
        "value": n,
        "order": "",
        "participantId": user.value.id
    }
    await utilities.postData("/logger", log)
})

watch(() => showGraphicsVariable.variable, (n) => {
    console.log("showGraphicsVariable new ", n)
})

watch(() => sepsisQAnswered.value, (n) => {
    console.log("isSepsis: ", n)
})


// function refreshComponent() {
//     ({ state, isReady } = useAsyncState(async () => {
//         console.log("AXIOS in study get categories in refresh componnet");
//         const data = await axios.get('/categories').then(t => t.data);
//         return data
//     }))
//     console.log("from watchEffect: state is refreshed", state)
// }

//to reset all the options to false
//called when refresh is true and this is set when a task is completed
// watchEffect(() => {
//     if (refresh.value) {
//         refreshComponent();
//         refresh.value = false; // Reset the trigger value
//     }
// });

//initialise
const initValues = computed(async () => {
    return utilities.getData('/initialization');

})

</script>


<template class="container-fluid">
    <div class="row h-100">
        <div class="col-2 h-100">
            <div class="card ps-1 pe-1">
                <TasksBar :actualTask=actualTask :totalTasks=totalTasks
                    class="border-bottom border-3  mt-3 border-secondary">
                </TasksBar>
                <!-- <Scenario class="border-bottom border-3  mt-5 border-secondary" :actualTask=actualTask></Scenario> -->
                <InstructionInsideStudy class="mt-5"></InstructionInsideStudy>
            </div>
        </div>
        <div v-if="!sepsisQAnswered" class="col-2 h-100">
            <!-- <div class="card"> -->
            <div class=" card-header">
                <div class="mt-2 mb-2 text-center w-auto">
                    <!-- <TimeframeNext class="float-start align-items-center text-center  pt-3" @timeframe="nextFrame"
                            :tf="tf"></TimeframeNext> -->
                    <VarSearch v-if="isReady" :categories=state @variableSelected="showGraphics">
                    </VarSearch>
                </div>
            </div>
            <div class="card-body">
                <h5 class="text-center border-top border-3 mt-5 pt-3">Variables Selected</h5>
                <ListSelected v-for="c in state" :c=c :k="c" :compareModule="false" @variableSelected="showGraphics">
                </ListSelected>
                <!-- <AllSelected @variableSelected="showGraphics"></AllSelected> -->

            </div>
            <!-- </div> -->
        </div>
        <div class="col-8">
            <div class="position-relative">

                <div class="card">
                    <div v-if="!sepsisQAnswered" class="card-header mb-4">
                        <Timeframe :tf="tf" :actualTask=actualTask :totalTasks="totalTasks" @timeframe="nextFrame">
                        </Timeframe>
                    </div>

                    <div class="card-body">
                        <div class="container">
                            <div class="row mt-2">

                                <div v-if="!sepsisQAnswered">
                                    <VisArea v-if="showGraphicsVariable.variable.id != null"
                                        :actualVariable="showGraphicsVariable" :compareModule="false" :tf="tf">
                                    </VisArea>
                                    <VariableSelection v-else @closeArea="closeArea">
                                    </VariableSelection>

                                </div>
                                <div v-else>
                                    <SortSelected @nextTask="nextTask"></SortSelected>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="w-auto h-auto position-fixed bottom-0 end-0 bg-light">
                <SepsisQuest class="p-3 me-3 mb-3 border-primary border-3" @sepsisQuestion="e => sepsisQAnswered = e">
                </SepsisQuest>
            </div>







        </div>
    </div>
</template>
