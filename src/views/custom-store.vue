<template>
  <p>
    Counter: {{ store.state.counter }}
    <br>
    Double is <b>{{ store.double.value }}</b>
  </p>
  <button @click="store.state.counter++">Increment</button>
  <br />
  <hr>
  <p>
    <ol>
      <li>Increment the counter a bit and see <b>the double</b> change.</li>
      <li>Go <router-link to="/go-back">somewhere else</router-link> to destroy this component.</li>
      <li>Increment the counter again.</li>
      <li>See how <b>the double</b> doesn't change anymore.</li>
      <li v-if="!$route.query.fix">Now try <router-link :to="{ query: {fix: 'yes'}}">using the working store</router-link>.</li>
      <li v-else>Or <router-link :to="{ query: {}}">switch back to the broken one</router-link>.</li>
      <li>Go <router-link to="/go-back">somewhere else</router-link> again.</li>
      <li>Increment the counter 💫 .</li>
    </ol>
  </p>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useBrokenStore, useStore } from '../composables/store'

export default defineComponent({
  setup() {
    const route = useRoute()
    const brokenStore = useBrokenStore()
    const workingStore = useStore()

    const store = computed(() => route.query.fix ? workingStore : brokenStore)

    return { store }
  },
})
</script>
