<script setup>
import { ref, toRef, computed } from 'vue';
import SubmitButtons from '../../components/SubmitButtons.vue';


const props = defineProps({
    'category': {
        required: true,
        type: Object,
        default: ""
    },
    'showCheckBoxNumber': {
        required: false,
        default: 10
    },
});

const emit = defineEmits(['closeArea', 'viewVariables', 'updateSelected']);
const labelNo = 'Close';
const labelOk = 'View Selected';
const labelReset = 'Reset';

let actualSelection = null;
let category = toRef(props, 'category');
let orderWithDeleted = props.category.selected.length;
let trackAll = ref();
trackAll = props.category.selected.slice();
console.log(typeof (trackAll));


function emitSelection(e) {
    if (e == '' || e == null) return;

    let eSplit = e.split(/ (.*)/s);

    if (props.category.selected.some(e => e.itemid === eSplit[0])) {
        // already there
        console.log("Already there");
        //TODO it does not work properly
    }
    else {
        console.log("adding new item");
        props.category.selected.push({ 'order': orderWithDeleted, 'label': eSplit[1], 'itemid': eSplit[0], 'color': props.category.color });

        emit('updateSelected', [{ 'order': orderWithDeleted, 'label': eSplit[1], 'itemid': eSplit[0], 'color': props.category.color }]);
    }

    trackAll.push({ 'order': orderWithDeleted, 'label': eSplit[1], 'itemid': eSplit[0], 'color': props.category.color });


    orderWithDeleted = orderWithDeleted + 1;
    actualSelection = '';
}

function emitSelectionFromCheckBox(e) {
    if (props.category.selected.some(a => a.itemid === e.itemid)) {
        // already there, deselect it
        props.category.selected = props.category.selected.filter(function (obj) {
            return obj.itemid != e.itemid;
        });
    }
    else {
        console.log("adding new item");
        props.category.selected.push({ 'order': orderWithDeleted, 'label': e.label, 'itemid': e.itemid, 'color': props.category.color });

        emit('updateSelected', [{ 'order': orderWithDeleted, 'label': e.label, 'itemid': e.itemid, 'color': props.category.color }]);
    }
    trackAll.push({ 'order': orderWithDeleted, 'label': e.label, 'itemid': e.itemid, 'color': props.category.color });


    orderWithDeleted = orderWithDeleted + 1;
    actualSelection = '';
}

</script>

<template>
    <h4 :class="props.category.color">{{ props.category.label }} <span class="h6"> ({{ props.category.options.length
    }})</span></h4>


    <!-- datalist -->
    <div class="float-start">
        <input class="form-control " list="vars" id="varsInput" name="vars" v-model="actualSelection"
            placeholder="Type to search..." @input="" @keydown.enter="emitSelection($event.target.value)"
            @change="emitSelection($event.target.value)">

        <datalist id="vars">
            <option id="0" value=""></option>
            <option v-for="opt in category.options" :id=opt :key=opt.itemid><span v-if="opt?.itemid" class="h5">{{
                opt.itemid
            }}</span> {{ opt.label }}</option>
        </datalist>

        <br />

        <div v-for="(option, index) in category.options">
            <label v-if="index < props.showCheckBoxNumber" :for="option.itemid">
                <input type="checkbox" :value="option.itemid" :id="option.id" v-model="actualSelection"
                    @change="emitSelectionFromCheckBox({ 'itemid': $event.target.value, 'label': option.label })"
                    name="radio-input" />

                <span v-if="option?.itemid" class="sm">{{ option.itemid }}</span> {{
                    option.label }}
            </label>
        </div>

        <br />
        <SubmitButtons class="btn-group m-2" :labelNo=labelNo :labelOk=labelOk :labelReset=labelReset
            @selected="e => ($emit('closeArea', e))">
        </SubmitButtons>



        <p>cat<br />{{ category.selected }}</p>
        <p>all<br />{{ trackAll }}</p>

    </div>
</template>