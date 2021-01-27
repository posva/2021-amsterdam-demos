<template>
  <div>
    <h1>Hmm 🤔</h1>
    <p>
      We don't have <code>/{{ $route.params.catchAll }}</code
      >. Maybe one of these:
    </p>
    <ul>
      <li v-for="link in links">
        <router-link :to="link">{{ link }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const modules = import.meta.glob('./*.vue')

const links = computed(() =>
  Object.keys(modules)
    .filter((path) => path !== './not-found.vue')
    .map((path) => path.slice(1, -4))
)
</script>
