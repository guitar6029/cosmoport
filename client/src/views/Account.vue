<script setup lang="ts">
import { useSessionUser } from '../store/useSessionUser';
import { storeToRefs } from 'pinia';
import Loading from '../ui/Loading.vue';
import { useRouter } from 'vue-router';
const router = useRouter();

// get user from the store
const sessionUserStore = useSessionUser();
const { loading, profile, displayName } = storeToRefs(sessionUserStore);

async function signOut() {
    await sessionUserStore.signOut();
    //go back to landing page
    router.push({ name: 'Home' });
}

</script>

<template>
    <!-- Show loader while session/profile is still bootstrapping -->
    <section v-if="loading" class="flex flex-col items-center justify-center gap-2">
        <Loading />
    </section>

    <!-- Show user profile once loaded -->
    <section v-else class="flex flex-col gap-4">
        <h1 class="text-2xl font-semibold">
            Hello {{ displayName ?? 'User' }}
        </h1>

        <figure class="avatar">
            <div class="w-24 rounded">
                <img :src="profile?.avatar_url || 'https://img.daisyui.com/images/profile/demo/batperson@192.webp'"
                    alt="User avatar" />
            </div>
        </figure>

        <button class="btn btn-primary w-fit">Change Avatar</button>

        <article>
            <h2 class="text-lg font-medium">User Role</h2>
            <div class="badge badge-primary capitalize">
                {{ profile?.role ?? 'User' }}
            </div>
        </article>

        <article>
            <button class="w-fit btn btn-primary" @click="signOut()">Sign Out</button>
        </article>
    </section>
</template>
