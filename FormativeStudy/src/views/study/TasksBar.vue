<script setup>
const props = defineProps(['actualTask', 'totalTasks']);
console.log("Task in Task Bar", props.actualTask)
</script>
<template>
    <section>
        <h4 class="text-center">Task {{ props.actualTask }}/{{ props.totalTasks }} </h4>
        <div class="h4 text-center">
            <span v-for="ico in totalTasks">
                <i v-if="ico < actualTask" class="bi bi-balloon-heart-fill" style="color:rgb(0, 102, 53)"></i>
                <i v-if="ico == actualTask" class="bi bi-balloon-heart-fill" style="color:rgb(48, 217, 15)"></i>
                <i v-if="ico > actualTask" class="bi bi-balloon-heart"></i>
            </span>
        </div>
    </section>
</template>