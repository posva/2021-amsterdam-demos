<template>
  <div>
    <label>
      Demo
      <select v-model="textType">
        <option>debounce</option>
        <option>throttle</option>
      </select>
    </label>
    <br />

    <label>
      Delay {{ delay }}ms
      <br />
      <input type="range" min="0" max="1000" step="10" v-model.number="delay" />
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
  onUnmounted,
  ref,
  Ref,
  unref,
  watchEffect,
} from 'vue'
import { MaybeRef } from '../composables/utils'

function useDebouncedRef<T>(value: T, delay: MaybeRef<number> = 200) {
  let timeout: number
  return customRef<T>((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        // could be moved inside the setTimeout
        value = newValue
        console.log('set', newValue)
        timeout = setTimeout(() => {
          trigger()
        }, unref(delay))
      },
    }
  })
}

function useThrottledRef<T>(value: T, interval: MaybeRef<number> = 200) {
  return customRef<T>((track, trigger) => {
    let intervalId: number
    let shouldTrigger = true

    watchEffect(() => {
      clearInterval(intervalId)
      intervalId = setInterval(() => {
        if (shouldTrigger) {
          trigger()
          shouldTrigger = false
        }
      }, unref(interval))
    })

    onUnmounted(() => {
      clearInterval(intervalId)
    })

    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        value = newValue
        shouldTrigger = true
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
    const delay = ref(200)
    const interval = ref(1000)
    const textType = ref('debounce' as 'debounce' | 'throttle')
    const text = useDebouncedRef('Change me', delay)
    const textThrottled = useThrottledRef('Change me', delay)

    const upper = computed(() => text.value.toUpperCase())

    const textUpper = useIntervalRefresh(text, interval)

    return { textType, text, upper, delay, textUpper, interval }
  },
}
</script>
