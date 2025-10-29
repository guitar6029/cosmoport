<script setup lang="ts">
import stationimg from '../assets/img/station_1.jpg'
</script>

<template>
    <section class="hero bg-base-200 flex flex-col md:flex-row items-center justify-center gap-6">
        <div class="w-full md:max-w-xl flex flex-col gap-12 text-center">
            <h1 class="text-2xl md:text-5xl font-bold font-space">CostmoPort</h1>
            <button class="btn border-2 border-primary">Check Flights</button>
        </div>
        <div class="w-full md:max-w-xl">
            <img :src="stationimg" alt="space station"
                class="rounded-lg shadow-2xl w-full md:max-w-3xl transition duration-300 ease-in hover:scale-105" />
        </div>
    </section>
</template>