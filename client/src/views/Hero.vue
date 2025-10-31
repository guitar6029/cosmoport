<script setup lang="ts">
import { Transition, onMounted, ref } from 'vue';

const hasMounted = ref(false);

onMounted(() => {
    hasMounted.value = true
})


</script>

<template>
    <Transition name="slide-in" appear>

        <section v-if="hasMounted" class="hero flex flex-col md:flex-row items-center justify-center gap-6">
            <div class="w-full md:max-w-xl flex flex-col items-center justify-center gap-12">
                <h1 class="text-4xl text-glow md:text-[14rem] font-bold font-sci-fi uppercase z-10">CostmoPort</h1>
                <RouterLink to="/voyages"><button
                        class="border-2 p-2 cursor-pointer rounded-xl border-primary text-6xl md:w-fit w-full uppercase font-sci-fi">Explore</button>
                </RouterLink>
            </div>

        </section>
    </Transition>
</template>
