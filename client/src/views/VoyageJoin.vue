<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useVoyageExplorer } from '../store/useVoyageExplorer'
import { voyagesData } from '../assets/voyagesData'
import Difficulty from '../ui/Badge/Difficulty.vue'
import Loading from '../ui/Loading.vue'
import type { Ship } from '../types/Ship'
import type { Voyage } from '../types/Voyage'
import VoyageSteps from '../components/voyage/VoyageSteps.vue'
import Duration from '../ui/Badge/Duration.vue'
import Credits from '../ui/Badge/Credits.vue'

const route = useRoute()
const voyageExplorer = useVoyageExplorer()

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
    voyageExplorer.setVoyage({ voyage: voyage.value, ship: ship })
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
    <Transition name="slide-in" mode="out-in" appear v-else-if="noErrorsAndHasVoyageAndNoProtocol">
        <div class="flex flex-col items-center gap-4">

            <div
                class="flex flex-col items-center justify-center gap-2 relative rounded-tl-full rounded-tr-full rounded-bl-full rounded-br-full bg-base-200">

                <h1
                    class="absolute top-20 text-glow z-100 p-2 rounded-xl font-bold font-sci-fi text-4xl md:text-8xl text-primary">
                    {{ voyage?.name }}
                </h1>

                <div class="flex flex-row items-center justify-center">
                    <div class="max-w-2xl h-full flex items-center justify-center z-10">
                        <img :src="voyage?.imageUrl" :alt="`${voyage?.name} image`"
                            class="w-full h-full object-cover rounded-tl-full rounded-bl-full" />
                    </div>

                    <div class="max-w-2xl">
                        <div class="flex flex-col gap-4 justify-center">
                            <p class=" z-40 text-xl md:text-2xl text-wrap max-w-2xl">{{ voyage?.description }}</p>
                            <div class="flex flex-wrap items-center gap-2">
                                <Duration :duration="voyage?.durationMinutes ?? 0" indicator="MINUTES" abbreviate />
                                <Difficulty :difficulty="voyage?.difficulty ?? null" />
                                <Credits :value="voyage?.reward ?? null" />

                            </div>
                        </div>

                    </div>

                </div>

                <button @click="handleBeginVoyage()"
                    class="absolute bottom-20 z-30 btn btn-secondary w-fit text-xl uppercase font-sci-fi">Launch
                    Protocol</button>


            </div>
        </div>




    </Transition>


    <!-- Wizard -->
    <VoyageSteps v-if="beginProtocol" @ship-selected="handleVoyageShipSeletion($event)" />




</template>
