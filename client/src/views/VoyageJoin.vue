<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import type { Voyage } from '../types/Voyage';
import { voyagesData } from '../assets/voyagesData';
import Loading from '../ui/Loading.vue';
import Difficulty from '../ui/Badge/Difficulty.vue';
import { Clock, Eclipse, DollarSign } from 'lucide-vue-next';
import UiIcon from '../ui/UiIcon.vue';
const route = useRoute();
const voyageName = route.params.name as string
const isLoading = ref(true)
const hasError = ref(false)
const voyage = ref<Voyage | null>(null)
//fake an api call to find the voyage object
onMounted(() => {
    setTimeout(() => fetchVoyage(), 2500);
})

const fetchVoyage = () => {

    //find the index  of the voyage in the voyagesData array
    const index = voyagesData.findIndex((voyage: Voyage) => voyage.name === voyageName)
    // create an error case if not found 
    if (index === -1) {
        hasError.value = true
    }

    //if everything is good , and index exists
    voyage.value = voyagesData[index] as Voyage
    //set to false
    isLoading.value = false
}

</script>


<template>
    <section v-if="isLoading">
        <Loading />
    </section>
    <section v-else-if="hasError">
        <h1 class="text-4xl">Voyage not found</h1>
        <RouterLink to="/voyages"><button class="btn btn-primary w-fit">Go back to Voyages</button></RouterLink>
    </section>
    <section v-else class="flex flex-col justify-center gap-4">
        <div class="flex-col gap-2">
            <h1 class="p-2 rounded-xl font-bold font-space text-4xl md:text-8xl text-primary">{{ voyageName }}</h1>
        </div>
        <div class="card flex flex-col md:flex-row md:flex-wrap gap-2">
            <div class="card-body flex-1 flex flex-col gap-2">
                <!-- <h2 class="card-title">{{ voyage?.name }}</h2> -->
                <p class="text-2xl md:text-4xl">{{ voyage?.description }}</p>
                <div class="card-body">
                    <Difficulty :difficulty="voyage?.difficulty ?? null" />
                    <!-- DURATION -->
                    <div class="text-xl flex flex-row items-center gap-2">
                        <UiIcon :icon="Clock" size="lg" customClass="text-primary" />
                        <span>Duration</span>
                        <span class="font-bold badge badge-xl badge-outline">{{ voyage?.durationMinutes }}
                            minutes</span>
                    </div>
                    <!-- ORIGIN -->
                    <div class="flex text-xl flex-row items-center gap-2">
                        <UiIcon :icon="Eclipse" size="lg" customClass="text-primary" />
                        <span>Origin<span class="font-bold">{{ voyage?.origin }}</span></span>
                    </div>
                    <!-- DESTINATION -->
                    <div class="flex text-xl flex-row items-center gap-2">
                        <UiIcon :icon="Eclipse" size="lg" customClass="text-primary" />
                        <span>Destination<span class="font-bold">{{ voyage?.destination }}</span></span>
                    </div>
                    <!-- REWARD -->
                    <div class="text-xl flex flex-row items-center gap-2">
                        <UiIcon :icon="DollarSign" size="lg" customClass="text-primary" />
                        <span>Reward</span>
                        <span class="font-bold badge badge-xl badge-outline">{{ voyage?.reward }}</span>
                    </div>

                    <!-- SHIP  -->
                    <div class="text-xl flex flex-row items-center gap-2">
                        <span>Recommended Ship</span>
                        <span class="font-bold badge badge-xl badge-outline">{{ voyage?.recommendedShip }}</span>
                    </div>
                </div>

            </div>
            <div class="flex-1 flex items-center justify-center ">
                <img :src="voyage?.imageUrl" :alt="`${voyage?.name} image`" class="rounded-xl shadow-2xl shadow-accent">
            </div>
        </div>
    </section>
</template>