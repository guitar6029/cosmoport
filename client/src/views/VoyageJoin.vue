<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import type { Voyage } from '../types/Voyage'
import { voyagesData } from '../assets/voyagesData'
import Loading from '../ui/Loading.vue'
import Difficulty from '../ui/Badge/Difficulty.vue'
import { Clock, Eclipse, DollarSign } from 'lucide-vue-next'
import UiIcon from '../ui/UiIcon.vue'

const route = useRoute()

const isLoading = ref(true)
const hasError = ref(false)
const voyage = ref<Voyage | null>(null)

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
    <Transition name="slide-in" mode="out-in" appear v-else>
        <div class="flex flex-col justify-center gap-6">
            <h1 class="p-2 rounded-xl font-bold font-space text-4xl md:text-8xl text-primary">
                {{ voyage?.name }}
            </h1>

            <div
                class="card shadow-2xl shadow-accent flex flex-col items-center md:items-start md:flex-row md:flex-wrap gap-2 p-2">
                <div class="flex-1 flex flex-col items-center md:items-start gap-6 p-2">
                    <p class="text-4xl md:text-4xl text-wrap max-w-2xl">{{ voyage?.description }}</p>
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
                </div>

                <div class="flex items-center justify-center">
                    <img :src="voyage?.imageUrl" :alt="`${voyage?.name} image`"
                        class="w-full h-full object-cover rounded-xl" />
                </div>
            </div>
        </div>
    </Transition>
</template>
