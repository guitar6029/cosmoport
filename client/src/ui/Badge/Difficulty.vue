<script setup lang="ts">
import type { Voyage } from '../../types/Voyage';
import { getDifficultyClass } from '../../utils/difficultyUtils'
defineProps<{
    difficulty: Voyage['difficulty']
}>();

</script>

<template>
    <div :class="['badge badge-xl', getDifficultyClass(difficulty)]">
        {{ difficulty }}
    </div>
</template>