<script setup>

defineProps(['labelOk', 'labelNo', 'labelReset'])
defineEmits(['selected'])

</script>

<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="btn-group">

                <button v-if="labelOk != null" class="btn btn-outline-success btn-sm float-end"
                    v-on:click="$emit('selected', labelOk)">{{
                        labelOk
                    }}</button>

                <button v-if="labelReset != null" class="btn btn-outline-secondary btn-sm float-end"
                    v-on:click="$emit('selected', labelReset)">{{ labelReset }}</button>

                <button v-if="labelNo != null" class="btn btn-outline-danger btn-sm float-end"
                    v-on:click="$emit('selected', labelNo)">{{ labelNo }}</button>
            </div>
        </div>
    </div>
</template>