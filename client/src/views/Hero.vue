<script setup lang="ts">
import stationimg from '../assets/img/station_1.jpg'
import { Transition, onMounted, ref } from 'vue';

const hasMounted = ref(false);

onMounted(() => {
    hasMounted.value = true
})


</script>

<template>
    <Transition name="slide-in" appear>

        <section v-if="hasMounted" class="hero bg-base-200 flex flex-col md:flex-row items-center justify-center gap-6">
            <div class="w-full md:max-w-xl flex flex-col items-center gap-12">
                <h1 class="text-2xl md:text-5xl font-bold font-space">CostmoPort</h1>
                <RouterLink to="/voyages"><button
                        class="btn border-2 border-primary text-2xl md:w-fit w-full uppercase">Check Voyages</button>
                </RouterLink>
            </div>
            <div class="w-full md:max-w-xl">
                <img :src="stationimg" alt="space station"
                    class="rounded-lg shadow-2xl w-full md:max-w-3xl transition duration-300 ease-in opacity-50 hover:opacity-100" />
            </div>
        </section>
    </Transition>
</template>

<style scoped>
.slide-in-enter-active,
.slide-in-leave-active {
    transition: all 0.3s ease;
}

.slide-in-enter-from {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
}

.slide-in-leave-to {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
}
</style>