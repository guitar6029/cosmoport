<script lang="ts" setup>
import { CircleUser as Account } from "lucide-vue-next"
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
                    <div class="text-2xl font-bold font-sci-fi">CostmoPort</div>
                </RouterLink>
                <RouterLink to="/voyages" class="uppercase">Voyages</RouterLink>
                <!-- <RouterLink to="/about">About</RouterLink> -->
            </div>
            <div class="flex items-center gap-2 font-bold">
                <!-- <RouterLink to="/login" v-if="!isAuthed" class="uppercase font-sci-fi">Login</RouterLink> -->
                <RouterLink to="/account" v-if="isAuthed" class="uppercase font-sci-fi">
                    <Account />
                </RouterLink>
                <RouterLink to="/journal" class="uppercase font-sci-fi">Journal</RouterLink>
                <!-- only if the user has an ongoing voyage -->
                <RouterLink v-if="isAuthed" to="/dashboard" class="uppercase">Dashboard</RouterLink>
                <!-- save for later when dashboard is implemented and user auth is implemented -->
                <!-- <RouterLink to="/dashnoard">Dashboard</RouterLink> -->

                <!-- <ThemeToggler /> -->
            </div>
        </nav>
    </header>
</template>