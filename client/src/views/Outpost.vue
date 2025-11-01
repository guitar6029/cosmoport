<!-- OutpostView.vue (relevant parts) -->
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useProfile } from '../store/useProfile';
import { introOutpost } from '../utils/dialogues/introOutpost';
import DialogueBox from '../ui/Dialogue.vue';


const profile = useProfile()
const showIntro = ref(false)

const finishIntro = () => {
    profile.seenIntro = true
    showIntro.value = false
}

const onKey = (e: KeyboardEvent) => {
    if (!showIntro.value) return
    if (e.key === 'Escape') finishIntro()
}

onMounted(() => {
    if (!profile.seenIntro) showIntro.value = true
    window.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
    <main class="relative">
        <!-- your outpost UI here -->
        <DialogueBox  :dialogues="introOutpost" @finish-dialogue="finishIntro" />
    </main>
</template>
