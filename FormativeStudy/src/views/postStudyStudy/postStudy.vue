<script setup>
import { ref, computed } from 'vue'
import { postStudyUseStore } from '../../stores/postStudy.store';
import RadioButtonGroup from "../../components/RadioButtonGroup.vue";
import TextBox from '../../components/TextBox.vue';
import DatalistBox from '../../components/DatalistBox.vue';
import SubmitButtons from '../../components/SubmitButtons.vue';

import { storeToRefs } from 'pinia';
import { useAuthStore } from '../../stores';
import { utilitiesStore } from '../../stores/utilities.store';
import CheckBoxGroup from '../../components/CheckBoxGroup.vue';

const utilities = utilitiesStore();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const postStudyData = postStudyUseStore();
const labelOk = 'Submit and Exit';
const labelReset = "Reset";


async function createObjQuestionAnswer() {
    let qa = [];
    postStudyData.poststudydata.questions.forEach((e) => {
        qa.push({ 'question': e.label, 'answer': e.answer, 'expand': e.expand });
        if (e.expand) {
            const se = postStudyData.poststudydata.subquestions.find(sbe => sbe.id == e.expand_to);
            //console.log("expanded question: ", se);
            qa.push({ 'question': se.label, 'answer': se.answer, 'expand': se.expand })
        }
    })
    const d = new Date();
    const answers = { 'id': '', 'participantId': user.value.id, 'prestudy': qa, 'timeframe': d }
    utilities.postData('/prestudyQuestions', answers);
    return qa;
}

async function action(e) {
    if (e == labelOk) {
        
        //store info
        let obj = createObjQuestionAnswer()
        console.log("post study question-ansewrs: ", obj);
        const d = new Date();
        const log = {
            "id": '',
            "timestamp": d,
            "action": "Storing post Study",
            "variableName": "",
            "value": "",
            "order": "",
            "participantId": user.value.id
        }
        authStore.logout();
        await utilities.postData('/logger', log);
        
    }
    else if (e == labelReset) {
        postStudyData.poststudydata.questions.forEach(element => {
            element.answer = null;
        })
        postStudyData.poststudydata.subquestions.forEach(element => {
            element.answer = null;
        })
    }
}
function updateSubanswer(q, s) { //update q questiond with subquestion asnwer
    let item = postStudyData.poststudydata.questions.find(element => element.label == q);

    let subq = postStudyData.poststudydata.subquestions.find(e => e.id == item.expand_to);
    subq.answer = s;
}
function setVariables(question, answer, subquestion) {
    let q = postStudyData.poststudydata.questions.find(element => element.label == question)
    if (answer != null && q.answer != answer) {
        q.answer = answer;
    }
    if (answer == null) { //remove question with no answer from the list (input was cleared)
        const index = postStudyData.poststudydata.questions.indexOf(q);
        if (index > -1) {
            postStudyData.poststudydata.questions.splice(index, 1);
        }
    }
    if (subquestion != null && q.answer != subquestion) {
        q.answer = subquestion;
    }
}

const cba = ref([]);
const checkBoxAnswer = computed(() => {
    return cba
})

function updateCheckbox(q) {
    console.log("question update in prestudy", q)
    let keep = [];
    cba.value = [];
    q.options.forEach(e => {
        console.log(e)
        if (e.checked) cba.value.push(e.label)
        else {
            keep = cba.value.filter(obj => { obj.id != e.id })
        }
    })
    keep.forEach(e => {
        cbs.value.push(e.label)
    })
}
</script>


