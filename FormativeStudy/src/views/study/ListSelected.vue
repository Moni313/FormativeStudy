<script setup>
import { watch, inject, reactive, toRefs } from 'vue';
import axios from "axios";
import { useAsyncState } from "@vueuse/core";

const props = defineProps(['c', 'compareModule', 'varCompare']);
const emit = defineEmits(['updateCategoryfromSelected', 'variableSelected'])
const category = toRefs(props, 'c');
const compare = toRefs(props, 'varCompare')

const url = "/" + category.c.value.options;
const opt = reactive(useAsyncState(async () => {
    const data = axios.get("" + url).then((t) => t.data);
    return data
}))
let options = reactive(opt);

function remove(id) {
    options.state.filter((obj) => {
        if (obj.id == id) {
            obj.checked = false;
            const response = useAsyncState(async () => {
                const actualUrl = url + "/" + id;
                return await axios.patch("" + actualUrl, obj);
            });
            if (response.isReady) {
                const opt = useAsyncState(async () => {
                    const data = axios.get("" + url).then((t) => t.data);
                    return data
                })
                options.state = opt.state;
                emitter.emit('updateCategoryfromSelected', true);
            }
        }
    })
}

function showVariable(e) {
    emit('variableSelected', e)
}

const emitter = inject('emitter');

emitter.on('updateCategory', (update) => {
    if (update) {
        const opt = useAsyncState(async () => {
            const data = await axios.get("" + url).then((t) => t.data);
            return data
        })
        options.state = opt.state
    }
})

watch(() => options.state, (n, o) => {
    console.log("n", n)
}, { deep: true })

</script>
<template>
    <section>
        <!-- <p>{{ category.c.value.label }}</p> -->
        <!-- list with only one action -->
        <div v-if="props.compareModule" v-for="option in options.state">
            <button v-if="option.checked && option.id != props.varCompare" :class="category.c.value.class"
                :style="category.c.value.color" @click="showVariable(option)"> {{
                    option.label }}</button>
        </div>

        <!-- list with remove and select action -->
        <div v-else>
            <div v-for="option in options.state">
                <div v-if="option.checked" class="input-group mb-1">
                    <span :class="'input-group-prepend input-group-text sm' + option.color"> {{ option.orderChecked
                    }}</span>
                    <button :class="'form-control text-start ' + category.c.value.class" :style="category.c.value.color"
                        @click="showVariable(option)"> {{
                            option.label }}<i class="bi bi-graph-up float-end"></i></button>
                    <button class="input-group-append btn btn-outline-danger input-group-text"
                        @click="remove(option.id, option)">X</button>
                </div>
            </div>
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
