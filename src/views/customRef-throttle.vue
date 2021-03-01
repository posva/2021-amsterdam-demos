<template>
  <div>
    <label>
      Max delay {{ delay }}ms
      <br />
      <input
        type="range"
        min="500"
        max="3000"
        step="50"
        v-model.number="delay"
      />
    </label>
    <br />

    <label>
      <code>text</code>
      <span>: </span>
      <input type="text" v-model="text" />
    </label>

    <p>
      Computed: <code>text.toUpperCase() = {{ upper }}</code>
    </p>

    <label>
      Force refresh interval
      <br />
      <input
        type="range"
        min="0"
        max="3000"
        step="50"
        v-model.number="interval"
      />
    </label>
    <br />

    <p>
      Updated every {{ interval }}ms: <code>text = {{ textUpper }}</code>
    </p>
  </div>
</template>

<script lang="ts">
import {
  computed,
  customRef,
  onDeactivated,
  onUnmounted,
  ref,
  Ref,
  unref,
  watchEffect,
} from 'vue'
import { MaybeRef } from '../composables/utils'

function useThrottledRef<T>(value: T, interval: MaybeRef<number> = 200) {
  return customRef<T>((track, trigger) => {
    let shouldTrigger = true
    let intervalId: number
    const clearTimer = () => clearInterval(intervalId)

    watchEffect(() => {
      clearTimer()
      intervalId = setInterval(() => {
        if (shouldTrigger) {
          trigger()
          shouldTrigger = false
        }
      }, unref(interval))
    })

    onDeactivated(clearTimer)
    onUnmounted(clearTimer)

    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        shouldTrigger = newValue !== value
        value = newValue
      },
    }
  })
}

function useIntervalRefresh<T>(
  value: Ref<T>,
  interval: MaybeRef<number> = 200
) {
  return customRef<T>((track, trigger) => {
    let intervalId: number

    watchEffect(() => {
      clearInterval(intervalId)
      intervalId = setInterval(trigger, unref(interval))
    })

    onUnmounted(() => {
      clearInterval(intervalId)
    })

    return {
      get() {
        track()
        return unref(value)
      },
      set(newValue) {
        // cannot be set
      },
    }
  })
}

export default {
  setup() {
    const delay = ref(2000)
    const interval = ref(200)
    const text = useThrottledRef('Change me', delay)

    const upper = computed(() => text.value.toUpperCase())

    const textUpper = useIntervalRefresh(text, interval)

    return { text, upper, delay, textUpper, interval }
  },
}
</script>
