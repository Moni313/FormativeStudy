<script setup>
import Scenario from './Scenario.vue';
import TimeframeNext from './TimeframeNext.vue';
const props = defineProps(['tf', 'actualTask', 'totalTasks']);
const emit = defineEmits(['timeframe'])
const frames = [{
    'day': '1',
    'tf': [
        { "id": 1, start: "00:00", stop: "05:59" },
        { "id": 2, start: "06:00", stop: "11:59" },
        { "id": 3, start: "12:00", stop: "17:59" },
        { "id": 4, start: "18:00", stop: "23:59" },]
},
{
    'day': '2',
    'tf': [
        { "id": 5, start: "00:00", stop: "05:59" },
        { "id": 6, start: "06:00", stop: "11:59" },
        { "id": 7, start: "12:00", stop: "17:59" },
        { "id": 8, start: "18:00", stop: "23:59" }]
},
{
    'day': '3',
    'tf': [
        { "id": 9, start: "00:00", stop: "05:59" },
        { "id": 10, start: "06:00", stop: "11:59" },
        { "id": 11, start: "12:00", stop: "17:59" },
        { "id": 12, start: "18:00", stop: "23:59" }
    ]
}]
</script>

<template>
    <div class="float-start ms-3">
        <Scenario :actualTask=props.actualTask></Scenario>
    </div>
    <div class="float-end ms-3">
        <TimeframeNext class="pt-3" :tf="tf" :totalTasks="props.totalTasks" @timeframe="emit('timeframe')">
        </TimeframeNext>
    </div>
    <div class="float-end">
        <div class="container">
            <div class="row">
                <div v-for="day in frames" class="border rounded text-center w-auto">
                    <h4 class="border-bottom border-2 pb-2 text-center"
                        :style="4 * day.day <= props.tf ? 'background-color:#C7E9B0; border-radius: 5px;' : ''">Day
                        {{
                            day.day
                        }}</h4>

                    <div v-for="f in day.tf" class="float-start ms-1 me-2 h4">
                        <i v-if="f.id < props.tf" class="bi bi-clipboard-heart-fill text-success"></i>
                        <i v-else-if="f.id == props.tf" class="bi bi-clipboard2-pulse-fill text-success"></i>
                        <i v-else class="bi bi-clipboard-plus"></i>
                        <p class="h6 mt-1"> {{ f.start }}</p>
                        <p class="h6"> {{ f.stop }}</p>
                    </div>
                    <div class="h6">Hours</div>
                </div>
            </div>
        </div>
    </div>
</template>
