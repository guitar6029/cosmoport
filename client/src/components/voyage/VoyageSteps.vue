<script lang="ts" setup>
import { computed, ref } from 'vue'
import ShipSelection from './ShipSelection.vue';
import type { Ship } from '../../types/Ship';

const emits = defineEmits<{
    (e: 'ship-selected', ship: Ship): void
}>()

// refs
const currentStep = ref(0)
const voyageSetup = ref({
    ship: null as Ship | null
})

const handleShipSelection = (ship: Ship) => {
    voyageSetup.value.ship = ship
    console.log("voyage setup", voyageSetup.value)
    //go to step 2, future integration
    //nextStep()

    //for now emit back to parent
    emits('ship-selected', ship)
}



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


/** COMPUTED */

//const showingStep2 = computed(() => !!voyageSetup.value.ship && currentStep.value === 1)

</script>

<template>
    <!-- Steps -->
    <!-- Step 1 -->
    <Transition name="slide-in" mode="out-in" appear v-if="currentStep === 0">
        <div class="flex flex-col items-center justify-center gap-2">
            <div class="flex items-center gap-2">
                <h1 class="font-cyberpunk text-8xl text-primary">1</h1>
                <h1 class="font-space uppercase text-4xl">Select Ship</h1>
            </div>
            <!-- caraousel -->
            <ShipSelection @ship-selected="handleShipSelection($event)" />
        </div>

    </Transition>

    <!-- End Step 1 -->



    <!-- END Steps -->
</template>