<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navbar from './ui/Navbar.vue';
</script>

<template>
  <div class="min-h-dvh flex flex-col gap-4">
    <header>
      <Navbar />
    </header>
    <main class="flex-1 flex flex-col items-center justify-center p-2 max-h-screen overflow-hidden">
      <RouterView />
    </main>
  </div>
</template>
