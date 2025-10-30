<script setup lang="ts">
withDefaults(defineProps<{
    widthAccent?: string
    heightAccent?: string   // apply to content wrapper
}>(), {
    widthAccent: 'w-28',
    heightAccent: 'min-h-[200px]' // better as a min height
})
</script>

<template>
    <div class="relative flex pl-24">
        <!-- Pillar stretches to parent height -->
        <div :class="['absolute inset-y-0 left-0 bg-primary text-4xl font-space pointer-events-none select-none', widthAccent]"
            aria-hidden="true">
            <span class="font-cyberpunk text-8xl text-base-100">
                <slot name="label" />
            </span>

            <!-- Shapes -->
            <div class="bg-base-100 w-6 h-12 absolute bottom-0 right-0"></div>
            <div class="bg-base-100 w-full h-12 absolute bottom-0 left-10 rounded-tr-[10rem]"></div>
            <div class="absolute top-0 left-1 w-2 h-full bg-base-100"></div>
            <div class="absolute bottom-0 left-4 w-1 h-1/2 bg-base-100"></div>

            <div class="absolute bottom-15 left-4 w-1 h-5 rotate-270">
                <span class="text-base-100 text-4xl font-bold font-space">
                    <slot name="side-label" />
                </span>
            </div>
            <div class="absolute bg-base-100 h-full w-2 bottom-0 right-1"></div>
        </div>

        <!-- Content sets the height -->
        <div :class="['flex-1', heightAccent]">
            <slot name="content" />
        </div>
    </div>
</template>
