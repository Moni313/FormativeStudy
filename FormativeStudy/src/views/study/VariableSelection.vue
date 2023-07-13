<script setup>
import { ref, watch, reactive, inject } from 'vue';
import { useAsyncState } from "@vueuse/core";
import axios from "axios";
import { useCategoryStore } from '../../stores/study.store'

const cat = useCategoryStore();
const category = reactive(cat);

const emitter = inject('emitter');
const emit = defineEmits(['updateCategory']);


let datalistSelectionModel = ref()

function emitSelection(e, from) {
    //obj e of datalist is different from obj e from checkbox we need to set the actualId properly 
    let actualId = null;
    if (from == "datalist") {
        let eSplit = e.split(/ (.*)/s);
        actualId = eSplit[0]
    }
    else {
        actualId = e.id
    }
    console.log("VariableSelection -> update actualid", actualId)
    category.updateOption(actualId, category.category.options);
    emitter.emit('updateCategory', true);

    datalistSelectionModel = "";
}

emitter.on('updateCategoryfromSelected', (update) => {
    if (update) {
        //console.log("VariableSelection -> updateCategoryfromSelected", category.category.options)
        const url = "/" + category.category.options;
        const opt = useAsyncState(async () => {
            console.log("AXIOS in Variable Selection ", url)
            return axios.get("" + url).then((t) => t.data)
        })
        if (opt.isReady) {
            //console.log(" category.options.state", category.options.state)
            //console.log("opt", opt.state)
            category.options.state = opt.state
        }
    }
})

watch(() => category.options, (n) => {
    console.log("VariableSelection -> watching category, value changed:", n)
}, { deep: true })


</script>

<template>
    <div v-if="category.showOptions">
        <h4>{{ category.category.label }} <span class="h6"></span></h4>

        <!-- datalist -->
        <input list="vars" id="varsInput" name="vars" v-model="datalistSelectionModel" placeholder="Type to search..."
            @keydown.enter="emitSelection($event.target.value)" @change="emitSelection($event.target.value, 'datalist')">

        <datalist id="vars">
            <option id="0" value=""></option>
            <option v-for="opt in category.options.state" :id=opt :key=opt.id>
                <span v-if="opt?.id && opt?.id" class="h5">{{
                    opt.id
                }}</span> {{ opt.label }} <span v-if="opt.checked"> [X] </span>
            </option>
        </datalist>


        <!-- checkbox -->
        <div class="row mt-5">
            <div class="col-12">

                <label v-for="option in category.options.state" :for="option.id" class="col-4">
                    <input type="checkbox" :checked="option.checked" :value="option.id" :id="option.id"
                        name="checkbox-input"
                        @change="emitSelection({ 'id': $event.target.value, 'label': option.label }, 'checkbox')" />

                    <span v-if="option?.id" class="sm ms-1"> {{ option.id }}</span> {{
                        option.label }}

                </label>
            </div>
        </div>
    </div>
</template>