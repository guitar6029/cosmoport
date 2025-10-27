<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './ui/Navbar.vue';
</script>

<template>
  <div class="min-h-dvh flex flex-col">
    <header>
      <Navbar />
    </header>
    <main class="flex-1 p-2 max-h-screen overflow-hidden">
      <RouterView />
    </main>
  </div>
</template>
