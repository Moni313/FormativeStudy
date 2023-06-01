<script setup>
const selected = ["first", "second", "third", "Bla bla"]
</script>
<template>
    <section class="border-end pe-3 border-top pt-2">
        <h5>Selected</h5>
        <ul v-for="v in selected" :key="v" class="list-group">
            <li class="list-group-item"> {{ v }}</li>
        </ul>

    </section>
</template>