<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './ui/Navbar.vue';
</script>

<template>
  <main class="flex flex-col gap-2 min-h-screen max-h-screen overflow-hidden">
    <Navbar />
    <RouterView />
  </main>
</template>
