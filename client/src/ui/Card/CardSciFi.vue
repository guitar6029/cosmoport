<script lang="ts" setup>
defineProps<{
    stepNumber?: string
    title: string
}>();
</script>

<template>
    <!-- Reserve space for the 6rem pillar + a small gap -->
    <div class="relative h-[100px] flex pl-24"> <!-- 6rem (w-24) + ~0.5rem gap -->
        <!-- Decorative shape (doesn't capture clicks) -->
        <div class="absolute inset-y-0 left-0 w-28 h-100 bg-primary text-4xl font-space pointer-events-none select-none"
            aria-hidden="true">
            <span class="font-cyberpunk text-8xl text-base-100">{{ stepNumber }}</span>
            <div class="bg-base-100 w-6 h-12 absolute bottom-0 right-0"></div>
            <div class="bg-base-100 w-100 h-12 absolute bottom-0 left-10 rounded-tr-[10rem] "></div>
            <div class="absolute top-0 left-1 w-2 h-full bg-base-100"></div>

            <div class="absolute bottom-0 left-4 w-1 h-50 bg-base-100"></div>
            <div class="absolute bottom-15 left-4 w-1 h-5 rotate-270">
                <span class="text-base-100 text-4xl font-bold font-space">Step</span>
            </div>
            <div class="absolute bg-base-100 h-full w-2 bottom-0 right-1"></div>

        </div>

        <!-- Normal card flow; no overlap issues -->
        <div class="bg-base-200 p-8 h-100 w-full md:w-200 border border-r-4 border-primary ">
            <h2 class="text-3xl font-bold">{{ title }}</h2>
            <slot></slot>
        </div>

    </div>

</template>