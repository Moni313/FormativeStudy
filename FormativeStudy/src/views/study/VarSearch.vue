<script setup>
const props = defineProps(['categories'])

console.log("props in VarSearch", props.categories)

// let cats = [
//         {
//                 category: 'vitals', values: {
//                         id: 'VitalsCat',
//                         label: "Vital Signs",
//                         class: 'btn btn-primary',
//                         color: 'text-primary',
//                         iconClass: 'bi bi-search-heart btn-outline-primary float-end  ms-2',
//                         options: [],
//                         selected: []
//                 }
//         },
//         {
//                 category: 'labs', values: {
//                         id: 'LabsCat',
//                         label: "Labs",
//                         class: 'btn btn-danger mt-1',
//                         color: 'text-danger',
//                         iconClass: 'bi bi-search-heart btn-outline-primary float-end  ms-2',
//                         options: [{
//                                 "itemid": 50801,
//                                 "label": "Alveolar-arterial Gradient",
//                                 "fluid": "Blood",
//                                 "category": "Blood Gas"
//                         },
//                         {
//                                 "itemid": 50802,
//                                 "label": "Base Excess",
//                                 "fluid": "Blood",
//                                 "category": "Blood Gas"
//                         },
//                         {
//                                 "itemid": 50803,
//                                 "label": "Calculated Bicarbonate, Whole Blood",
//                                 "fluid": "Blood",
//                                 "category": "Blood Gas"
//                         },
//                         {
//                                 "itemid": 50804,
//                                 "label": "Calculated Total CO2",
//                                 "fluid": "Blood",
//                                 "category": "Blood Gas"
//                         }],
//                         selected: []
//                 }
//         },
//         {
//                 category: 'Medication', values: {
//                         id: 'MedicationCat',
//                         label: "Medications",
//                         class: 'btn btn-secondary mt-1',
//                         color: 'text-secondary',
//                         iconClass: 'bi bi-search-heart btn-outline-primary float-end ms-2',
//                         options: [],
//                         selected: []
//                 }
//         },
// ]

// console.log("Cats", cats)

</script>
<template>
        <div class="btn-group-vertical">
                <button v-for="b in props.categories" :id=b.category
                        :class="props.categories.indexOf(b) < 1 ? b.values.class : b.values.class + ' mt-1'"
                        v-on:click="$emit('searchFor', b.values)">
                        <span class="float-start">{{ b.values.label }}</span>
                        <i :class=b.values.iconClass></i></button>
        </div>
</template>