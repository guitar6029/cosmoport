<script lang="ts" setup>
import { ref } from 'vue'
import { itemsData } from '@/assets/itemsData'
import { getItemImages } from '@/utils/imageUtils';
import type { Item } from '@/types/Item';


const currentItemView = ref(itemsData[0]);

const handleSelectedItem = (index: number) => {
    const foundItem = itemsData.find((item: Item) => item.id === itemsData[index]?.id)
    if (foundItem) {
        currentItemView.value = foundItem
    }
}

</script>
<template>
    <div class="flex flex-col items-center w-full gap-2">
        <section>
            <h1 class="title-main">Journal</h1>
            <!-- <h1 class="title-section">Items</h1> -->
            <div class="flex flex-row gap-1 glass">

                <div class="flex w-2xl flex-col gap-2 rounded-2xl">

                    <Transition name="fade" mode="out-in" appear>
                        <div :key="currentItemView?.id" class="flex flex-col gap-2 p-2 w-full md:max-w-150">
                            <h1 class="font-bold text-4xl font-sci-fi text-accent bg-primary/75 p-2 w-fit">{{
                                currentItemView?.name }}</h1>
                            <img :src="getItemImages(currentItemView?.id ?? null)" :alt="currentItemView?.name"
                                class="w-50 h-50  rounded-xl">
                            <p class="font-bold w-full text-md text-2xl">{{ currentItemView?.description }}</p>
                            <span>{{ currentItemView?.value }}</span>
                        </div>
                    </Transition>
                </div>
                <div class="flex max-w-3xl flex-wrap items-center gap-2 rounded-2xl max-h-100 overflow-scroll">
                    <TransitionGroup name="fade" tag="div" appear
                        class="flex items-center justify-center flex-wrap gap-4 p-2">
                        <div v-for="item, index in itemsData" :key="item.id" @click="handleSelectedItem(index)"
                            :style="{ transitionDelay: `${index * 100}ms` }"
                            class="flex flex-col gap-2 p-2 w-full md:max-w-40 cursor-pointer items-center bg-secondary/55 rounded-2xl">
                            <img :src="getItemImages(item.id)" :alt="item.name"
                                class="w-25 h-25 trns hover:scale-110 rounded-xl">
                            <h1 class="font-bold text-md">{{ item.name }}</h1>
                        </div>
                    </TransitionGroup>
                </div>

            </div>
        </section>
    </div>
</template>
