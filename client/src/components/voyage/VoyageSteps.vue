<script lang="ts" setup>
import { ref } from 'vue'
import AccentPillar from '../../ui/Accents/AccentPillar.vue';

const currentStep = ref(0);


import { shipsData } from '../../assets/shipsData';
import type { Ship } from '../../types/Ship';


const ships = ref<Ship[] | null>(shipsData)

/**
 * Increment the current step by 1, unless the current step is 2
 * (in which case the function does nothing)
 */
function nextStep() {
    if (currentStep.value === 2) return
    currentStep.value += 1
}

/**
 * Decrement the current step by 1, unless the current step is 0
 * (in which case the function does nothing)
 */
function previousStep() {
    if (currentStep.value === 0) return
    currentStep.value -= 1
}

</script>

<template>
    <!-- Steps -->
    <!-- Step 1 -->
    <Transition name="slide-in" mode="out-in" appear v-if="currentStep === 0">

        <div class="flex flex-row items-center gap-2">

            <!-- <AccentPillar width-accent="w-24">
                <template #label>1</template>
<template #side-label><span class="text-nowrap">Select Ship</span> </template>
<template #content>
                    <div class="card bg-base-200 shadow-lg p-4 h-[80vh] ">
                        <h2 class="text-2xl font-bold uppercase font-space">Select Ship</h2>
                        <p class="text-lg">Begin your journey across the galaxy.</p>
                    </div>
                </template>
</AccentPillar> -->
            <div class="flex items-center flex-wrap  border-2 border-primary">
                <div v-for="ship in ships" :key="ship.id"
                    class="w-100 h-100 flex flex-col gap-2 border-2 border-primary">
                    <span>{{ ship.name }}</span>
                    <span>{{ ship.size }}</span>
                    <span>{{ ship.hardpoints }}</span>
                </div>
            </div>
        </div>

    </Transition>

    <!-- End Step 1 -->

    <!-- Step 2 -->
    <Transition name="slide-in" mode="out-in" appear v-if="currentStep === 1" class="flex flex-col gap-4">
        <div>
            <h1>Step 2</h1>
            <button @click="previousStep()">Previous</button>
            <button @click="nextStep()">Next</button>
        </div>
    </Transition>
    <!-- Step 3-->
    <Transition name="slide-in" mode="out-in" appear v-if="currentStep === 2" class="flex flex-col gap-4">
        <div>
            <h1>Step 3</h1>
            <button @click="previousStep()">Previous</button>
            <button>Launch</button>
        </div>
    </Transition>
    <!-- End Step 3-->


    <!-- END Steps -->
</template>