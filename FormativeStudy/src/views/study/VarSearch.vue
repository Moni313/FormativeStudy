<script setup>
import { computed } from 'vue';
const props = defineProps(['categories'])

console.log("VarSearch.vue: props categories", props.categories)

function classButton(b) {
        return props.categories.indexOf(b) < 1 ? b.class : b.class + ' mt-1'
}

</script>
<template>
        <div class="btn-group-vertical">
                <button v-for="b in props.categories" :id=b.id
                        :class="classButton(b)"
                        v-on:click="$emit('searchFor', b)">
                        <span class="float-start">{{ b.label }}</span>
                        <i :class=b.iconClass></i></button>
        </div>
</template>

<!-- This component will create button with categoris listed in the database

[
{
"id": "VitalsCat",
"label": "Vital Signs",
"class": "btn btn-primary",
"color": "text-primary",
"iconClass": "bi bi-search-heart btn-outline-primary float-end  ms-2",
"options": "optionsVitalsCategory"
},
{
"id": "LabsCat",
"label": "Labs",
"class": "btn btn-danger mt-1",
"color": "text-danger",
"iconClass": "bi bi-search-heart btn-outline-primary float-end  ms-2",
"options": "optionsLabsCategory"
},
{
"id": "MedicationCat",
"label": "Medications",
"class": "btn btn-secondary mt-1",
"color": "text-secondary",
"iconClass": "bi bi-search-heart btn-outline-primary float-end ms-2",
"options": "optionsMedicationsCategory"
}
]
-->