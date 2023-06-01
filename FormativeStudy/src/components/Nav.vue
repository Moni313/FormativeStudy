<script setup>
import { useAuthStore } from '../stores';
const authStore = useAuthStore();
</script>

<template>
    <nav v-show="authStore.user" class="navbar navbar-expand navbar-dark bg-dark">
        <div class="navbar-nav">
            <router-link to="/" class="nav-item nav-link">Home</router-link>
            <router-link v-if="authStore.user != null && authStore.user.username == 'mo313'" to="/users" class="nav-item nav-link">Users</router-link>
            <button class="btn btn-dark btn-sm" v-on:click="authStore.logout">Logout</button>
        </div>
    </nav>
</template>