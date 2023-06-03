

<script setup>
import VarSearch from './VarSearch.vue';
import TasksBar from './TasksBar.vue';
import Timeframe from './Timeframe.vue';
import SepsisQuest from './SepsisQuest.vue';
import ListSelected from './ListSelected.vue';
import InstructionInsideStudy from '../static/InstructionInsideStudy.vue';
import VisArea from './VisArea.vue';
import CompareArea from './CompareArea.vue';
// import ListVariable from './ListVariable.vue';
import VariableSelection from './VariableSelection.vue';

import { ref,reactive, watch } from 'vue';

const startinInstruction = true;
const actualTask = 2;
const totalTasks = 12;


import axios from 'axios';
import { useAsyncState } from '@vueuse/core'
const { state } = useAsyncState(async (args) => {
    const { data } = await axios.get('/apiFS')
    console.log("data in async", data[0].categories)
    return data[0].categories
})


let search = ref("");
let category = ref("");
let showCheckBoxNumber = 20;
let selected = reactive([]); //array with only selected {itemid, label, color, order}
let lastSelected =ref();
watch(search, (newValue, oldValue) => {
    console.log("New and old value of search", newValue, oldValue);
    category = newValue
})

function getSubSetOptions(newValue, size) {
    if (newValue?.options && newValue.options.length > size) newValue.options = newValue.options.slice(0, size)
    return newValue
}

let day = 0;
let tfbin = 0;
function timeframe(e) {
    day = e.day;
    tfbin = e.tfbin;
    console.log(e)
}
//todo
function sortABC(newValue) { }


function calculateSizeofOptions(options) {
    console.log("lenght of options", options.options.length)
    return options.options.length
}

function updateSelected(e){
    console.log("selected", selected)
    console.log("e", e)
    selected.push(...e)
}

</script>

<template>
    <article>
        <div class="card card-header">

            <div class="align-middle">
                <TasksBar :actualTask=actualTask :totalTasks=totalTasks class="float-end"></TasksBar>
                <SepsisQuest class="float-start bg-white text-danger ps-5 pe-5 pt-3 pb-1 mt-1"></SepsisQuest>
                <Timeframe @timeframe="timeframe" class="float-start card-body border rounded bg-dark bg-gradient m-1">
                </Timeframe>


            </div>
            <div class="mt-2">

                <VarSearch class="float-start" :categories=state @searchFor="e => search = e"></VarSearch>
                <InstructionInsideStudy class="float-start" :starting=startinInstruction></InstructionInsideStudy>
            </div>

        </div>
        <div class="card card-body">
            <section class="h-100">
                <ListSelected class="float-start me-2 h-100" :selected=selected></ListSelected>

                <div class="container">
                    <VariableSelection v-if="search != ''" :category=category :showCheckBoxNumber=showCheckBoxNumber
                        @closeArea="e => search = e" @updateSelected="updateSelected">
                    </VariableSelection>
                    <div v-else>
                        <VisArea></VisArea>
                        <CompareArea></CompareArea>
                    </div>
                </div>
            </section>
        </div>
    </article>
</template>

