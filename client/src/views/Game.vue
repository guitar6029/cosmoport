<script setup lang="ts">
import { useGame } from '@/store/useGame';
import PixiScene from '@/components/game/PixiScene.vue';
import { onMounted } from 'vue';
import { introOutpost } from '../utils/dialogues/introOutpost';
import DialogueBox from '../ui/Dialogue.vue';

const game = useGame();

const finishIntro = () => {
    game.seenDockIntro = true;
}

onMounted(() => {
    // Ensure we always enter at intro for now
    if (!['intro', 'dock'].includes(game.scene)) game.scene = 'intro';

    // Auto-transition after 2.5s (MVP “emergency land”)
    if (game.scene === 'intro') {
        setTimeout(() => (game.scene = 'dock'), 2500);
    }
});
</script>

<template>
    <div class="w-full h-dvh">
        <PixiScene v-if="game.scene === 'intro'" />
        <div v-else class="h-dvh flex items-center justify-center">
            <div class="max-w-6xl p-6 rounded-xl bg-base-200 shadow">
                <div class="flex gap-2">
                    <DialogueBox :dialogues="introOutpost" @finish-dialogue="finishIntro()" />

                </div>
            </div>
        </div>
    </div>
</template>
