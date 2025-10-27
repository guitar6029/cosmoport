<script setup lang="ts">
import { computed } from 'vue';
import { useSessionUser } from '../store/useSessionUser';

const store = useSessionUser();

const role = computed(() => store.role);

</script>


<template>
    <h1>Dashboard</h1>
    <span>User Current Role : {{ role }}</span>
</template>