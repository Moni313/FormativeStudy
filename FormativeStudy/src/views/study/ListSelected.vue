<script setup>
import { inject, watch } from 'vue';
import axios from 'axios';
import { useAsyncState } from '@vueuse/core';

const props = defineProps(['apiUrl', 'label'])

const url = "/" + props.apiUrl;

let { state, isReady } = useAsyncState(async () => {
    return await axios.get('' + url).then(t => t.data)
}, { id: null })

if (isReady) {
    console.log("First State in ListSelected", state)

}

const emitter = inject('emitter');

emitter.on('updateCategory', (update) => {
    if (update) {
        state = useAsyncState(async () => {
            let x = await axios.get('' + url).then(t => t.data)
            console.log("after emittter in listSelected", x)
            return x
        })
    }
})


function remove(event) {
    console.log("remove from list", event)
    state.value.filter(obj => {
        if (obj.id == event) {
            const response = useAsyncState(async () => {
                const actualUrl = url + "/" + obj.id;
                obj.checked = false;
                return await axios.patch("" + actualUrl, obj)
            })
            console.log("Response is ready?", response)
            if (response.isReady) {
                emitter.emit('updateCategory', true);
                if (control) control = false
                else control = true
            }
        }
    })
}
</script>
<template>
    <section class="border-end pe-3 border-top pt-2">
        <p>{{ props.label }}</p>
        <div v-if="isReady">
            <div v-for="option in state">
                <div v-if="option.checked" class="input-group mb-1">
                    <span :class="'input-group-prepend input-group-text ' + option.color"> {{ option.orderChecked }}</span>
                    <span class="form-control"> {{ option.label }}</span>
                    <button class=" input-group-append btn btn-outline-danger input-group-text"
                        @click="remove(option.id)">X</button>
                </div>
            </div>
        </div>
    </section>
</template>