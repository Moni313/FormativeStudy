<script setup>
const props = defineProps({
    'selected': {
        required: true,
        type: Object,
        default: null
    }
})

function remove(e){

}
</script>
<template>
    <section class="border-end pe-3 border-top pt-2">
        <p>Selected</p>
        <div class="input-group mb-1" v-for="(v, index) in props.selected" :key="v.item">
            <span class=" input-group-prepend input-group-text"> {{ index }}</span>
            <span class="form-control"> {{ v.label }}</span>
            <button class=" input-group-append btn btn-outline-danger input-group-text" :on-click="remove">X</button>
        </div>
    </section>
</template>