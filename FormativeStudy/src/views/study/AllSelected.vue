<script setup>
import { watch, inject, reactive, toRefs } from 'vue';
import axios from "axios";
import { useAsyncState } from "@vueuse/core";
import { useVariableStore } from '../../stores/variable.store';


const props = defineProps(['c', 'varCompare']);
const emit = defineEmits(['updateCategoryfromSelected', 'variableSelected'])
const category = toRefs(props, 'c');
const url = "/" + category.c.value.options;
const opt = reactive(useAsyncState(async () => {
    console.log("AXIOS in ListSelected: category", url);
    const data = await axios.get("" + url).then((t) => t.data)
    return data
}))
let options = reactive(opt);

const varsStore = useVariableStore();

function showVariable(e) {
    varsStore.resetCompare();
    emit('variableSelected', e)
}

const emitter = inject('emitter');

emitter.on('updateCategory', (update) => {
    if (update) {
        const opt = useAsyncState(async () => {
            console.log("AXIOS in ListSelected emitter on update category");
            const data = await axios.get("" + url).then((t) => t.data)
            return data
        })
        options.state = opt.state
    }
})

watch(() => category, (n, o) => {
    console.log("in List selected watching category", n)
}, { deep: true })
</script>
<template>
    <section :id="'section_' + category.c.value.label">
        <!-- <p>{{ category.c.value.label }}</p> -->
        <!-- list with only one action -->
        <div v-for="option in options.state">
            <button v-if="option.checked && option.id != props.varCompare" :class="category.c.value.class"
                :style="category.c.value.color" @click="showVariable(option)"> {{
                    option.label }}</button>
        </div>

        
    </section>
</template>

<!-- 
    options from database look like:

    http://127.0.0.1:3001/optionsLabsCategory

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
