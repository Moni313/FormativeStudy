<script setup>
const props = defineProps(['categories'])

console.log("VarSearch.vue: props categories", props.categories)


</script>
<template>
        <div class="btn-group-vertical">
                <button v-for="b in props.categories" :id=b.id
                        :class="props.categories.indexOf(b) < 1 ? b.class : b.class + ' mt-1'"
                        v-on:click="$emit('searchFor', b)">
                        <span class="float-start">{{ b.label }}</span>
                        <i :class=b.iconClass></i></button>
        </div>
</template>