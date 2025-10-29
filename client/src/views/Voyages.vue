<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { voyagesData } from '../assets/voyagesData.ts'
import Loading from '../ui/Loading.vue';
import type { Voyage } from '../types/Voyage.ts';
import VoyageCard from '../ui/VoyageCard.vue';


const loading = ref(true)
const voyages = ref<Voyage[] | null>([])
onMounted(() => {
    setTimeout(() => fetchVoyages(), 3000);
})

//fake an api call to fetch voyages, we have it locally so we could jsut add a timeout
const fetchVoyages = async () => {
    loading.value = false
    voyages.value = voyagesData

}

</script>

<template>
    <section v-if="loading">
        <Loading />
    </section>
    <section v-else class="flex flex-col gap-6">
        <h1 class="font-space text-2xl">Voyages</h1>
        <div class="flex items-center flex-wrap gap-4">
            <VoyageCard :voyage="voyage" v-for="voyage in voyages" :key="voyage.id" />
        </div>
    </section>
</template>