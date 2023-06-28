<script setup>
import { toRefs, watch } from 'vue';
const props = defineProps(['selected'])

const sel = toRefs(props.selected)

watch(() => sel, (n, o) => {
    console.log("sel in AllSelected",n)
}, {deep: true})

</script>
<template>
    <section>{{ sel }}
        <div v-for="s in sel"> {{ s.label }}</div>
    </section>
</template>
