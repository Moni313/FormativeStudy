<script setup>
import { ref, toRef, inject, watch } from 'vue';
import SubmitButtons from '../../components/SubmitButtons.vue';
import axios from 'axios';
import { useAsyncState } from '@vueuse/core';

const props = defineProps({
    'category': {
        required: true,
        type: Object,
        default: []
    },
    'showCheckBoxNumber': {
        required: false,
        default: 10
    },
});

const emitter = inject('emitter');
const emit = defineEmits(['closeArea', 'updateCategory']);

console.log('VariableSelection: ', props.category)
let url = "/" + props.category.options;

let { state, isReady } = useAsyncState(async () => {
    return await axios.get(url).then(t => t.data)
})

watch(props, (n, o) => {
    url = n.category.options;
    console.log("url in watch: ", url);

    ({ state, isReady } = useAsyncState(async () => {
        return await axios.get(url).then(t => t.data)
    }))
})

const labelNo = 'Close';
const labelOk = 'View Selected';
const labelReset = 'Reset';

//to keep the order of selection
//let orderWithDeleted = countSelected();
function countSelected() {
    if (isReady) {
        let c = 0;
        console.log("state.value ", state)
        state.forEach(e => {
            if (e.checked) c = c + 1;
        })
        return c;
    }
};


const emitSelection = async (e) => {
    console.log("emitSelection: ", e);
    let eSplit = e.split(/ (.*)/s);

    //console.log("state.value ", state.value)
    state.value.filter(obj => {
        if (obj.id == eSplit[0]) {
            const response = useAsyncState(async () => {
                const actualUrl = url + "/" + obj.id;
                if (obj.checked) obj.checked = false;
                else obj.checked = true;
                console.log("VariableSelection.vue: updating: ", actualUrl, " -> ", obj);
                return await axios.patch("" + actualUrl, obj)
            })
            console.log("Response is ready?", response)
            if (response.isReady) {
                emitter.emit('updateCategory', true);
            }
        }
    })
    orderWithDeleted = orderWithDeleted + 1;
    datalistSelectionModel = "";


    // orderWithDeleted = orderWithDeleted + 1;
    // datalistSelectionModel = '';
}

function emitSelectionFromCheckBox(e) {
    state.value.filter(obj => {
        if (obj.id == e.id) {
            const response = useAsyncState(async () => {
                const actualUrl = url + "/" + obj.id;
                if (obj.checked) obj.checked = false;
                else obj.checked = true;
                obj.orderChecked = orderWithDeleted; 
                console.log("VariableSelection.vue: updating from checkbox: ", actualUrl, " -> ", obj);
                return await axios.patch("" + actualUrl, obj)
            })
            console.log("Response is ready?", response)
            if (response.isReady) emitter.emit('updateCategory', true);
        }
    });

    orderWithDeleted = orderWithDeleted + 1;
    datalistSelectionModel = '';
}

let datalistSelectionModel = ref()
</script>

<template>
    <h4 :class="props.category.color">{{ props.category.label }} <span v-if="isReady" class="h6"> ({{ state.length
    }})</span></h4>


    <!-- datalist -->
    <div class="float-start">
        <input class="form-control " list="vars" id="varsInput" name="vars" v-model="datalistSelectionModel"
            placeholder="Type to search..." @input="" @keydown.enter="emitSelection($event.target.value)"
            @change="emitSelection($event.target.value)">

        <datalist id="vars">
            <option id="0" value=""></option>
            <option v-for="opt in state" :id=opt :key=opt.id>
                <span v-if="opt?.id && opt?.id" class="h5">{{
                    opt.id
                }}</span> {{ opt.label }} <span v-if="opt.checked"> [X] </span>
            </option>
        </datalist>

        <br />

        <div v-for="(option, index) in state">
            <label v-if="index < props.showCheckBoxNumber" :for="option.id">
                <input type="checkbox" :checked="option.checked" :value="option.id" :id="option.id"
                    v-model="datalistSelectionModel" name="radio-input"
                    @change="emitSelectionFromCheckBox({ 'itemid': $event.target.value, 'label': option.label })" />

                <span v-if="option?.id" class="sm ms-1"> {{ option.id }}</span> {{
                    option.label }}
            </label>
        </div>

        <br />
        <SubmitButtons class="btn-group m-2" :labelNo=labelNo :labelOk=labelOk :labelReset=labelReset
            @selected="e => ($emit('closeArea', e))">
        </SubmitButtons>



        <div>category<br />
            <p v-for="c in props.category.options"><span v-if="c.checked">{{ c }}</span></p>
        </div>

    </div>
</template>