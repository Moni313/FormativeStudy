<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores';
import { router } from '../router';

import Introduction from '../views/static/Introduction.vue'
import ConsentForm from './static/ConsentForm.vue';
import SubmitButtons from '../components/SubmitButtons.vue';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const agree = 'Agree';
const close = 'Close';

function prestudypage(e) {
    if (e == agree) router.push('/prestudy');
    else if (e == close) authStore.logout();
}

</script>

<template>
    <div v-if="user" class="container">
        <h1>Hi {{ user.firstName }}! <span class="h6">You're logged in the Formative Study</span></h1>

        <Introduction />
        <br />
        <ConsentForm />
        <br />
        <div class="m-2 ps-2">
            <SubmitButtons :labelOk=agree :labelNo=close @selected="prestudypage"
                class="d-flex flex-column justify-content-center align-items-center ps-1 pe-1" />
        </div>
    </div>
</template>
