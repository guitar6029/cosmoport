<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, onMounted, ref, watch } from 'vue'
import type { Voyage } from '../types/Voyage'
import { voyagesData } from '../assets/voyagesData'
import Loading from '../ui/Loading.vue'
import Difficulty from '../ui/Badge/Difficulty.vue'
import { Clock, Eclipse, DollarSign } from 'lucide-vue-next'
import UiIcon from '../ui/UiIcon.vue'
import VoyageSteps from '../components/voyage/VoyageSteps.vue'
import type { Ship } from '../types/Ship'

const route = useRoute()

const isLoading = ref(true)
const hasError = ref(false)
const voyage = ref<Voyage | null>(null)

const beginProtocol = ref(false)

onMounted(async () => {
    await new Promise(r => setTimeout(r, 2500)) // fake latency
    fetchVoyage()
})

// Re-run if /voyages/:name changes without remount
watch(() => route.params.name, () => {
    isLoading.value = true
    hasError.value = false
    voyage.value = null
    fetchVoyage()
})


function handleBeginVoyage() {
    beginProtocol.value = true

}

function handleVoyageShipSeletion(ship: Ship) {
    console.log("voyage ship selection", ship)
    //later save it to the store
}

function fetchVoyage() {
    const voyageName = String(route.params.name ?? '')
    const found = voyagesData.find(v => v.name === voyageName)

    if (!found) {
        hasError.value = true
        isLoading.value = false
        return
    }

    voyage.value = found
    isLoading.value = false
}


const viewForProtocol = computed(() => {
    return beginProtocol.value
})


const noErrorsAndHasVoyage = computed(() => {
    return !hasError.value && !!voyage.value
})

const noErrorsAndHasVoyageAndNoProtocol = computed(() => {
    return noErrorsAndHasVoyage.value && !viewForProtocol.value
})

</script>

<template>
    <!-- Loading -->
    <section v-if="isLoading">
        <Loading />
    </section>

    <!-- Not found -->
    <section v-else-if="hasError">
        <h1 class="text-4xl">Voyage not found</h1>
        <RouterLink to="/voyages">
            <button class="btn btn-primary w-fit">Go back to Voyages</button>
        </RouterLink>
    </section>

    <!-- Success -->
    <Transition name="slide-in" mode="out-in" appear v-else-if="noErrorsAndHasVoyageAndNoProtocol"
        class="flex flex-col gap-4">
        <div class="flex flex-col justify-center gap-6 relative">
            <div class="absolute top-4 right-0 w-12 h-2 bg-primary">
            </div>
            <Transition name="rail" appear>
                <div class="absolute bottom-0 left-0 w-full h-12 bg-primary z-0 pointer-events-none" />
            </Transition>
            <Transition name="rail" appear>
                <div class="absolute top-0 left-0 w-full h-2 bg-primary">
                </div>
            </Transition>

            <div class="absolute bottom-4 left-0 w-4 h-24 bg-primary">
            </div>

            <h1 class="p-2 rounded-xl font-bold font-space text-4xl md:text-8xl text-primary">
                {{ voyage?.name }}
            </h1>

            <div
                class="card shadow-2xl shadow-accent flex flex-col items-center justify-center md:flex-row md:flex-wrap gap-2 p-2">
                <div class="flex-1 flex flex-col items-center  gap-6 p-2">
                    <p class="text-4xl md:text-4xl text-wrap max-w-2xl text-center">{{ voyage?.description }}</p>
                    <Difficulty :difficulty="voyage?.difficulty ?? null" />

                    <!-- ORIGIN -->
                    <div class="flex text-4xl flex-row items-center gap-2">
                        <UiIcon :icon="Eclipse" size="lg" customClass="text-primary" />
                        <span>Origin - </span>
                        <span class="font-bold">{{ voyage?.origin }}</span>
                    </div>

                    <!-- DESTINATION -->
                    <div class="flex text-4xl flex-row items-center gap-2">
                        <UiIcon :icon="Eclipse" size="lg" customClass="text-primary" />
                        <span>Destination - </span>
                        <span class="font-bold">{{ voyage?.destination }}</span>
                    </div>

                    <!-- DURATION -->
                    <div class="text-4xl flex flex-row items-center gap-2">
                        <UiIcon :icon="Clock" size="lg" customClass="text-primary" />
                        <span>Duration - </span>
                        <span class="font-bold badge badge-xl badge-outline">{{ voyage?.durationMinutes }}
                            minutes</span>
                    </div>

                    <!-- REWARD -->
                    <div class="text-4xl flex flex-row items-center gap-2">
                        <UiIcon :icon="DollarSign" size="lg" customClass="text-primary" />
                        <span>Reward - </span>
                        <span class="font-bold badge badge-xl badge-outline">{{ voyage?.reward }}</span>
                    </div>

                    <button @click="handleBeginVoyage()"
                        class="btn btn-secondary w-fit text-xl uppercase font-space">Launch Protocol</button>
                </div>

                <div class="flex items-center justify-center">
                    <img :src="voyage?.imageUrl" :alt="`${voyage?.name} image`"
                        class="w-full h-full object-cover rounded-4xl" />
                </div>
            </div>

        </div>



    </Transition>


    <!-- Wizard -->
    <VoyageSteps v-if="beginProtocol" @ship-selected="handleVoyageShipSeletion($event)" />




</template>
