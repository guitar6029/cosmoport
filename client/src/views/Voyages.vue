<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { voyagesData } from '../assets/voyagesData.ts'
import Loading from '../ui/Loading.vue';
import type { Voyage } from '../types/Voyage.ts';
import VoyageCard from '../ui/VoyageCard.vue';
import BaseModal from '../ui/BaseModal.vue';
import { TransitionGroup } from 'vue'
import VoyageMoreDetails from '../components/voyage/VoyageMoreDetails.vue';
const loading = ref(true)
const voyages = ref<Voyage[] | null>([])
onMounted(() => {
    setTimeout(() => fetchVoyages(), 3000);
})

const selectedVoyage = ref<Voyage | null>(null);
const isModalShowing = ref(false);
//fake an api call to fetch voyages, we have it locally so we could jsut add a timeout
const fetchVoyages = async () => {
    loading.value = false
    voyages.value = voyagesData

}

const handleVoyageDetails = (voyage: Voyage) => {
    selectedVoyage.value = voyage
    console.log("selected voyage", selectedVoyage.value)
    isModalShowing.value = true
}

</script>

<template>
    <section v-if="loading">
        <Loading />
    </section>
    <section v-else class="flex flex-col gap-6">
        <BaseModal v-show="isModalShowing" :show="isModalShowing" :title="selectedVoyage?.name" :open="isModalShowing"
            @close="isModalShowing = false">
            <VoyageMoreDetails :selectedVoyage="selectedVoyage" />
        </BaseModal>

        <h1 class="font-space text-6xl">Voyages</h1>
        <TransitionGroup name="fade" tag="div" appear class="flex items-center flex-wrap gap-4">
            <VoyageCard v-for="(voyage, index) in voyages" :key="voyage.id" :voyage="voyage"
                :style="{ transitionDelay: `${index * 100}ms` }" @view-voyage-details="handleVoyageDetails($event)" />
        </TransitionGroup>
    </section>
</template>

<style scoped>
/* Use :deep() so the classes apply to the child component roots (VoyageCard) */
:deep(.fade-enter-active),
:deep(.fade-leave-active) {
    transition: opacity 0.6s ease, transform 0.6s ease;
}

/* Initial/target states */
:deep(.fade-enter-from),
:deep(.fade-leave-to) {
    opacity: 0;
    transform: translateY(20px);
}

:deep(.fade-enter-to),
:deep(.fade-leave-from) {
    opacity: 1;
    transform: translateY(0);
}

/* (Optional) If you ever reorder/filter, this makes movement smooth */
:deep(.fade-move) {
    transition: transform 0.4s ease;
}
</style>