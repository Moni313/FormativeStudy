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
import Scenario from './Scenario.vue';

import { computed, reactive, ref, watch, watchEffect } from 'vue';


import axios from 'axios';
import { useAsyncState } from '@vueuse/core';


//variables for tasks
const actualTask = 2;
const totalTasks = 12;

//timeframe
let day = 0;
let tfbin = 0;
function timeframe(e) {
    day = e.day;
    tfbin = e.tfbin;
}


//initialise the categories [vitals, labs, medications]
const { state, isReady } = useAsyncState(async () => {
    const data = await axios.get('/categories').then(t => t.data)
    return data
})

//category serach
const categories = reactive(state);
let showCheckBoxNumber = 20;

</script>


<template>
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

        <div class="col-10 card">

            <div class="border-bottom border-2 ">
                <VarSearch v-if="isReady" class="w-auto float-start me-3 mt-3 ps-3" :categories=categories>
                </VarSearch>
                <Timeframe @timeframe="timeframe" class="ps-5">
                </Timeframe>


            </div>
            <div class="card-body">
                <div class="row mt-2">
                    <div class="w-auto float-start border-end">
                        <h5>Variables Selected</h5>
                        <ListSelected v-for="c in categories" :c=c></ListSelected>
                    </div>
                    <div class="w-auto float-start ms-5">
                        <VariableSelection @closeArea="e => console.log(e)">
                        </VariableSelection>
                    </div>
                </div>
            </div>


        </div>
    </div>
</template>

















<!-- <template>
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
</template> -->

