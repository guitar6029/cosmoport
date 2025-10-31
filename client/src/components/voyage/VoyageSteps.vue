<script lang="ts" setup>
import { computed, ref } from 'vue'
import { ArrowBigLeft, ArrowBigRight } from 'lucide-vue-next';
const currentStep = ref(0);


import { shipsData } from '../../assets/shipsData';
import type { Ship } from '../../types/Ship';


const ships = ref<Ship[] | null>(shipsData)

const currentCarouselStep = ref(0)

const previousShipSlide = () => {
    if (currentCarouselStep.value === 0) {
        //then go to the last ship
        currentCarouselStep.value = ships.value!.length - 1
    } else {
        currentCarouselStep.value -= 1

    }

}

const nextShipSlide = () => {
    if (currentCarouselStep.value === ships.value!.length - 1) {
        //then go to the first ship
        currentCarouselStep.value = 0
    } else {
        currentCarouselStep.value += 1
    }
}


const shipSlot = computed(() => {
    [
        { role: "previous", ship: previousShip.value, key: `previosus-${currentCarouselStep.value}` },
        { role: "current", ship: currentShip.value, key: `current-${currentCarouselStep.value}` },
        { role: "next", ship: nextShip.value, key: `next-${currentCarouselStep.value}` },
    ]
})


//get current ship object 
const currentShip = computed(() => {
    return ships.value![currentCarouselStep.value]
})

//get current ship - 1
const previousShip = computed(() => {
    // if index is at 0, then return the last ship
    if (currentCarouselStep.value === 0) {
        return ships.value![ships.value!.length - 1]
    } else {
        return ships.value![currentCarouselStep.value - 1]

    }
})

//get current ship + 1
const nextShip = computed(() => {
    // if index is at last index, then return the first ship
    if (currentCarouselStep.value === ships.value!.length - 1) {
        return ships.value![0]
    } else {
        return ships.value![currentCarouselStep.value + 1]
    }
})
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

        <div class="flex flex-col items-center justify-center gap-2">

            <div class="flex items-center gap-2">

                <h1 class="font-cyberpunk text-8xl text-primary">1</h1>

                <h1 class="font-space uppercase text-4xl">Select Ship</h1>
            </div>

            <!-- caraousel -->
            <div class="flex items-center justify-center gap-2">
                <ArrowBigLeft @click="previousShipSlide()"
                    class="w-12 h-12 cursor-pointer hover-basic hover:text-primary hover:fill-primary" />

                <div class="relative flex items-center gap-4">
                    <div class="relative bottom-30 p-4 w-50 flex flex-col items-center gap-4 ">
                        <img :src="previousShip?.images.default" :alt="previousShip?.name" class="blur-[2px]">
                    </div>
                    <div class="p-4 w-150 flex flex-col items-center gap-4 ">
                        <img :src="currentShip?.images.default" alt="">
                        <span class="font-bold text-4xl">{{ currentShip?.name }}</span>
                    </div>
                    <div class="relative bottom-30 p-4 w-50 flex flex-col items-center gap-4 ">

                        <img :src="nextShip?.images.default" :alt="nextShip?.name" class="blur-[2px]">
                    </div>
                </div>

                <ArrowBigRight @click="nextShipSlide()"
                    class="w-12 h-12 cursor-pointer hover-basic hover:text-primary hover:fill-primary" />
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