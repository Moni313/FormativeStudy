<script setup>
import {computed} from 'vue';
import RadioButtonGroup from "../../components/RadioButtonGroup.vue";
import SubmitButtons from "../../components/SubmitButtons.vue";
import { sepsisQuestStore } from "../../stores/sepsisquest.store";
import { severeQuestStore } from "../../stores/severequest.store";

const emit = defineEmits(['sepsisQuestion', 'okDisabled'])

const labelOk = "Submit";

const sepsisQuest = sepsisQuestStore();
const severeQuest = severeQuestStore();
//DONE - TODO make this as a data/file.json
// const options =
// {
//     "id": 1,
//     "label": "Is this Sepsis?",
//     "image": null,
//     "description": null,
//     "help": "",
//     "type": "radioButton",
//     "question_group": "Experience",
//     "expand": false,
//     "expand_to": null,
//     "condition_to_expand": null,
//     "answer": null,
//     "options": [
//         {
//             "id": 1,
//             "label": "Yes",
//             "description": null,
//             "help": null,
//             "order": 0,
//             "type": "answer"
//         },
//         {
//             "id": 2,
//             "label": "No",
//             "description": null,
//             "help": null,
//             "order": 1,
//             "type": "answer"
//         }
//     ]
// }
function setAnswerSepsis(e) {
    console.log("Sepsi Quest -> setAnswerSepsis", e);
    if (e == 'Yes' || e == 'No') sepsisQuest.sepsisquest.answer = e;
    else sepsisQuest.sepsisquest.answer = '';
    severeQuest.severequest.answer = '';
}
function setAnswerSeverity(e) {
    console.log("Sepsi Quest -> setAnswerSeverity", sepsisQuest.sepsisquest.answer, e);
    severeQuest.severequest.answer = e
}

function action(e) {
    console.log("Sepsi Quest -> SepsisQuestion action: ", e)
    if(e == labelOk) emit('sepsisQuestion', true)
}

const disableButton = computed(() => {
    console.log("Sepsi Quest -> checking status of answers", sepsisQuest.sepsisquest.answer)
    if(sepsisQuest.sepsisquest.answer == 'No' || (severeQuest.severequest.answer != '' && severeQuest.severequest.answer != null)) return false
    else return true
})
</script>
<template>
    <div class="border rounded">
        <h4 class="d-flex flex-column justify-content-center align-items-center"><b>{{ sepsisQuest.sepsisquest.label }}</b>
        </h4>
        
            <RadioButtonGroup key="sepsisQuest" id="sepsisQuest" v-model=sepsisQuest.sepsisquest.answer name="sepsisQuest"
                :options=sepsisQuest.sepsisquest :selected=sepsisQuest.sepsisquest.answer @input="e => setAnswerSepsis(e)"
                class="ms-4 mb-2">
            </RadioButtonGroup>
            <div v-if="sepsisQuest.sepsisquest.answer == 'Yes'">
                <hr />
                <RadioButtonGroup key="severeQuest" id="severeQuest" v-model=severeQuest.severequest.answer name="severeQuest"
                    :options=severeQuest.severequest :selected=severeQuest.severequest.answer @input="e => setAnswerSeverity(e)"
                    class="ms-4 mb-2">

                </RadioButtonGroup>
                <hr />
            </div>
            <div class="btn">
                <SubmitButtons :okDisabled="disableButton"
                    :labelOk=labelOk @selected="e => action(e)" class="mb-2">
                </SubmitButtons>
                <!-- <div v-else class="row justify-content-center  ms-2 me-2">
                    <button class="btn btn-outline-dark text-center btn-sm" disabled >{{ labelOk }}</button>
                </div> -->
            </div>
    </div>
</template>