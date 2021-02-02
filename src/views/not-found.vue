<template>
  <div>
    <h2 v-if="$route.params.catchAll">Hmm 🤔</h2>

    <p v-if="$route.params.catchAll">
      We don't have <code>/{{ $route.params.catchAll }}</code
      >. Maybe one of these:
    </p>
    <p v-else>Try one of these:</p>

    <ul>
      <li v-for="link in links">
        <router-link :to="link">{{ link }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { staticRoutes } from '../router'

const modules = import.meta.glob('./*.vue')

const links = computed(() => staticRoutes.map((route) => route.path))
</script>
