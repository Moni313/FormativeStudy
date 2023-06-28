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
    sel.value.forEach((element, index) => {
        element.orderChecked = index +1
    })

    endTask.value = true
}

function NextTask(){
    console.log("task completed");
    emit('nextTask')
}
</script>

<template>
    <!-- <div v-if="!endTask"> -->
        <h3 class="mt-5">Please sort from the most to the least important using drag and drop</h3>
        <draggable v-model="sel" tag="ul" itemKey="draggable" class="list-group" :animation="300">
            <template #item="{ element: sel }">
                <li class="list-group-item d-flex justify-content-between align-items-center"> [{{ sel.orderChecked }}] {{
                    sel.label }}</li>
            </template>

        </draggable>
        <br />
        <button class="btn btn-outline-success" v-on:click="save()">Save order</button>

    <!-- </div>
    <div v-else class="mt-5"> -->
        <h5>This task is completed. Thank you.
            <button class="btn btn-outline-primary" v-on:click="NextTask()">Next</button>
        </h5>
    <!-- </div> -->
</template>