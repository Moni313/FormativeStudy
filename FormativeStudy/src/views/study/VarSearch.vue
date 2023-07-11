<script setup>
const props = defineProps(['categories']);
const emit = defineEmits(['searchFor', 'updateCategory', 'variableSelected']);

import { useCategoryStore } from '../../stores/study.store'
const category = useCategoryStore();

console.log("VarSearch.vue -> props categories", props.categories)

function classButton(b) {
        return props.categories.indexOf(b) < 1 ? b.class : b.class + ' mt-1'
}

//TODO this empty variableSelected must be something define globaly
function setCategory(b){
        console.log("VarSearch set category ", category)
        category.setCategory(b)
        emit('variableSelected', {id: null, label: null, checked: null, orderChecked: null, fluid: null, category: null })
}

</script>
<template>
        <div class="btn-group-vertical">
                <button v-for="b in props.categories" :id=b.id :class="classButton(b)" :style="b.style"
                        v-on:click="setCategory(b)">
                        <span class="float-start">{{ b.label }}</span>
                        <i :class=b.iconClass></i></button>
        </div>
</template>
