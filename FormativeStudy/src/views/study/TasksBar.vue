<script setup>
const props = defineProps(['actualTask', 'totalTasks']);
</script>
<template>
    <section>
        <p>Task {{ actualTask }}/{{ totalTasks }}
            <span v-for="ico in totalTasks">
            <i v-if="ico < actualTask" class="bi bi-balloon-heart-fill" style="color:green"></i>
            <i v-if="ico == actualTask" class="bi bi-balloon-heart-fill" style="color:rgb(255, 174, 0)"></i>
            <i v-if="ico > actualTask" class="bi bi-balloon-heart"></i>
        </span>
        </p>
    </section>
</template>