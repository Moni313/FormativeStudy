<script setup>
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
import { useCategoryStore } from '../../stores/study.store';

const props = defineProps(['c'])
const category = useCategoryStore();
let opt = category.getOptions(props.c);
const options = storeToRefs(opt);
console.log("1 options", options);
function remove(id, obj) {
    category.remove(id, obj, props.c.options);
}

watch(() => options, (n) => {
    console.log(n, " value changed")
}, { deep: true });

</script>
<template>
    <section>
        <div>
            <div v-if="options.isReady">
                <p>{{ props.c.label }}</p>
                <div v-for="option in options.state.value">
                    <div v-if="option.checked" class="input-group mb-1">
                        <span :class="'input-group-prepend input-group-text ' + option.color"> {{ option.orderChecked
                        }}</span>
                        <span class="form-control" :style="props.colorText"> {{ option.label }}</span>
                        <button class=" input-group-append btn btn-outline-danger input-group-text"
                            @click="remove(option.id, option)">X</button>
                    </div>
                </div>
            </div>
            <div v-else> Loading...</div>
        </div>
    </section>
</template>

<!-- 
    options from database look like:

    http://localhost:3001/optionsLabsCategory

    [
{
"id": 50801,
"label": "Alveolar-arterial Gradient",
"checked": true,
"orderChecked": 0,
"fluid": "Blood",
"category": "Blood Gas"
},
{
"id": 50802,
"label": "Base Excess",
"checked": true,
"orderChecked": -1,
"fluid": "Blood",
"category": "Blood Gas"
},
...
...
{
"id": 50803,
"label": "Calculated Bicarbonate, Whole Blood",
"checked": false,
"orderChecked": -1,
"fluid": "Blood",
"category": "Blood Gas"
},
]
 -->