<script setup>
import RadioButtonGroup from "../../components/RadioButtonGroup.vue";
import SubmitButtons from "../../components/SubmitButtons.vue";
import { sepsisQuestStore } from "../../stores/sepsisquest.store";

const labelOk = "Submit";
const labelReset = "Reset";

const sepsisQuest = sepsisQuestStore();
//console.log(sepsisQuest.sepsisquest)
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

function action(e){
    if(e == labelReset) asnswerSepsis = null;
}
</script>
<template>
    <div class="border rounded ms-1 me-1">
        <h1 class="d-flex flex-column justify-content-center align-items-center ps-1 pe-1"><b>{{sepsisQuest.sepsisquest.label}}</b></h1>
        <RadioButtonGroup v-model=sepsisQuest.sepsisquest.answer :options=sepsisQuest.sepsisquest :selected=sepsisQuest.sepsisquest.answer @input="e => (sepsisQuest.sepsisquest.answer = e)" class="ms-5 mb-2">
        </RadioButtonGroup>
        <SubmitButtons :labelOk=labelOk @selected="action" class="mb-2"></SubmitButtons>
    </div>
</template>