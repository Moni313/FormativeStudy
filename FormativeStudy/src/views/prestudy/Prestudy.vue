<script setup>
import { preStudyUseStore } from '../../stores/prestudy.store';
import { router } from '../../router';
import RadioButtonGroup from "../../components/RadioButtonGroup.vue";
import TextBox from '../../components/TextBox.vue';
import SelectBox from '../../components/SelectBox.vue';
import DatalistBox from '../../components/DatalistBox.vue';
import NumberBox from '../../components/NumberBox.vue';
import SubmitButtons from '../../components/SubmitButtons.vue';




const preStudyData = preStudyUseStore();
const labelOk = 'OK';
const labelReset = "Reset";
const labelNo = "Logout"


function createObjQuestionAnswer() {
    let qa = [];
    preStudyData.prestudydata.questions.forEach(e => {
        if (e.expand) {
            let se = preStudyData.prestudydata.subquestions.find(sbe => sbe.id == e.expand_to)
            qa.push({ 'question': e.label, 'answer': e.answer, 'expand': se.answer })
        }
        else {
            qa.push({ 'question': e.label, 'answer': e.answer, 'expand': null })
        }
    })
    return qa;
}

function action(e) {
    if (e == labelOk) {
        //store info
        let obj = createObjQuestionAnswer()

        //redirect to study params: [ 'actualTask', 'totalTasks',  'actualTFDay', 'actualTFBin', 'startinInstruction']
        router.push('/study');
    }
    else if (e == labelReset) {
        preStudyData.prestudydata.questions.forEach(element => {
            element.answer = null;
        })
        preStudyData.prestudydata.subquestions.forEach(element => {
            element.answer = null;
        })
        let obj = createObjQuestionAnswer();

    }
}
function updateSubanswer(q, s) { //update q questiond with subquestion asnwer
    let item = preStudyData.prestudydata.questions.find(element => element.label == q);

    let subq = preStudyData.prestudydata.subquestions.find(e => e.id == item.expand_to);
    subq.answer = s;
}
function setVariables(question, answer, subquestion) {

    let q = preStudyData.prestudydata.questions.find(element => element.label == question)
    if (answer != null && q.answer != answer) {
        q.answer = answer;
    }
    if (answer == null) { //remove question with no answer from the list (input was cleared)
        const index = preStudyData.prestudydata.questions.indexOf(q);
        if (index > -1) {
            preStudyData.prestudydata.questions.splice(index, 1);
        }
    }
    if (subquestion != null && q.answer != subquestion) {
        q.answer = subquestion;
    }
}
</script>


<template>
    <form class="container">
        <div class="card">
            <div class="card-header h4">{{ preStudyData.prestudydata.questions[0].question_group }}</div>

            <div class="col-12">
                <div v-for="question in preStudyData.prestudydata.questions" :id="'qustion_' + question.id"
                    class="float-start col-6 border-top">

                    <div class="card card-body border-0 input-group p-2">
                        <div>
                            <p class="me-2 text-muted card-header"><b>{{ question.label
                            }}</b></p>
                            <p v-if="question.answer != null && question.answer != ''" class="me-2 text-muted card-header">
                                <b class="text-dark">{{
                                    question.answer }}</b>
                            </p>
                            <p v-else class="me-2 text-muted card-header"><br /> </p>
                        </div>

                        <div class="ps-5 pt-2">
                            <TextBox v-if="question.type == 'text'" v-model="question.answer" :key="'text_' + question.id"
                                :id="'text_' + question.id" @input="e => (setVariables(question.label, e, null))"
                                class="mb-2 pe-5" :selected="question.answer" />

                            <SelectBox v-else-if="question.type == 'select'" v-model="question.answer"
                                :key="'select_' + question.id" :id="'select_' + question.id" :options="question.options"
                                @input="e => question.answer = e" class="mb-2 pe-5" :selected="question.answer" />

                            <DatalistBox v-else-if="question.type == 'datalist'" v-model="question.answer"
                                :key="'datalist_' + question.id" :id="'datalist_' + question.id" :options="question.options"
                                :currentValue="question.answer" @input="e => (setVariables(question.label, e, null))"
                                class="mb-2 pe-5" />

                            <RadioButtonGroup v-else-if="question.type == 'radioButton'" v-model="question.answer"
                                :options="question" @input="e => (setVariables(question.label, e, null))" class="mb-2 pe-5"
                                :selected="question.answer" :name="'qustion_' + question.id"/>

                            <NumberBox v-else-if="question.type == 'number'" min="0" v-model="question.answer"
                                @input="e => (setVariables(question.label, e, null))" class="mb-2 pe-5"
                                :selected="question.answer" />

                            <div v-if="question.expand && question.answer == 'yes'">
                                <!-- Expand question [TODO] make this component with props and pass preStudy as a prop -->
                                <TextBox v-model="preStudyData.prestudydata.subquestions[question.expand_to - 1].answer"
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
                        <div v-for="a in preStudyData.prestudydata.questions">
                            <div class="col-8 float-end text-left border-top"> {{ a.label }}</div>
                            <div class="col-4 text-end border-top pe-5">
                                <div v-if="a.answer == null || a.answer == ''">
                                    <br />
                                    <div
                                        v-if="a.expand && (preStudyData.prestudydata.questions[a.expand_to] == null || preStudyData.prestudydata.questions[a.expand_to] == '')">
                                        <br />
                                    </div>

                                </div>
                                <div v-else> <b>{{ a.answer }}</b>
                                    <div
                                        v-if="a.expand && preStudyData.prestudydata.questions[a.expand_to] != null && preStudyData.prestudydata.questions[a.expand_to] != ''">
                                        <b>{{
                                            preStudyData.prestudydata.subquestions.find(e => e.id =
                                                a.expand_to).answer }}</b>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <!-- <div class="card-body">
                    <div class="ps-3 pe-5" v-for="a in preStudyData.prestudydata.questions">
                        <span class=""
                            :class="(a.id % 2 == 0) ? 'bg-light col-7 float-end border-bottom' : 'col-7 float-end border-bottom'">{{
                                a.label }}</span>
                    <div class="float-start col-5 border-bottom">
                        <span v-if="a.answer != null"><b :class="(a.id % 2 == 0) ? 'bg.light pe-5' : 'pe-5'">{{ a.answer
                        }}</b></span>
                        <span v-else><b :class="(a.id % 2 == 0) ? 'bg.light pe-5' : 'pe-5'"> -- </b></span>
                        <span v-if="a.expand && preStudyData.prestudydata.questions[a.expand_to] != null && preStudyData.prestudydata.questions[a.expand_to] != ''"><br /><b
                                :class="(a.id % 2 == 0) ? 'bg.light pe-5' : 'pe-5'">{{
                                    preStudyData.prestudydata.subquestions.find(e => e.id =
                                        a.expand_to).answer }}</b><br /></span>
                    </div>
                    </div>
                </div> -->
                <div class="m-2 ps-1">
                    <SubmitButtons :labelOk=labelOk :labelReset=labelReset :labelNo=labelNo @selected="action"
                        class="d-flex flex-column justify-content-center align-items-center ps-1 pe-1" />
                </div>
            </div>
        </div>
    </form>
</template>
