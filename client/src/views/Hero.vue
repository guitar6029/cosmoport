<script setup lang="ts">
import stationimg from '../assets/img/station_1.jpg'
</script>

<template>
    <section class="hero bg-base-200 flex flex-row items-center justify-center gap-2">
        <div class="hero-content text-center">
            <div class="max-w-md">
                <h1 class="text-5xl font-bold">CostmoPort</h1>
                <p class="py-6">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. In, aspernatur? Et error eius, facilis aut
                    expedita eaque tenetur, ea non accusamus distinctio natus corrupti eveniet nisi, voluptatum
                    similique aperiam saepe!
                </p>
                <button class="btn btn-primary">Get Started</button>
            </div>
        </div>
        <div class="hero-content text-center">
            <div class="max-w-md">
                <img :src="stationimg" alt="space station" class="rounded-lg shadow-2xl" />
            </div>
        </div>
    </section>
</template>