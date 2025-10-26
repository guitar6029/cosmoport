<script lang="ts" setup>
import { Sun, Moon } from 'lucide-vue-next';
import { watchEffect, ref } from 'vue';


const theme = ref<'light' | 'abyss'>('light')

watchEffect(() => {
    document.documentElement.setAttribute('data-theme', theme.value)
})

function toggleTheme() {
    theme.value = theme.value === 'light' ? 'abyss' : 'light'
}
</script>

<template>
    <button @click="toggleTheme()" class="btn bg-base-200 w-fit">
        <Sun v-if="theme === 'abyss'" class="w-6 h-6" />
        <Moon v-else class="w-6 h-6" />
    </button>
</template>