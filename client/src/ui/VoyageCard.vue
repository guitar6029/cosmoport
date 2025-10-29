<script setup lang="ts">
import type { Voyage } from '../types/Voyage';
import { Eclipse } from 'lucide-vue-next';
import { getDifficultyClass } from '../utils/difficultyUtils'

defineProps<{
    voyage: Voyage
}>();

defineEmits<{
    (e: 'view-voyage-details', voyage: Voyage): void
}>();



</script>

<template>
    <div class="card card-xl card-border bg-base-100 w-96 shadow-sm">
        <figure>
            <img :src="voyage.imageUrl" :alt="voyage.description"
                class="transition-transform duration-300 ease-in-out hover:scale-125" />
        </figure>
        <div class="card-body flex flex-col gap-4">
            <h2 class="card-title">{{ voyage.name }}</h2>
            <p class="line-clamp-2">{{ voyage.description }}</p>
            <div :class="['badge badge-xl', getDifficultyClass(voyage.difficulty)]">{{ voyage.difficulty }}</div>
            <div class="flex flex-row items-center gap-2 m-2">
                <Eclipse class="w-6 h-6" />
                <span>Origin: {{ voyage.origin }}</span>
            </div>
            <div class="flex flex-row items-center gap-2 m-2">
                <Eclipse class="w-6 h-6" />
                <span>Destination: {{ voyage.destination }}</span>
            </div>
            <div class="card-actions">
                <button @click="$emit('view-voyage-details', voyage)" class="btn btn-primary">More Info</button>
            </div>
        </div>
    </div>
</template>