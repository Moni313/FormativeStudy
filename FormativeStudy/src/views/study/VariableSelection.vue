<script setup>
import { ref, watch, reactive, inject } from 'vue';
import SubmitButtons from '../../components/SubmitButtons.vue';

import { useCategoryStore } from '../../stores/study.store'
const cat = useCategoryStore()
const category = reactive(cat);


const emit = defineEmits(['closeArea', 'updateOption']);
//buttons variables
const labelNo = 'Close';
const labelOk = 'View Selected';
const labelReset = 'Reset';

let datalistSelectionModel = ref()

function emitSelection(e, from) {
    //obj e of datalist is different from obj e from checkbox we need to set the actualId properly 
    let actualId = null;
    if (from == "datalist") {
        let eSplit = e.split(/ (.*)/s);
        actualId = eSplit[0]
    }
    else {
        actualId = e.id
    }
    category.updateOption(actualId, category.category.options);

    datalistSelectionModel = "";
}

watch(() => category.options, (n) => {
    console.log("watching category, value changed:", n)
})


// let filter = ref("");
// function filterOption(event) {
//     if (event.data == null) filter.value = "";
//     else filter = filter.value + event.data
//     console.log(filter)
// }

function showOption(index) {
    console.log(category.showCheckBoxNumber)
    if (index < category.showCheckBoxNumber) return true
    else return false
}
</script>

<template>
    <div v-if="category.showOptions">
        <h4>{{ category.category.label }} <span class="h6"> ({{ category.options
        }})</span></h4>

        <!-- datalist -->
        <div class="float-start">
            <input class="form-control " list="vars" id="varsInput" name="vars" v-model="datalistSelectionModel"
                placeholder="Type to search..." @keydown.enter="emitSelection($event.target.value)" @input="filterOption"
                @change="emitSelection($event.target.value, 'datalist')">

            <datalist id="vars">
                <option id="0" value=""></option>
                <option v-for="opt in category.options.state" :id=opt :key=opt.id>
                    <span v-if="opt?.id && opt?.id" class="h5">{{
                        opt.id
                    }}</span> {{ opt.label }} <span v-if="opt.checked"> [X] </span>
                </option>
            </datalist>

            <br />

            <!-- checkbox -->
            <div v-for="(option, index) in category.options.state">
                <label v-if="showOption(index)" :for="option.id">
                    <input type="checkbox" :checked="option.checked" :value="option.id" :id="option.id"
                         name="radio-input"
                        @change="emitSelection({ 'id': $event.target.value, 'label': option.label }, 'checkbox')" />

                    <span v-if="option?.id" class="sm ms-1"> {{ option.id }}</span> {{
                        option.label }}
                </label>
            </div>

            <br />
            <SubmitButtons class="btn-group m-2" :labelNo=labelNo :labelOk=labelOk :labelReset=labelReset
                @selected="e => ($emit('closeArea', false))">
            </SubmitButtons>

        </div>
    </div>
</template>