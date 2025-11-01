<script lang="ts" setup>
import type { DialogueLine } from '../types/Dialogue';
import { computed, ref } from 'vue'

const props = defineProps<{ dialogues: readonly DialogueLine[] }>();
const emits = defineEmits<{
    (e: 'finish-dialogue'): void
}>();

const currentLine = ref(0)
const currentDialogue = computed(() => props.dialogues[currentLine.value])

const lastDialogue = computed(() => currentLine.value === props.dialogues.length - 1)

function nextDialogueSequence() {
    if (currentLine.value < props.dialogues.length - 1) {
        currentLine.value += 1
    }
}

function finishDialogue() {
    // emit to parent
    emits('finish-dialogue')
}

</script>

<template>
    <div class="flex items-center min-h-50 gap-2 bg-base-100 p-4 rounded-xl">
        <!-- left side for image  -->
        <div class="flex flex-col items-center gap-2">
            <div class="w-44 h-44">
                <img :src="currentDialogue?.portrait" :alt="currentDialogue?.name"
                    class="w-full h-full object-cover rounded-xl" />
            </div>
            <p class="font-bold font-sci-fi">{{ currentDialogue?.name }}</p>
        </div>

        <!-- the rest is for the dialogue text -->
        <div class="flex flex-col min-h-40 justify-around gap-2">
            <!-- dialogue data -->
            <div class="flex-1 w-full  lg:w-2xl bg-black/25 p-4 rounded-tl-2xl rounded-tr-2xl">
                <p class=" font-bold font-mono text-2xl">{{ currentDialogue?.text }}</p>
            </div>
            <!-- next button -->
            <div class="flex flex-col items-center justify-center gap-2">
                <button v-if="!lastDialogue" @click="nextDialogueSequence()"
                    class="btn btn-xl w-full btn-primary font-sci-fi font-bold uppercase">Continue</button>
                <button v-else @click="finishDialogue()"
                    class="btn btn-xl w-full btn-primary font-sci-fi font-bold uppercase">Ok, got it.</button>

            </div>
        </div>

    </div>
</template>