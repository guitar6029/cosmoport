<script setup lang="ts">
import { useSessionUser } from '../store/useSessionUser';
import { onMounted } from 'vue';

</script>


<template>
    <section class="flex flex-col gap-2">
        <h1>Account</h1>
        <div class="avatar">
            <div class="w-24 rounded">
                <img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" />
            </div>
        </div>
    </section>
</template>