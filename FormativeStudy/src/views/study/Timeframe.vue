<script setup>
import { ref, watch } from 'vue';

const emit = defineEmits(['timeframe']);

let disableButton = ref(0);
let actualTFDay = ref(1);
let actualTFBin = ref(0);
const days = 3;
const bins = [
    { "id": 0, text: "0-6" },
    { "id": 1, text: "7-12" },
    { "id": 2, text: "13-18" },
    { "id": 3, text: "19-24" }
];

function nextTF() {
    // if (actualTFDay.value == days && actualTFBin.value == bins.length-1) disableButton.value = 1
    // else { //only one way, no back
    actualTFBin.value = (actualTFBin.value + 1) % 4
    if (actualTFBin.value == 0) {
        actualTFDay.value = actualTFDay.value + 1
    }
    emit('timeframe', ({ 'day': actualTFDay, 'tfbin': actualTFBin }))
    //}
    if (actualTFDay.value == days && actualTFBin.value == bins.length - 1) disableButton.value = 1
}
// watch(disableButton, (n, o) =>{

// })

</script>

<template>
        <div class="row">
            <div class="h4 m-1">
                <div
                    class="float-start border rounded bg-light d-flex flex-column justify-content-center align-items-center m-2 p-1">
                    <p class="d-flex flex-column justify-content-center align-items-center m-3">Timeframe
                        <button v-if="disableButton == 1" class="btn btn-danger text-center" v-on:click="nextTF"
                            disabled><b>Next</b></button>
                        <button v-else class="btn btn-success text-center mt-3" v-on:click="nextTF"><b
                                class="h4">Next</b></button>
                    </p>
                </div>


                <div v-for="d in days" class="float-start ms-2 border rounded bg-light m-2 p-1">

                    <span class="d-flex flex-column justify-content-center align-items-center border-bottom">Day {{ d
                    }}</span>
                    <span v-for="b in bins" class="float-start ps-2 pe-2">
                        <div class="d-flex flex-column justify-content-center align-items-center">
                            <i v-if="(d <= actualTFDay && b.id < actualTFBin) || (d < actualTFDay)"
                                class="bi bi-clipboard-heart-fill text-success"></i>
                            <i v-else-if="(d == actualTFDay && b.id == actualTFBin)"
                                class="bi bi-clipboard2-pulse-fill text-success"></i>
                            <i v-else class="bi bi-clipboard-plus"></i>
                            <span> {{ b.text }}</span>

                        </div>
                    </span>
                    <br />
                    <div class="text-center mb-1"> hours</div>
                </div>
            </div>
        </div>
    
</template>










<!-- 

<template>
    <section>
        <div class="h6">
            <div class="ms-1 me-1">
                <div class="float-start  border rounded ps-1 pe-1 bg-light">
                    <p class="d-flex flex-column justify-content-center align-items-center ms-1 me-1 pe-1 pt-1">Timeframe
                        <button v-if="disableButton == 1" class="btn btn-danger text-center mt-2" v-on:click="nextTF"
                            disabled><b>Next</b></button>
                        <button v-else class="btn btn-success text-center mt-2" v-on:click="nextTF"><b>Next</b></button>
                    </p>
                </div>

                <div v-for="d in days" class="float-start ms-2 border rounded pt-1 pb-2 bg-light">
                    <span class="d-flex flex-column justify-content-center align-items-center border-bottom mb-1">Day {{ d
                    }}</span>
                    <span v-for="b in bins" class="float-start ps-2 pe-2">
                        <div class="d-flex flex-column justify-content-center align-items-center">
                            <i v-if="(d <= actualTFDay && b.id < actualTFBin) || (d < actualTFDay)"
                                class="bi bi-clipboard-heart-fill text-success"></i>
                            <i v-else-if="(d == actualTFDay && b.id == actualTFBin)"
                                class="bi bi-clipboard2-pulse-fill text-success"></i>
                            <i v-else class="bi bi-clipboard-plus"></i>
                            <span> {{ b.text }}</span>
                        </div>
                    </span>
                </div>
            </div>
        </div>
    </section>
</template> -->