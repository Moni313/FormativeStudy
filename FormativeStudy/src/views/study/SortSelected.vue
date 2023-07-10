<script setup>
import { ref } from 'vue';
import draggable from 'vuedraggable';
import { useCategoryStore } from '../../stores/study.store';
import { utilitiesStore } from '../../stores/utilities.store';

const emit = defineEmits(['nextTask'])

const utilities = utilitiesStore();

const selected = useCategoryStore();
console.log("Sorting all selected: ", selected.allSelected);
const sel = ref(selected.allSelected);
selected.getAllSelected();
const endTask = ref(false);

//to save the new order of variables and exit from the task
function Save() {
    console.log("Save new order and Exit");
    endTask.value = true;
}

//emit to infomr of getting the next task/post study
function NextTask() {
    console.log("task completed");
    emit('nextTask')
}

//to change thw style of the draggable item
function startEvent(evt){
    console.log("start event: ", evt.item)
	return (evt.item.style ='font-weight: bold; color: blue; font-size: 1.25em;');
}
//to reset the style of the draggable item
function endEvent(evt){
    console.log("end event: ", evt)
    sel.value.forEach((element, index) => {
        element.orderChecked = index + 1
    })
    return (evt.item.style='');
}
</script>

<template>
    <div v-if="!endTask">
    <h3 class="mt-5">Please sort from the most to the least important using drag and drop</h3>
    <draggable v-model="sel" tag="ul" class="list-group" itemKey="draggable" :animation="300" @start="startEvent" @end="endEvent" ghost-class="ghost">
        <template #item="{ element: sel }">
            <li class="list-group-item d-flex justify-content-between align-items-center w-75"> [{{ sel.orderChecked }}] {{
                sel.label }}</li>
        </template>

    </draggable>
    <br />
    <button class="btn btn-outline-success" @click="Save()">Save and Exit</button>

    </div>
    <div v-else class="mt-5">
    <h5>This task is completed. Thank you.
        <button class="btn btn-outline-primary" @click="NextTask()">Next</button>
    </h5>
    </div>
</template>