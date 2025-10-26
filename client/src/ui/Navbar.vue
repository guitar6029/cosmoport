<script lang="ts" setup>
import ThemeToggler from './ThemeToggler.vue';
import { RouterLink } from 'vue-router';
</script>

<template>
    <header class="nav bg-base-300">
        <nav class="flex flex-row items-center justify-between p-4">
            <div class="text-2xl font-bold">CostmoPort</div>
            <div class="flex items-center gap-2">
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/flights">Flights</RouterLink>
                <RouterLink to="/login">Login</RouterLink>
                <!-- save for later when dashboard is implemented and user auth is implemented -->
                <!-- <RouterLink to="/dashnoard">Dashboard</RouterLink> -->
                <RouterLink to="/about">About</RouterLink>
                <ThemeToggler />
            </div>
        </nav>
    </header>
</template>