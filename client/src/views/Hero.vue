<script setup lang="ts">
import fleet from "../assets/img/ships/Default_Same_ship_side_threequarter_view_in_flight_posture_hig_0_a02a0ab1-b926-4cf8-b42f-389c385d894d_0.png"
import { Transition, onMounted, ref } from 'vue';

const hasMounted = ref(false);

onMounted(() => {
    hasMounted.value = true
})


</script>

<template>
    <Transition name="slide-in" appear>

        <section v-if="hasMounted" class="hero flex flex-col md:flex-row items-center justify-center gap-6">
            <div class="w-full md:max-w-xl flex flex-col items-center gap-12">
                <h1 class="text-2xl md:text-5xl font-bold font-space">CostmoPort</h1>
                <RouterLink to="/voyages"><button
                        class="btn border-2 border-primary text-2xl md:w-fit w-full uppercase">Check Voyages</button>
                </RouterLink>
            </div>
            <div class="w-full md:max-w-4xl bg-transparent">
                <img :src="fleet" alt="fleet" class="w-full md:max-w-3xl bg-transparent " />
            </div>
        </section>
    </Transition>
</template>