<template>
    <form class="container">
        <div class="card">
            <!-- <div class="card-header h4">{{ postStudyData.poststudydata.questions[0].question_group }}</div> -->

            <div class="col-12">
                <div v-for="question in postStudyData.poststudydata.questions" :id="'qustion_' + question.id"
                    class="float-start col-6 border-top">

                    <div class="card card-body border-0 input-group p-2">
                        <div>
                            <p class="me-2 text-muted card-header"><b>{{ question.label
                            }}</b></p>
                            <p v-if="question.answer != null && question.answer != ''" class="me-2 text-muted card-header">
                                <b class="text-dark">{{
                                    question.answer }}</b>
                            </p>
                            <p v-if="question.type == 'checkBox' && checkBoxAnswer.value?.length > 0" class="me-2 text-muted card-header">
                                <b class="text-dark">{{
                                    checkBoxAnswer }}</b>
                            </p>
                            <p v-else class="me-2 text-muted card-header"><br /> </p>
                        </div>

                        <div class="ps-5 pt-2">
                            <TextBox v-if="question.type == 'text'" v-model="question.answer" :key="'text_' + question.id"
                                :id="'text_' + question.id" @input="e => (setVariables(question.label, e, null))"
                                class="mb-2 pe-5" :selected="question.answer" />

                            <!-- <SelectBox v-else-if="question.type == 'select'" v-model="question.answer"
                                :key="'select_' + question.id" :id="'select_' + question.id" :options="question.options"
                                @input="e => question.answer = e" class="mb-2 pe-5" :selected="question.answer" /> -->

                            <DatalistBox v-else-if="question.type == 'datalist'" v-model="question.answer"
                                :key="'datalist_' + question.id" :id="'datalist_' + question.id" :options="question.options"
                                :currentValue="question.answer" @input="e => (setVariables(question.label, e, null))"
                                class="mb-2 pe-5" />

                            <RadioButtonGroup v-else-if="question.type == 'radioButton'" v-model="question.answer"
                                :options="question" @input="e => (setVariables(question.label, e, null))" class="mb-2 pe-5"
                                :selected="question.answer" :name="'qustion_' + question.id" />

                            <CheckBoxGroup v-else-if="question.type == 'checkBox'" :options="question.options"
                                @option-checked="e => updateCheckbox(question)"></CheckBoxGroup>

                            <!-- <NumberBox v-else-if="question.type == 'number'" min="0" v-model="question.answer"
                                @input="e => (setVariables(question.label, e, null))" class="mb-2 pe-5"
                                :selected="question.answer" /> -->

                            <div v-if="question.expand && question.answer == 'yes'">
                                <!-- Expand question [TODO] make this component with props and pass preStudy as a prop -->
                                <TextBox v-model="postStudyData.poststudydata.subquestions[question.expand_to - 1].answer"
                                    @input="e => (updateSubanswer(question.label, e))" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="pt-2">
            <div class="card">
                <div class="card-header h5">Summary</div>
                <div class="card-body">
                    <div class="col-12">
                        <div v-for="a in postStudyData.poststudydata.questions">
                            <div class="col-8 float-end text-left border-top"> {{ a.label }}</div>
                            <div class="col-4 text-end border-top pe-5">
                                <div v-if="a.type == 'checkBox'">
                                    {{ checkBoxAnswer }}
                                </div>
                                <div v-else-if="a.answer == null || a.answer == ''">
                                    <br />
                                    <div
                                        v-if="a.expand && (postStudyData.poststudydata.questions[a.expand_to] == null || postStudyData.poststudydata.questions[a.expand_to] == '')">
                                        <br />
                                    </div>

                                </div>
                                <div v-else> <b>{{ a.answer }}</b>
                                    <div
                                        v-if="a.expand && postStudyData.poststudydata.questions[a.expand_to] != null && postStudyData.poststudydata.questions[a.expand_to] != ''">
                                        <b>{{
                                            postStudyData.poststudydata.subquestions.find(e => e.id =
                                                a.expand_to).answer }}</b>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="m-2 ps-1">
                    <SubmitButtons :labelOk=labelOk :labelReset=labelReset @selected="action"
                        class="d-flex flex-column justify-content-center align-items-center ps-1 pe-1" />
                </div>
            </div>
        </div>
    </form>
</template>
