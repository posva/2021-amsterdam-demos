<template>
  <div>
    <label>
      Object nesting: {{ nesting }}
      <br />
      <input type="range" v-model="nesting" min="1" max="5" />
    </label>
    <p v-if="isRunning">Running...</p>
    <template v-else-if="elapsed">
      <p>
        Time elapsed: <code>{{ elapsed }}ms</code>
      </p>
    </template>
    <p v-else>Click one of the buttons to check to start the test</p>

    <button @click="createRefData" :disabled="isRunning">
      Create Data with <code>ref</code>
    </button>

    <span> ⏤ </span>

    <button @click="createShallowRefData" :disabled="isRunning">
      Create Data with <code>shallowRef</code>
    </button>

    <hr />

    <button @click="modifyRef" :disabled="isRunning || !refData">
      Modify Data of <code>ref</code>
    </button>

    <span> ⏤ </span>

    <button @click="modifyShallowRef" :disabled="isRunning || !shallowRefData">
      Modify Data of <code>shallowRef</code>
    </button>
  </div>
</template>

<script lang="ts">
import { computed, nextTick, ref } from 'vue'
import {
  createComplexObject,
  delay,
  raf,
  setComplexObject,
  getComplexObject,
  deepGet,
} from '../../composables/utils.ts'

export default {
  setup() {
    const refData = ref<any>()
    const shallowRefData = ref<any>()
    const elapsed = ref(0)
    const isRunning = ref(false)
    const nesting = ref(5)

    const computedRef = computed(() => getComplexObject(refData.value || {}))
    const computedShallowRef = computed(() =>
      getComplexObject(shallowRefData.value || {})
    )

    let now: number = 0
    async function prepareRun() {
      if (isRunning.value) throw new Error('Already running!')
      elapsed.value = 0
      isRunning.value = true
      // wait for it to redraw
      // for some reason, nextTick doesn't work
      await delay(100)
      now = Date.now()
    }

    function finishRun() {
      isRunning.value = false
      elapsed.value = Date.now() - now || 1
    }

    async function createRefData() {
      await prepareRun()
      refData.value = createComplexObject(nesting.value)
      finishRun()
    }

    async function createShallowRefData() {
      await prepareRun()
      shallowRefData.value = createComplexObject(nesting.value)
      finishRun()
    }

    async function modifyRef() {
      await prepareRun()
      setComplexObject(refData.value)
      console.log(computedRef.value)
      finishRun()
    }

    async function modifyShallowRef() {
      await prepareRun()
      setComplexObject(shallowRefData.value)
      console.log(computedShallowRef.value)
      finishRun()
    }

    return {
      nesting,
      refData,
      shallowRefData,

      createRefData,
      createShallowRefData,

      modifyRef,
      modifyShallowRef,

      elapsed,
      isRunning,
    }
  },
}
</script>

<style lang="scss" scoped></style>
