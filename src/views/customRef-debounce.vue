<template>
  <div>
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
      <input type="checkbox" v-model="callOutside" />
      Eager update
    </label>

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

function useDebouncedRef<T>(
  value: T,
  delay: MaybeRef<number> = 200,
  callOutside: MaybeRef<boolean> = true
) {
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
        if (unref(callOutside)) {
          value = newValue
        }
        console.log('set', unref(callOutside), newValue)
        timeout = setTimeout(() => {
          if (!unref(callOutside)) {
            value = newValue
          }
          trigger()
        }, unref(delay))
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
    const callOutside = ref(true)
    const interval = ref(1000)
    const textType = ref('debounce' as 'debounce' | 'throttle')
    const text = useDebouncedRef('Change me', delay, callOutside)

    const upper = computed(() => text.value.toUpperCase())

    const textUpper = useIntervalRefresh(text, interval)

    return { textType, text, upper, delay, textUpper, interval, callOutside }
  },
}
</script>
