import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import { router } from './router';

import mitt from 'mitt';
const emitter = mitt();

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'bootstrap-icons/font/bootstrap-icons.css'

// setup fake backend
import { fakeBackend } from './helpers';
fakeBackend();

const app = createApp(App);
app.use(router);
app.use(createPinia());

app.provide('emitter', emitter);
app.mount('#app');