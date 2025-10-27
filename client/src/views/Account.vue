<script setup lang="ts">
import { useSessionUser } from '../store/useSessionUser';
import { computed } from 'vue';
import type { Profile } from '../types/Profile';

//get user from the store
const sessionUserStore = useSessionUser();
const profile = computed<Profile | null>(() => sessionUserStore.profile);

</script>


<template>
    <section class="flex flex-col gap-2">
        <h1>Hello {{ profile?.display_name ?? 'User' }}</h1>
        <div class="avatar">
            <div class="w-24 rounded">
                <img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" />
            </div>
        </div>
        <button class="btn btn-primary w-fit">Change Avatar</button>
    </section>
</template>