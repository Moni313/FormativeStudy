<script setup>
import DatalistBox from '../../components/DatalistBox.vue';
import SubmitButtons from '../../components/SubmitButtons.vue';
import CheckBoxGroup from '../../components/CheckBoxGroup.vue';
import { ref } from 'vue';


const props = defineProps({
  'category': {
    required: true,
    type: Object,
    default: ""
  },
  'showCheckBoxNumber': {
    required: false,
    default:10
  },
});

defineEmits(['closeArea'])

let lastSelection = ""
let allSelection = ref([])
let allSelectedWithDeleted = []
let orderWithDeleted = 1
const labelNo = 'Close';
const labelOk = 'View Selected';
const labelReset = 'Reset';

console.log(props.category)

function add(e) {
  console.log("Selected object: ", e);
  console.log("allSelection: ", allSelection.value);
  lastSelection = e
  //do nothing if empty string

  if (e == '' || e == null) return;


  let eSplit = e.split(/ (.*)/s)
  //check if obj already in array, delete it
  let sizeSelected = allSelection.value.length;
  allSelection.value = allSelection.value.filter(function (obj) {
    return obj.itemid != eSplit[0];
  });
  if (allSelection.value.length == sizeSelected) { //add to array

    allSelection.value.push({ 'order': orderWithDeleted, 'name': eSplit[1], 'itemid': eSplit[0], 'color': props.category.color });
    //this keeps track to all the selected variables
    allSelectedWithDeleted.push({ 'order': orderWithDeleted, 'name': eSplit[1], 'itemid': eSplit[0], 'color': props.category.color });
  }

  orderWithDeleted = orderWithDeleted + 1;
}

function addFromCheckBox(e) {
  let sizeSelected = allSelection.value.length;
  allSelection.value = allSelection.value.filter(function (obj) {
    return obj.itemid != e.itemid;
  });
  if (allSelection.value.length == sizeSelected) { //add to array
    allSelection.value.push({ 'order': orderWithDeleted, 'name': e.name, 'itemid': e.itemid, 'color': props.category.color });
    //this keeps track to all the selected variables
    allSelectedWithDeleted.push({ 'order': orderWithDeleted, 'name': e.name, 'itemid': e.itemid, 'color': props.category.color });
  }

  orderWithDeleted = orderWithDeleted + 1;
}


</script>
<template>
  <section>
    <h4 :class="props.category.color">{{ props.category.label }} <span class="h6"> ({{ props.category.options.length
    }})</span></h4>
    <DatalistBox v-model="lastSelection" :id="props.category.id" :options="props.category.options" @input="add">
    </DatalistBox>

    <CheckBoxGroup :options="category" @input="addFromCheckBox" :showCheckBoxNumber=props.showCheckBoxNumber :allSelection="allSelection"></CheckBoxGroup>
    <SubmitButtons :labelNo=labelNo :labelOk=labelOk :labelReset=labelReset @selected="e => ($emit('closeArea', e))">
    </SubmitButtons>
    {{ allSelection }}
    <p>{{ allSelectedWithDeleted }}</p>
  </section>
</template>