<script setup>
import { ref } from 'vue';
import draggable from 'vuedraggable';
import { useCategoryStore } from '../../stores/study.store';

const emit = defineEmits(['nextTask'])

const selected = useCategoryStore();
const sel = ref(selected.allSelected);
const endTask = ref(false)

function save() {
    console.log(sel)
    endTask.value = true
}

function NextTask() {
    console.log("task completed");
    emit('nextTask')
}

function startEvent(evt){
    console.log("start event: ", evt.item)
	return (evt.item.style ='font-weight: bold; color: blue; font-size: 1.25em;');
}
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
    <button class="btn btn-outline-success" v-on:click="save()">Save and Exit</button>

    </div>
    <div v-else class="mt-5">
    <h5>This task is completed. Thank you.
        <button class="btn btn-outline-primary" v-on:click="NextTask()">Next</button>
    </h5>
    </div>
</template>