

<script setup>
import VarSearch from './VarSearch.vue';
import TasksBar from './TasksBar.vue';
import Timeframe from './Timeframe.vue';
import SepsisQuest from './SepsisQuest.vue';
import ListSelected from './ListSelected.vue';
import InstructionInsideStudy from '../static/InstructionInsideStudy.vue';
import VisArea from './VisArea.vue';
import CompareArea from './CompareArea.vue';
import VariableSelection from './VariableSelection.vue';

import { ref, watch, inject } from 'vue';

const startinInstruction = true;
const actualTask = 2;
const totalTasks = 12;


import axios from 'axios';
import { useAsyncState } from '@vueuse/core';


//initialise the categories
let { state, isReady } = useAsyncState(async () => {
    const data = await axios.get('/categories').then(t => t.data)
    console.log("Study.vue: data in useAsyncState", data)
    return data
})

//category serach
let search = ref();
let category = ref();
let showCheckBoxNumber = 20;


//timeframe
let day = 0;
let tfbin = 0;
function timeframe(e) {
    day = e.day;
    tfbin = e.tfbin;
}

//update status
const emitter = inject('emitter');
emitter.on('updateCategory', (update) => {
    if (update) {
        ({ state, isReady } = useAsyncState(async () => {
            let x = await axios.get('/categories').then(t => t.data);
            console.log("after emittter in listSelected", x)
            return x
        }))
    }
})

watch(search, (newValue, oldValue) => {
    console.log("Study.vue: new catgory", newValue);
    category = newValue
});

watch(state, (n,o )=> {
    console.log("new state", n)
});
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

                <VarSearch v-if="isReady" class="float-start" :categories=state @searchFor="e => search = e"></VarSearch>
                <div v-else>Loading...</div>
                <InstructionInsideStudy class="float-start" :starting=startinInstruction></InstructionInsideStudy>
            </div>

        </div>
        <div class="card card-body">
            <section class="h-100">
                
 
                <div class="float-start me-2 h-100" >
                    <ul class="nav flex-column" v-for="category in state">
                        <li class="nav-item">
                    <ListSelected :apiUrl="category.options" :label="category.label"></ListSelected>
                </li>
                </ul>
                </div>
                



                <div class="container">
                    <VariableSelection v-if="search != null" :category=category :showCheckBoxNumber=showCheckBoxNumber
                        @closeArea="e => search = e">
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

