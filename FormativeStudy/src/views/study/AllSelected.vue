<script setup>
import { ref, watch } from 'vue'
import { useCategoryStore } from '../../stores/study.store';
import { useVariableStore } from '../../stores/variable.store';

const emit = defineEmits(['variableSelected'])
const useCategory = useCategoryStore()
const sel = ref(useCategory.selected)

function remove(s){
    useCategory.selectedUpdate(s);
}


const varsStore = useVariableStore();
function showVariable(e) {
    varsStore.resetCompare();
    emit('variableSelected', e)
}

watch(() => sel, (n) =>{
    console.log("Update list in all selected", n)
}, {deep: true})

</script>
<template>
    <section>
        <div v-for="s in sel" class="input-group mb-1"> <span :class="'input-group-prepend input-group-text sm' + s.color"> {{
            s.orderChecked
        }}</span>
            <button :class="'form-control text-start ' "
                @click="showVariable(s)"> {{
                    s.label }}<i class="bi bi-graph-up float-end"></i></button>
            <button class="input-group-append btn btn-outline-danger input-group-text"
                @click="remove(s)">X</button>
        </div>
    </section>
</template>
