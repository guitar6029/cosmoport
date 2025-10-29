<script lang="ts" setup>
import { CircleUser as Account } from "lucide-vue-next"
import ThemeToggler from './ThemeToggler.vue';
import { RouterLink } from 'vue-router';
import { useSessionUser } from '../store/useSessionUser';
import { computed } from 'vue';

const sessionUserStore = useSessionUser();
const isAuthed = computed(() => sessionUserStore.isAuthed);

</script>

<template>
    <header class="nav bg-base-300">
        <nav class="flex flex-row items-center justify-between p-4">
            <div class="flex items-end gap-2">
                <RouterLink to="/">
                    <div class="text-2xl font-bold font-space">CostmoPort</div>
                </RouterLink>
                <RouterLink to="/voyages">Voyages</RouterLink>
                <!-- <RouterLink to="/about">About</RouterLink> -->
            </div>
            <div class="flex items-center gap-2">
                <RouterLink to="/login" v-if="!isAuthed">Login</RouterLink>
                <RouterLink to="/account" v-if="isAuthed">
                    <Account />
                </RouterLink>
                <RouterLink v-if="isAuthed" to="/dashboard">Dashboard</RouterLink>
                <!-- save for later when dashboard is implemented and user auth is implemented -->
                <!-- <RouterLink to="/dashnoard">Dashboard</RouterLink> -->

                <ThemeToggler />
            </div>
        </nav>
    </header>
</template>