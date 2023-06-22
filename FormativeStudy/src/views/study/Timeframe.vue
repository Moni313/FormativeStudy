<script setup>
import { ref } from 'vue';

const emit = defineEmits(['timeframe']);

let disableButton = ref(0);
let frame = ref(2);
const frames = [{
    'day': '1',
    'tf': [
        { "id": 1, start: "00:00", stop: "05:59" },
        { "id": 2, start: "07:00", stop: "11:59" },
        { "id": 3, start: "13:00", stop: "17:59" },
        { "id": 4, start: "19:00", stop: "23:59" },]
},
{
    'day': '2',
    'tf': [
        { "id": 5, start: "00:00", stop: "05:59" },
        { "id": 6, start: "07:00", stop: "11:59" },
        { "id": 7, start: "13:00", stop: "17:59" },
        { "id": 8, start: "19:00", stop: "23:59" }]
},
{
    'day': '3',
    'tf': [
        { "id": 9, start: "00:00", stop: "05:59" },
        { "id": 10, start: "07:00", stop: "11:59" },
        { "id": 11, start: "13:00", stop: "17:59" },
        { "id": 12, start: "19:00", stop: "23:59" }
    ]
}]

function nextFrame() {
    console.log(frame)
    frame.value = frame.value + 1;;
    console.log(frame)
    if (frame.value == (frames.length * 4)) disableButton = 1
    emit('timeframe', frame)
}

</script>

<template>
    <div class="row">
        <div class="col-9">
            <div class="container-fluid">
                <div class="row">
                    <div v-for="day in frames" class="col-4 border rounded text-center w-auto">
                        <h4 class="border-bottom border-2 pb-2"
                            :style="4 * day.day <= frame ? 'background-color:#C7E9B0; border-radius: 5px;' : ''">Day {{
                                day.day
                            }}</h4>

                        <div v-for="f in day.tf" class="float-start ms-2 me-3 h5">
                            <i v-if="f.id < frame" class="bi bi-clipboard-heart-fill text-success"></i>
                            <i v-else-if="f.id == frame" class="bi bi-clipboard2-pulse-fill text-success"></i>
                            <i v-else class="bi bi-clipboard-plus"></i>
                            <p class="h6 mt-1"> {{ f.start }}</p>
                            <p class="h6"> {{ f.stop }}</p>
                        </div>

                    </div>

                </div>
            </div>
        </div>

        <div class="col-3 align-items-center text-center border rounded pt-3">
            <h3>Timeframe <br />
                <button v-if="disableButton == 1" class="btn btn-dark text-center mt-3" v-on:click="nextFrame" disabled><b
                        class="h4">Next</b></button>
                <button v-else class="btn btn-success text-center mt-3" v-on:click="nextFrame"><b
                        class="h4">Next</b></button>
            </h3>
        </div>
    </div>
</template>
