<script lang="ts" setup>
import { ref } from 'vue'
import CardSciFi from '../../ui/Card/CardSciFi.vue';

const currentStep = ref(0);

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
        <CardSciFi title="Step 1" stepNumber="1">
            <div class="flex flex-col justify-around gap-2 h-full">
                
                <button class="btn btn-primary" @click="nextStep()">Next</button>
            </div>
        </CardSciFi>

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