<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch, toRef } from 'vue'

const props = withDefaults(defineProps<{
  /** Show a confirm button that kicks off the countdown */
  showConfirm?: boolean
  confirmText?: string
  /** Automatically start the countdown on mount or when `active` flips true */
  autoStart?: boolean
  active?: boolean
  /** Per-frame labels; last one is the final message */
  labels?: string[]
  /** Milliseconds between frames */
  stepDurationMs?: number
  /** Hold time after the last label enters before emitting `finished` */
  finalHoldMs?: number
  /** Show a “Skip” control during countdown */
  showSkip?: boolean
  /** Force reduced-motion (otherwise auto-detects via media query) */
  reducedMotion?: boolean | null
}>(), {
  showConfirm: true,
  confirmText: 'Initiate Voyage',
  autoStart: false,
  active: false,
  labels: () => ['3', '2', '1', 'Lift Off!'],
  stepDurationMs: 650,
  finalHoldMs: 900,
  showSkip: true,
  reducedMotion: null
})

const emits = defineEmits<{
  (e: 'confirm'): void
  (e: 'finished'): void
}>()

// internal state
const idx = ref<number>(-1)      // -1 = idle (not started)
let t: number | null = null

// reduced motion detection
const prefersReduced = ref(false)
onMounted(() => {
  if (props.reducedMotion === null) {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReduced.value = !!m.matches
    const handler = (ev: MediaQueryListEvent) => (prefersReduced.value = ev.matches)
    // @ts-ignore (old Safari types)
    m.addEventListener ? m.addEventListener('change', handler) : m.addListener(handler)
  } else {
    prefersReduced.value = props.reducedMotion
  }
})

// public API
function start() {
  if (idx.value !== -1) return
  idx.value = 0
}
function reset() {
  clearTimer()
  idx.value = -1
}
function clearTimer() {
  if (t) {
    window.clearTimeout(t)
    t = null
  }
}
defineExpose({ start, reset })

// autoStart hooks
const activeRef = toRef(props, 'active')
watch(activeRef, (now) => {
  if (now && idx.value === -1) start()
})
onMounted(() => {
  if (props.autoStart && idx.value === -1) start()
})

// sequence advance after each enter
function onAfterEnter() {
  const last = props.labels.length - 1
  const fast = prefersReduced.value
  const stepMs = fast ? 0 : props.stepDurationMs
  const endMs  = fast ? 0 : props.finalHoldMs

  if (idx.value >= 0 && idx.value < last) {
    schedule(() => (idx.value += 1), stepMs)
  } else if (idx.value === last) {
    schedule(() => emits('finished'), endMs)
  }
}
function schedule(fn: () => void, ms: number) {
  clearTimer()
  t = window.setTimeout(fn, ms)
}

function onConfirmClick() {
  emits('confirm')
  start()
}

function skipToEnd() {
  idx.value = props.labels.length - 1
}

onBeforeUnmount(clearTimer)
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-6">
    <!-- Confirm button -->
    <button
      v-if="showConfirm && idx === -1"
      class="btn btn-primary w-120 min-h-75 max-w-full uppercase text-4xl font-sci-fi"
      @click="onConfirmClick"
    >
      {{ confirmText }}
    </button>

    <!-- Countdown -->
    <Transition name="count-slide" mode="out-in" @after-enter="onAfterEnter">
      <div v-if="idx >= 0" :key="labels[idx]" class="h-88 flex items-center justify-center">
        <template v-if="idx < labels.length - 1">
          <h1 class="font-sci-fi uppercase font-bold text-[18rem] leading-none text-primary select-none">
            {{ labels[idx] }}
          </h1>
        </template>
        <template v-else>
          <h1 class="font-sci-fi text-primary uppercase text-8xl tracking-[0.3em] select-none">
            {{ labels[idx] }}
          </h1>
        </template>
      </div>
    </Transition>

    <!-- Skip -->
    <button
      v-if="showSkip && idx >= 0 && idx < labels.length - 1"
      class="btn btn-ghost"
      @click="skipToEnd"
      aria-label="Skip countdown"
    >
      Skip
    </button>
  </div>
</template>

<style scoped>
.count-slide-enter-active,
.count-slide-leave-active {
  transition: transform 380ms ease, opacity 380ms ease;
  will-change: transform, opacity;
}
.count-slide-enter-from {
  opacity: 0;
  transform: translateY(32px) scale(0.95);
}
.count-slide-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.count-slide-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.count-slide-leave-to {
  opacity: 0;
  transform: translateY(-32px) scale(0.95);
}
</style>
