<script setup>
const props = defineProps({
    'starting': {
        required: true,
        type: Boolean,
    }
}
)
</script>
<template>
    <article v-if="props.starting" class="m-3 h5">
        <p>Please search for variables from the "Vital Signs", "Labs", "Medications" buttons.</p>
    </article>
    <article v-else>
        <p class="ms-3">
            <b>Undecided?</b> You can:
        <ol class="list-group ms-3">
            <li>View the <b>next timeframe</b>: select the button "Next" (all variables will be updated)
            </li>
            <li><b>Compare</b> two variables: select the first variable from the "View Var" button and the
                second from the "Compare" button</li>
            <li><b>Pick</b> another variable from "Vital Signs", "Labs", "Medications"</li>
        </ol>
        </p>
    </article>
</template>