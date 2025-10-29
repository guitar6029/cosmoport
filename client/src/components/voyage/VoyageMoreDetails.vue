<script lang="ts" setup>
import type { Voyage } from '../../types/Voyage';
import { getDifficultyClass } from '../../utils/difficultyUtils'
import { Clock, Eclipse } from 'lucide-vue-next';
import UiIcon from '../../ui/UiIcon.vue';

defineProps<{
    selectedVoyage: Voyage | null
}>();
</script>

<template>
    <p class="text-xl border-2 border-primary rounded-xl p-2">{{ selectedVoyage?.description }}</p>
    <div :class="['badge badge-xl', getDifficultyClass(selectedVoyage?.difficulty as Voyage['difficulty'])]">
        {{ selectedVoyage?.difficulty }}</div>
    <div class="text-xl flex items-center gap-2">
        <UiIcon :icon="Clock" size="lg" customClass="text-primary" />
        <span>Duration:</span>
        <span class="font-bold">{{ selectedVoyage?.durationMinutes }} minutes</span>
    </div>

    <div class="mt-2 mb-2 flex flex-col gap-2">
        <div class="text-xl flex items-center gap-2">
            <UiIcon :icon="Eclipse" size="lg" customClass="text-primary" />
            <span>Origin:</span>
            <span class="font-bold">{{ selectedVoyage?.origin }}</span>
        </div>
        <div class="text-xl flex items-center gap-2">
            <UiIcon :icon="Eclipse" size="lg" customClass="text-primary" />
            <span>Destination: </span>
            <span class="font-bold">{{ selectedVoyage?.destination }}</span>
        </div>
    </div>

    <div class="mt-2 mb-2 flex flex-col gap-2">

        <div class="text-xl flex items-center gap-2">
            <span>Recommended Ship:</span>
            <span class="font-bold">{{ selectedVoyage?.recommendedShip }}</span>
        </div>
    </div>
</template>