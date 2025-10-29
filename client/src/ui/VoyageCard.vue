<script setup lang="ts">
import type { Voyage } from '../types/Voyage';
defineProps<{
    voyage: Voyage
}>()
</script>

<template>
    <div class="card card-xl card-border bg-base-100 w-96 shadow-sm">
        <figure>
            <img :src="voyage.imageUrl" :alt="voyage.description" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">{{ voyage.name }}</h2>
            <p>{{ voyage.description }}</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">More Info</button>
            </div>
        </div>
    </div>
</template>