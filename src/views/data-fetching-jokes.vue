<template>
  <h2>Data fetching</h2>

  <blockquote :key="joke.id">
    <i>{{ joke.setup }}</i>
    <br />
    <br />
    <p class="appear" @animationend="state = 'ready'">{{ joke.punchline }}</p>
  </blockquote>

  <br />

  <button @click="newJoke" :disabled="state !== 'ready'">
    {{ buttonText }}
  </button>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const texts = {
  loading: 'Fetching the joke...',
  waiting: 'Wait for it...',
  ready: 'Another one?',
}

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const joke = computed(() => route.meta.joke)
    const state = ref<'loading' | 'waiting' | 'ready'>('waiting')

    const buttonText = computed(() => texts[state.value])

    async function newJoke() {
      state.value = 'loading'
      try {
        await router.push({ query: { _t: Date.now() } })
      } finally {
        state.value = 'waiting'
      }
    }

    return { joke, state, newJoke, buttonText }
  },
}
</script>

<style scoped>
@keyframes appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.appear {
  opacity: 0;
  animation: appear 1s ease-in-out 3s;
  animation-fill-mode: forwards;
}
</style>
